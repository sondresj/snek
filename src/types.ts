import { Entity, System } from './Recs'

export type Position = readonly [number, number]
export type Direction = readonly [-1 | 0 | 1, -1 | 0 | 1] //'up' | 'down' | 'left' | 'right'

export type PlayerComponents = {
    type: 'player'
    head: Position
    tail: Position[]
    speed: number
    direction: Direction
}

export type FruitComponents = {
    type: 'fruit'
    position: Position
}

export type GameComponents = {
    type: 'game'
    start: number
    end?: number
    score: number
}

export type SnekEntity = Entity<PlayerComponents | FruitComponents | GameComponents>
export type SnekEntities = Record<number, Entity<FruitComponents>> & {
    game: GameComponents
    player: PlayerComponents
}

export type InputAction = Direction | undefined

export type SnekSystem = System<SnekEntity, SnekEntities, InputAction>

export const SCALE = 20