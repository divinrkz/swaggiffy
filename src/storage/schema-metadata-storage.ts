import { TSwaggerSchema } from "../typings";

/**
 * Global storage for registered schemas
 */
export class SchemaMetadataStorage {

    /**
     * Swagger schemas
     */
    private readonly schemas: TSwaggerSchema[] = [];


    /**
     * Get all swagger schemas
     * @returns schema
     */
    getSchema(): Array<TSwaggerSchema> {
        return this.schemas;
    }

}