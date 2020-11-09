import React, { useCallback, useEffect, useRef } from 'react'
import logo from './logo.svg'
import './App.css'
import { createWorld, Entity } from './Recs'
import { InputAction, SnekEntities, SnekEntity, Direction, SnekSystem, SCALE, GameComponents } from './types'
import { useHotkey } from './Hotkey'
import { position } from './systems/position'
import { input } from './systems/input'
import { feed } from './systems/feed'
import { oroborus } from './systems/oroborus'
import { getRandomPosition } from './utils'

const [World, useEntity, useEcsDispatch] = createWorld<SnekEntity, SnekEntities, InputAction>()

const raf = requestAnimationFrame
const caf = cancelAnimationFrame

const systems: SnekSystem[] = [
	input,
	position,
	feed,
	oroborus
]

const initialEntities: SnekEntities = {
	player: {
		type: 'player',
		head: getRandomPosition(),
		tail: [],
		speed: 5,
		direction: [0, 1]
	},
	game: {
		type: 'game',
		score: 0,
		start: Date.now(),
	},
	0: {
		type: 'fruit',
		position: getRandomPosition()
	}
}

const hotkeys = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown']

function GameLoop() {
	const directionRef = useRef<Direction>()
	const gameRef = useRef<Entity<GameComponents>>()
	const dispatch = useEcsDispatch()

	const game = useEntity('game')
	useEffect(() => {
		gameRef.current = game
	}, [game])

	useHotkey(hotkeys, useCallback((event: KeyboardEvent) => {
		switch(event.key){
			case 'ArrowUp': directionRef.current = [0, -1]; break
			case 'ArrowDown': directionRef.current = [0, 1]; break
			case 'ArrowLeft': directionRef.current = [-1, 0]; break
			case 'ArrowRight': directionRef.current = [1, 0]; break
		}
	}, []))

	useEffect(() => {
		let handle: number | null = null
		const loop = () => {
			dispatch(directionRef.current)
			directionRef.current = undefined
			if(!gameRef.current?.end)
				handle = raf(loop)
		}
		handle = raf(loop)
		return () => {
			if(handle){
				caf(handle)
				handle = null
			}
		}
	}, [dispatch])

	return null
}

function Score(){
	const game = useEntity('game')

	return (<div className='score'>
		<h2>{game.score}</h2>
		{game.end && <h4>GAME OVER</h4>}
	</div>)
}


function App() {

	const renderChildren = useCallback((entities: SnekEntities) => {
		return (<>
			<GameLoop />
			<Score />
			{Object.entries(entities).map(([id, entity]) => {
				switch(entity.type){
					case 'player':{
						let [left, top] = entity.head
						return [
							entity.tail.map(([left, top], i) => (
								<div
									key={`t-${i}`}
									style={{width: SCALE, height: SCALE, position: 'absolute', left, top, background: 'lime'}}
								/>)
							),
							<div
								key='player'
								style={{width: SCALE, height: SCALE, position: 'absolute', left, top, background: 'cyan'}}
							/>
						]
					}
					case 'fruit':
						const [left, top] = entity.position
						return <img
							alt='fruit'
							className='App-logo'
							key={`fruit-${id}`}
							src={logo}
							width={32}
							height={32}
							style={{position: 'absolute', left, top }}
						/>
					default: return null
				}
			})}
		</>)
	}, [])

	return (
		<div className="App">
			<header className="App-header">
				<World
					systems={systems}
					initialEntities={initialEntities}
				>
					{renderChildren}
				</World>
			</header>
		</div>
	)
}

export default App
