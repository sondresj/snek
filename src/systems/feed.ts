import { Entity } from '../Recs'
import { FruitComponents, Position, SnekSystem } from '../types'
import { getRandomPosition, collides } from '../utils'

let lastHead: Position | null = null
let nextFruitId = 0

export const feed: SnekSystem = (entities) => {
    const { head } = entities.player
    if(lastHead === head) return entities

    lastHead = head
    const fruits = Object.entries(entities).filter(([, entity]) => entity.type === 'fruit') as [string, Entity<FruitComponents>][]
    const eatenFruit = fruits
        .find(([, entity]) => entity.type === 'fruit' && collides(entity.position, head)) as [string, Entity<FruitComponents>]

    if(!eatenFruit) return entities

    const {width, height} = entities.game

    return {
        ...fruits.reduce((res, [id, fruit]) => id === eatenFruit[0] ? res : {...res, [id]: fruit}, {}),
        [++nextFruitId]: {
            position: getRandomPosition(width, height),
            type: 'fruit'
        },
        game: {
            ...entities.game,
            score: entities.game.score + 5
        },
        player: entities.player,
    }
}

feed.setup = (entites) => {
    nextFruitId = Object.entries(entites).reduce((res, [id, entity]) => entity.type === 'fruit' ? Math.max(Number(id), res) : res,0)
    return entites
}

