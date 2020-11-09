import React, { useCallback, useContext, useLayoutEffect, useMemo, useState, ReactNode } from 'react'

export type Entity<TComponents = Record<string, unknown>> = Readonly<TComponents>

export type Entities<TEntity extends Entity = Entity> = Record<string, TEntity>

export type System<
    TEntity extends Entity = Entity,
    TEntities extends Entities<TEntity> = Entities<TEntity>,
    TSystemArg = readonly unknown[]
> = {
    setup?: (entities: Readonly<TEntities>) => TEntities
    (entities: Readonly<TEntities>, arg: TSystemArg): TEntities
}

export type EcsDispatch<
    TSystemArg = readonly unknown[]
> = (arg: TSystemArg) => void

export type WorldProps<
    TEntity extends Entity = Entity,
    TEntities extends Entities<TEntity> = Entities<TEntity>,
    TSystemArg = readonly unknown[]
> = {
    systems: Array<System<TEntity, TEntities, TSystemArg>>
    children: (entities: TEntities) => ReactNode
    initialEntities: TEntities
}

export function createWorld<
    TEntity extends Entity = Entity,
    TEntities extends Entities<TEntity> = Entities<TEntity>,
    TSystemArg = readonly unknown[]
>() {
    type WorldContextValue<
        TEntity extends Entity = Entity,
        TEntities extends Entities<TEntity> = Entities<TEntity>,
        TSystemArg = readonly unknown[]
    > = {
        has: <K extends keyof TEntities>(entityId: K) => boolean
        get: <K extends keyof TEntities>(entityId: K) => TEntities[K] | undefined
        add: <K extends keyof TEntities>(entityId: K, initialComponents: TEntities[K]) => TEntities[K]
        del: <K extends keyof TEntities>(entityId: K) => void
        dispatch: (args: TSystemArg) => void
    }

    const throwTooSoon = () => { throw new Error('too soon') }
    
    const initialWordContextValue: WorldContextValue<TEntity, TEntities, TSystemArg> = {
        has: throwTooSoon,
        get: throwTooSoon,
        add: throwTooSoon,
        del: throwTooSoon,
        dispatch: throwTooSoon
    }
    const WorldContext = React.createContext(initialWordContextValue)

    function World({ children: chidren, systems, initialEntities }: WorldProps<TEntity, TEntities, TSystemArg>) {
        const [entities, setEntities] = useState<TEntities>(initialEntities)

        // Run setup in all systems
        useLayoutEffect(() => {
            setEntities(entities => systems
                .filter(system => !!system.setup)
                .reduce((nextEntities, system) => system.setup!(nextEntities), entities)
            )
        }, [systems])

        const has = useCallback(<K extends keyof TEntities>(entityId: K) => entities.hasOwnProperty(entityId), [entities])
        const get = useCallback(<K extends keyof TEntities>(entityId: K): TEntities[K] | undefined => entities[entityId], [entities])
        const add = useCallback(<K extends keyof TEntities>(entityId: K, initialComponents: TEntities[K]): TEntities[K] => {
            const entity = initialComponents
            setEntities(entities => ({ ...entities, [entityId]: entity }))
            return entity
        }, [])
        const del = useCallback(<K extends keyof TEntities>(entityId: K) => {
            setEntities(entities => {
                const next = {...entities}
                delete next[entityId]
                return next
            })
        }, [])
        const dispatch = useCallback((args: TSystemArg) => {
            setEntities(entities => systems
                .reduce((nextEntities, system) => system(nextEntities, args), entities)
            )
        }, [systems])

        const world = useMemo<WorldContextValue<TEntity, TEntities, TSystemArg>>(() => ({
            has, get, add, del, dispatch
        }), [has, get, add, del, dispatch])

        return (
            <WorldContext.Provider
                value={world as any}
            >
                {chidren(entities)}
            </WorldContext.Provider>
        )
    }

    const useWorld = () => useContext(WorldContext)
    const useEntity = <K extends keyof TEntities>(entityId: K): TEntities[K] => useWorld().get(entityId)!
    const useEcsDispatch = () => useWorld().dispatch

    return [World, useEntity, useEcsDispatch] as const
}

// export function useEntity<TComponents extends {}>(entityId: string) {
//     return useContext(WorldContext).get(entityId) as Entity<TComponents>
// }

// export function useEcsDispatch() {
//     return useContext(WorldContext).dispatch
// }