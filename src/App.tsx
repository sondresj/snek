import React, { useCallback, useEffect, useRef } from 'react'
import logo from './logo.svg'
import './App.css'
import { createWorld, Entity } from './Recs'
import { InputAction, SnekEntities, SnekEntity, SnekSystem, SCALE, GameComponents } from './types'
import { useHotkey } from './Hotkey'
import { position } from './systems/position'
import { input } from './systems/input'
import { feed } from './systems/feed'
import { oroborus } from './systems/oroborus'
import { getRandomPosition } from './utils'
import { resize } from './systems/resize'

const [World, useEntity, useEcsDispatch] = createWorld<SnekEntity, SnekEntities, InputAction>()

const raf = requestAnimationFrame
const caf = cancelAnimationFrame

const systems: SnekSystem[] = [
	resize,
	input,
	position,
	feed,
	oroborus
]

const initialEntities: SnekEntities = {
	player: {
		type: 'player',
		head: getRandomPosition(window.innerWidth, window.innerHeight),
		tail: [],
		speed: 5,
		direction: [0, 1]
	},
	game: {
		type: 'game',
		score: 0,
		start: Date.now(),
		width: window.innerWidth,
		height: window.innerHeight
	},
	0: {
		type: 'fruit',
		position: getRandomPosition(window.innerWidth, window.innerHeight),
	},
	1: {
		type: 'fruit',
		position: getRandomPosition(window.innerWidth, window.innerHeight),
	},
	2: {
		type: 'fruit',
		position: getRandomPosition(window.innerWidth, window.innerHeight),
	},
	3: {
		type: 'fruit',
		position: getRandomPosition(window.innerWidth, window.innerHeight),
	},
	4: {
		type: 'fruit',
		position: getRandomPosition(window.innerWidth, window.innerHeight),
	},
}

const hotkeys = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Enter']

function GameLoop() {
	const nextInputActionRef = useRef<InputAction>()
	const dispatch = useEcsDispatch()
	
	const gameRef = useRef<Entity<GameComponents>>()
	const game = useEntity('game')
	useEffect(() => {
		gameRef.current = game
	}, [game])

	useHotkey(hotkeys, useCallback((event: KeyboardEvent) => {
		switch(event.key){
			case 'ArrowUp': nextInputActionRef.current = {direction: [0, -1]}; break
			case 'ArrowDown': nextInputActionRef.current = {direction: [0, 1]}; break
			case 'ArrowLeft': nextInputActionRef.current = {direction: [-1, 0]}; break
			case 'ArrowRight': nextInputActionRef.current = {direction: [1, 0]}; break
			case 'Enter': nextInputActionRef.current = {direction: [1, 0], restart: true}; break;
		}
	}, []))

	useEffect(() => {
		let handle: number | null = null
		const loop = () => {
			if(!gameRef.current?.end || nextInputActionRef.current?.restart)
				dispatch(nextInputActionRef.current)
			nextInputActionRef.current = undefined
			// if(!gameRef.current?.end)
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
									className={'snek snek-body'}
									style={{width: SCALE, height: SCALE, left, top}}
								/>)
							),
							<div
								key='player'
								className={'snek snek-head'}
								style={{width: SCALE, height: SCALE, left, top}}
							/>
						]
					}
					case 'fruit':
						const [left, top] = entity.position
						return <img
							alt='fruit'
							className='fruit'
							key={`fruit-${id}`}
							src={logo}
							style={{left, top, width: SCALE, height: SCALE }}
							
						/>
					default: return null
				}
			})}
		</>)
	}, [])

	return (
		<div className="App">
			<World
				systems={systems}
				initialEntities={initialEntities}
			>
				{renderChildren}
			</World>
		</div>
	)
}

export default App
