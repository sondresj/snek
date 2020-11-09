import { collides } from './utils'

describe('utils', () => {
    describe('collides', () => {
        test('collides', () => {
            expect(collides([5, 5], [36, 5], 32)).toBeTruthy()
        })
        test('dodge above', () => {
            expect(collides([5, 5], [45, 5], 32)).toBeFalsy()
        })
        test('dodge below', () => {
            expect(collides([45, 5], [5, 5], 32)).toBeFalsy()
        })
        test('dodge left', () => {
            expect(collides([5, 5], [5, 45], 32)).toBeFalsy()
        })
        test('dodge right', () => {
            expect(collides([5, 45], [5, 5], 32)).toBeFalsy()
        })
    })
})