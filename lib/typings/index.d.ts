import * as express from 'express';
import * as mongoose from 'mongoose';

/**
 * Path String Type
 * Checks for a path starting with /{path}
 * Examples: /pets
 */
export type PathString = `/${string | ''}`;

/**
 * Ref String Type
 * Checks for a ref starting with /#/definitions/{schema}
 * Examples: /p
 */
export type RefString = `/#/definitions/${string}`;

/**
 *
 */
export type TSchemaProp = Record<string, TSwaggerSchemaObject>;

/**
 * TS Class Property Type
 */
export type TClassProp = {
    prop: string;
    type: TSwaggerDataType
    required?: boolean;
    description?: string;
    format?: TSwaggerNumberFormats | TSwaggerStringFormats;
    example?: string;
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
};

/**
 * Swagger Components/Definitions Type
 */
export type TSwaggerType = {
    type: 'object';
    properties: TSchemaProp;
};

/**
 * Swagger Schema Object Type
 */

export type TSwaggerDataType = 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object';

/**
 * Valid string formats
 */
export type TSwaggerStringFormats = 'date' | 'date-time' | 'password' | 'byte' | 'binary' | 'email' | 'uuid' | 'uri' | 'hostname' | 'ipv4' | 'ipv6';

/**
 * Valid swagger number formats
 */
export type TSwaggerNumberFormats = 'float' | 'double' | 'int32' | 'int64';

export type TSwaggerSchemaObject = {
    // type: "integer" | "number" | "string" | "boolean" | "file";
    type: TSwaggerDataType;
    format?: TSwaggerStringFormats | TSwaggerNumberFormats;
    // format?: typeof TOSAType extends "integer" ? TOSAType :  TOSAType extends "number" ? TNumberFormat : TOSAType extends "string" ? TStringFormat : string;
    $ref?: RefString;
    title?: string;
    description?: string;
    // default?: any;
    // multipleOf?: any;
    maximum?: number;
    exclusiveMaximum?: number;
    example?: any;
    minimum?: number;
    exclusiveMinimum?: number;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    maxItems?: number;
    minItems?: number;
    // uniqueItems?: any;
    maxProperties?: number;
    minProperties?: number;
    required?: boolean;
    enum?: boolean;
};

/**
 * Swagger Schema Object Type
 */
export type TSwaggerSchema = {
    [type: string]: TSwaggerType;
};

/**
 * Swagger Components/Definitions Record<Type>
 */
export type TSwaggerSchemaDef = Record<string, TSwaggerType>;

/**
 * The OpenAPI specification definition
 */
export interface SwaggerSpecification {
    swagger: '2.0' | '3.0';
    info: SwaggerInfo;
    host?: string;
    basePath?: string;
    schemes?: Array<ESchemas>;
    consumes?: Array<EMimeTypes>;
    produces?: Array<EMimeTypes>;
    paths: PathObject;
    definitions?: TSwaggerSchemaDef;
    parameters?: APIParameters;
    // responses?: any;
    // securityDefinitions?: any;
    // security?: any;
    tags: Array<TagObject>;
}

export enum ESchemas {
    http = 'http',
    https = 'https',
    ws = 'ws',
    wss = 'wss',
}

/**
 * Mime Type Enum
 */
export type EMimeTypes =
    | 'text/plain; charset=utf-8'
    | 'application/json'
    | 'application/vnd.github+json'
    | 'application/vnd.github.v3+json'
    | 'application/vnd.github.v3.raw+json'
    | 'application/vnd.github.v3.text+json'
    | 'application/vnd.github.v3.html+json'
    | 'application/vnd.github.v3.full+json'
    | 'application/vnd.github.v3.diff'
    | 'application/vnd.github.v3.patch';

/**
 * Swagger Info Object
 */
type SwaggerInfo = {
    readonly title: string;
    readonly description?: string;
    readonly termsOfService?: string;
    readonly contact?: {
        name?: string;
        url?: string;
        email?: string;
    };
    readonly license?: {
        name: string;
        url?: string;
    };
    readonly version: string;
};

type PathObject = {
    [path: PathString]: PathItemObject;
};

type APIOperation = {
    tags?: Array<string>;
    summary?: string;
    description?: string;
    externalDocs?: string;
    operationId?: string;
    consumes?: string;
    produces?: string;
    // parameters?: any;
    // responses?: any;
    schemes?: Array<ESchemas>;
    deprecated?: boolean;
    // security?: any;
};

type TagObject = {
    name: string;
    description?: string;
};

/**
 * API Parameters for APIOperation
 */
type APIParameters = {
    in: 'query' | 'header' | 'path' | 'formData' | 'body';
    name: string;
    description?: string;
    required?: boolean;
};

/**
 * API Parameters when in prop is 'body'
 */
type APIParametersInBody = APIParameters & {
    schema: TSwaggerSchemaObject | RefString;
};

type PathItemObject = {
    $ref?: RefString;
};

export type TOpenApiVersion = '2.0' | '3.0';
export type TFormat = 'json' | 'yaml';

export type TemplateOptions = {
    projectName: ?string;
    outFile: ?string;
    apiRouteUrl: ?string;
    openApiVersion: '2.0' | '3.0';
    format: 'json' | 'yaml';
};

/**
 * Configuration Properties
 */
export type ConfigurationProps = {
    projectName: string;
    openApiVersion: TOpenApiVersion;
    outFile: string;
    apiRoute: PathString;
    format: TFormat;
    relativePath?: boolean;
};

/**
 * Api Path Type
 */
export type APIPathDefinition = {
    pathString: string;
    method: 'get' | 'post' | 'put' | 'delete';
    tags: string[];
    meta: ApiPathDescription;
};

export type ApiPathDescription = {
    summary: string;
    operationId: string;
    description: string;
    parameters?: APIParameters;
    produces: Array<EMimeTypes>;
    consumes: Array<EMimeTypes>;
    responses: APIDocResponse;
};

export type SwaggerAPIDefinition = {
    [x: string]: {
        [x: 'get' | 'post' | 'put' | 'delete']: ApiPathDescription;
    };
};

export type APIDocResponse = Record<string, { description: string }>;

export type APIRegisterMeta = {
    router: express.Router;
    summary?: string;
    description?: string;
    tags?: string;
    produces?: Array<EMimeTypes>;
    consumes?: Array<EMimeTypes>;
    responses?: APIDocResponse;
};

export type SchemaRegistryObj = {
    [key: string]: number | string | boolean | bigint | object | Date | undefined | Function | symbol;
};
// Parameter types
export type SchemaRegistryType = mongoose.Schema | SchemaRegistryObj;

export type SchemaRegistryOptions = { required?: string[]; orm: 'mongoose' | 'sequelize' | 'prisma' | 'typeorm' };
