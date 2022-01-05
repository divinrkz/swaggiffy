import {TSwaggerSchema} from "../../typings";

export interface ISchemaMetaData {
    /**
     * Class which owns the schema
     */
    readonly target;

    /**
     * Name of Class owning the schema 
     */
    readonly name: string;

    /**
     * Swagger Definition for the schema
     */
    readonly swaggerDefinition: TSwaggerSchema;
}