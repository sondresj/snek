import { Direction, Position, SCALE, SnekSystem } from '../types'

export const position: SnekSystem = (entities) => {
    const {head, tail, direction, speed} = entities.player

    if(!direction[0] && !direction[1] && !speed){
        console.log('cant move')
        return entities
    }

    return {
        ...entities,
        player: {
            ...entities.player,
            tail: [
                ...tail.slice(Math.max(tail.length - entities.game.score + 5, 0)),
                head
            ],
            head: move(head, direction, speed)
        }
    }
}



function move(pos: Position, direction: Direction, speed: number) {
    const width = window.innerWidth
    const height = window.innerHeight
    let x = pos[0] + direction[0] * speed
    if(x < 0) x = width - SCALE
    if(x + SCALE > width) x = 0
    let y = pos[1] + direction[1] * speed
    if(y < 0) y = height - SCALE
    if(y + SCALE > height) y = 0
    return [x, y] as Position
}