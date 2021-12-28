export type Class<T> = {new (): T};


export type TSchemaProp = Record<String, TSwaggerSchemaProp>;

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
    properties: Record<string, TSchemaProp>
}

export type TSwaggerSchemaProp = {
    type: TDataType
};

export type TSwaggerSchema = {
    [type: string]: TSwaggerType
}

const TDataType = 'string' | 'boolean' | 'object' | 'number' | 'date' | 'bigint';