import { TSwaggerSchema } from "../typings";

/**
 * Global storage for registered schemas
 */
export class SchemaMetadataStorage {

    /**
     * Swagger schemas
     */
    readonly schemas: TSwaggerSchema[] = [];


    /**
     * Get all swagger schemas
     * @returns schema
     */
    getSchema(): Array<TSwaggerSchema> {
        return this.schemas;
    }

}