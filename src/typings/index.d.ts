export type Class<T> = {new (): T};

export type TClassProp = {
    prop: string
    type: string
};

export type TClassProps = Array<TClassProp>;

export type TClassDef = {
    class: string,
    props: TClassProps
}

export type TSwaggerType = {
    type: string,
    properties: Record<string, TSwaggerSchemaProp>
}

export type TSwaggerSchemaProp = {
    type: string
};

export type TSwaggerSchema = {
    [type: string]: TSwaggerType
}

