import { SnekSystem } from '../types'

export const input: SnekSystem = (entities, inputDirection) => {
    const playerDirection = entities.player.direction
    if(!inputDirection) return entities

    const direction = inputDirection.every((v, i) => v + playerDirection[i]) ? inputDirection : playerDirection
    return {
        ...entities,
        player: {
            ...entities.player,
            direction
        }
    }
}