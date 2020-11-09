import { SnekSystem } from '../types';
import { collides } from '../utils';

export const oroborus: SnekSystem = (entities) => {

    const { tail, head } = entities.player
    const eatself = tail.some((pos) => collides(pos, head, 1))
    if(!eatself) return entities
    
    return {
        ...entities,
        game: {
            ...entities.game,
            end: Date.now(),
        },
        player: {
            ...entities.player,
            speed: 0
        }
    }
}