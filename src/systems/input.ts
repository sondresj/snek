import { SnekSystem } from '../types'

export const input: SnekSystem = (entities, action) => {
    if(!action) return entities
    const {direction: inputDirection, restart} = action
    if(restart){
        return {
            ...entities,
            game: {
                ...entities.game,
                start: Date.now(),
                end: undefined,
                score: 5,
            },
            player: {
                ...entities.player,
                speed: 5,
                direction: inputDirection
            }
        }
    }
    const playerDirection = entities.player.direction
    const direction = inputDirection.every((v, i) => v + playerDirection[i]) ? inputDirection : playerDirection
    return {
        ...entities,
        player: {
            ...entities.player,
            direction
        }
    }
}