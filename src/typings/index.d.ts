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
    type: 'object',
    properties: {}

}
export type SwaggerDefinition = {
    type: 'string'
}
