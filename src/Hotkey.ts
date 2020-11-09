import React, { useCallback, useRef, useEffect, RefObject, useMemo } from 'react'

export type HotkeyOptions = {
    /** When provided, events must be dispatched from nodes outside the boundry, events on or inside are ignored */ 
    excludeBoundry?: RefObject<HTMLElement>
    /** When provided, events must be dispatched from nodes within the boundry, events outside are ignored */
    includeBoundry?: RefObject<HTMLElement>
    /** When true, events from input-like fields will be ignored */
    ignoreInputEvents?: boolean
}

// Copied from react-dom source for normalizing keys
const mapIEKeys = {
    Esc: 'Escape',
    Spacebar: ' ',
    Left: 'ArrowLeft',
    Up: 'ArrowUp',
    Right: 'ArrowRight',
    Down: 'ArrowDown',
    Del: 'Delete',
    Win: 'OS',
    Menu: 'ContextMenu',
    Apps: 'ContextMenu',
    Scroll: 'ScrollLock',
    MozPrintableKey: 'Unidentified'
}

function formatKeyEvent(event: React.KeyboardEvent | KeyboardEvent) {
    const key = mapIEKeys[event.key as keyof typeof mapIEKeys] ?? event.key // Not actually needed if event is synthetic (react event)
    const keys: string[] = []
    if (event.shiftKey && key !== 'Shift') keys.push('shift')
    if (event.ctrlKey && key !== 'Control') keys.push('ctrl')
    if (event.altKey && key !== 'Alt') keys.push('alt')
    keys.push(key.toLowerCase())
    return keys.join(' ')
}

// Doesn't catch selects from mui (among others)
const isInputLike = (el: HTMLElement) => el.tagName === 'INPUT' ||
    el.tagName === 'SELECT' ||
    el.tagName === 'TEXTAREA' ||
    el.isContentEditable

/** 
 * 
 * @param key which key combination to handle. Optionally prepend the modifier before the key (separated by a space)
 * @param handler function to invoke when key is pressed. Should be a memoized function for best performance
 * @param options (optional) When provided, events must be dispatched from nodes within the boundry, events outside are ignored
 * @example useHotkey('ctrl s', handleSave, formRef) // handleSave when focus is on an element inside the form
 * @note If using multiple modifiers, they occur in the following order: `shift` `ctrl` `alt`
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values for possible key values
 */
export const useHotkey = (
    key: string | string[],
    handler: (event: KeyboardEvent) => void,
    { excludeBoundry, includeBoundry, ignoreInputEvents }: HotkeyOptions = {}
) => {
    const boundry = includeBoundry?.current ?? document

    // performance increased by wrapping handler (which possibly changes quite often) in a ref and wrapping that in a callback with no dependencies (using the ref instead)
    const handlerRef = useRef({ handler, excludeBoundry, ignoreInputEvents })
    // update the ref value when handler is changed (could be quite often)
    useEffect(() => { handlerRef.current = { handler, excludeBoundry, ignoreInputEvents } }, [handler, excludeBoundry, ignoreInputEvents])

    const keys = useMemo(() => Array.isArray(key) ? key.map(k => k.toLowerCase()) : [key.toLowerCase()], [key])

    const onKeyDown = useCallback((event: KeyboardEvent) => {
        if(event.repeat) return
        const eventKey = formatKeyEvent(event)
        if (!keys.includes(eventKey)) return
        const { handler, excludeBoundry, ignoreInputEvents } = handlerRef.current
        if (ignoreInputEvents && isInputLike(event.target as HTMLElement)) return
        if (!!excludeBoundry?.current && excludeBoundry.current.contains(event.target as any)) return
        handler(event)
    }, [keys])

    useEffect(() => {
        boundry.addEventListener('keydown', onKeyDown as any)
        return () => boundry.removeEventListener('keydown', onKeyDown as any)
    }, [onKeyDown, boundry])
}