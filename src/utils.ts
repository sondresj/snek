import { Position, SCALE } from './types'

export const collides = ([ax, ay]: Position, [bx, by]: Position, size: number = SCALE) => {
    const axInterval = [ax, ax + size] as const
    const ayInterval = [ay, ay + size] as const
    const bxInterval = [bx, bx + size] as const
    const byInterval = [by, by + size] as const
    return intervalIntersects(axInterval, bxInterval) && intervalIntersects(ayInterval, byInterval)
    //return (ax + size >= bx && ax < bx + size) && (ay + size >= by && ay < by + size)
}

export const intervalIntersects = ([aStart, aEnd]: readonly [number, number], [bStart, bEnd]: readonly [number, number]) => {
    return aStart < bEnd && aEnd >= bStart
}
// export const collides = ([ax, ay]: Position, [bx, by]: Position, size: number = SCALE) => {
//     return (ax + size >= bx && ax < bx + size) && (ay + size >= by && ay < by + size)
// }

export const getRandomPosition = (width: number, height: number) => {
    const scaleTwice = SCALE * 2
    width -= scaleTwice
    height -= scaleTwice
    return [
        Math.floor(Math.random() * (width - scaleTwice)) + SCALE,
        Math.floor(Math.random() * (height - scaleTwice)) + SCALE,
    ] as Position
}