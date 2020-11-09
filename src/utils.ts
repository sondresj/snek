import { Position, SCALE } from './types'

export const collides = ([ax, ay]: Position, [bx, by]: Position, size: number = SCALE) => {
    return (ax + size >= bx && ax < bx + size) && (ay + size >= by && ay < by + size)
}

export const getRandomPosition = () => {
    const width = window.innerWidth - SCALE * 2
    const height = window.innerHeight - SCALE * 2
    return [
        Math.floor(Math.random() * width) + SCALE,
        Math.floor(Math.random() * height) + SCALE,
    ] as Position
}