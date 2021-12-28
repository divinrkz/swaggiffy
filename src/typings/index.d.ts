export type Class<T> = {new (): T};

export type TClassProp = {
    prop: string
    type: TDataType
};

export type TClassProps = Array<TClassProp>;

export type TClassDef = {
    class: string,
    props: TClassProps
}

export type TSwaggerType = {
    type: TDataType,
    properties: Record<string, TSwaggerSchemaProp>
}

export type TSwaggerSchemaProp = {
    type: TDataType
};

export type TSwaggerSchema = {
    [type: string]: TSwaggerType
}


export type TDataType = 'string' | 'boolean' | 'object' | 'number' | 'date' | 'bigint';