export type Class<T> = {new (): T};

/**
 * The OpenSpecification 3.0 types
 */
const TDataType = 'integer' | 'number' | 'string' | 'boolean';

/**
 * The OpenSpecification 3.0 integer type formats
 */
const TIntegerFormat = 'int32' | 'int64';

/**
 * The OpenSpecification 3.0 number type formats
 */
const TNumberFormat = 'float' | 'double';

/**
 * The OpenSpecification 3.0 string type formats
 */
const TStringFormat = 'byte' | 'binary' | 'date' | 'date-time' | 'password'; 




export type TSchemaProp = Record<String, TSwaggerSchemaProp>;

export type TClassProp = {
    prop: string
    type: TDataType
};

export type TClassProps = Array<TClassProp>;

export type TClassDef = {
    name: string,
    props: TClassProps
}

export type TSwaggerType = {
    type: TDataType,
    properties: Record<string, TSchemaProp>
}

export type TSwaggerSchemaProp = {
    type: TDataType,
    test: TDataType extends 'string' ? 'number' | 'string';
    format?: 'int32' | 'int64' | 'float' | 'double' | 'byte' | 'binary' | 'date' | 'date-time' | 'password';
};

export type TSwaggerSchema = {
    [type: string]: TSwaggerType
}

export type TSwaggerSchemaDef = Record<string, TSwaggerType>;
