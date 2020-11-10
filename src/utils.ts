import { Position, SCALE } from './types'

export const collides = ([ax, ay]: Position, [bx, by]: Position, size: number = SCALE) => {
    return (ax + size >= bx && ax < bx + size) && (ay + size >= by && ay < by + size)
}

export const getRandomPosition = () => {
    const scaleTwice = SCALE * 2
    const width = window.innerWidth - scaleTwice
    const height = window.innerHeight - scaleTwice
    return [
        Math.floor(Math.random() * (width - scaleTwice)) + SCALE,
        Math.floor(Math.random() * (height - scaleTwice)) + SCALE,
    ] as Position
}