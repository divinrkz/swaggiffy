export type Class<T> = {new (): T};


/**
 * The OpenSpecification 3.0 types
 */
 const TDataType = 'string' | 'boolean' | 'object' | 'number' | 'date' | 'bigint';
/**
 * The OpenSpecification 3.0 types
 */
const TOSAType = 'integer' | 'number' | 'string' | 'boolean' | 'file';
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



/**
 * 
 */
export type TSchemaProp = Record<String, TSwaggerSchemaObject>;


/**
 * TS Class Property Type
 */
export type TClassProp = {
    prop: string
    type: TDataType
};


/**
 * TS Class Property[] Type
 */
export type TClassProps = Array<TClassProp>;


/**
 * TS Class Definition Type
 */
export type TClassDef = {
    name: string;
    props: TClassProps;
}


/**
 * Swagger Components/Definitions Type
 */
export type TSwaggerType = {
    type: 'object';
    properties: Record<string, TSchemaProp>
}

/**
 * Swagger Schema Object Type
 */
export type TSwaggerSchemaObject<T> = {
    type: TOSAType;
    format?: TOSAType extends 'integer' ? TOSAType :  TOSAType extends 'number' ? TNumberFormat : TOSAType extends 'string' ? TStringFormat : string;
    $ref?: string;
    title?: string;
    description?: string;
    default?: any;
    multipleOf?: any;
    maximum?: any;
    exclusiveMaximum?: any;
    minimum?: any;
    exclusiveMinimum?: any;
    maxLength?: any;
    minLength?: any;
    pattern?: any;
    maxItems?: any;
    minItems?: any;
    uniqueItems?: any;
    maxProperties?: any;
    minProperties?: any;
    required?: boolean;
    enum?: boolean
};


/**
 * Swagger Schema Object Type
 */
export type TSwaggerSchema = {
    [type: string]: TSwaggerType
}

/**
 * Swagger Components/Definitions Record<Type>
 */
export type TSwaggerSchemaDef = Record<string, TSwaggerType>;




/**
 * The OpenAPI specification definition
 */
export interface SwaggerSpecification = {
    swagger: '2.0' | '3.0';
    info: SwaggerInfo;
    host: string;
    basePath: string;
    schemes: Array<ESchemes>
    

}


enum ESchemes {
    http, https, ws, wss
}


/**
 * Swagger Info Object
 */
type SwaggerInfo = {
    readonly title: string;
    readonly description?: string
    readonly termsOfService?: string
    readonly contact?: {
        name?: string
        url?: string
        email?: string
    }
    readonly license?: {
        name: string,
        url?: string
    }
    readonly version: string
}   