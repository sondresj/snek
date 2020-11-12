import { SnekSystem } from '../types';

let nextHeight = window.innerHeight
let nextWidth = window.innerWidth

export const resize: SnekSystem = (entities) => {
    const {width, height} = entities.game
    if(nextWidth !== width || nextHeight !== height) {
        return {
            ...entities,
            game: {
                ...entities.game,
                width: nextWidth,
                height: nextHeight
            }
        }
    }
    return entities
}

resize.setup = (entities) => {
    window.onresize = () => {
        nextHeight = window.innerHeight
        nextWidth = window.innerWidth
    }
    return entities
}
