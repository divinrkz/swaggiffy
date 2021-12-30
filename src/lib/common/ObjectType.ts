/**
 * Represents some Type of Object
 */
export type ObjectType<T> = { new (): T} | Function;