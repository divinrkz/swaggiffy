import { TSwaggerSchema } from "../typings";
import {ISchemaMetadata} from './types/ISchemaMetadata';


/**
 * Global storage for registered schemas
 */
export class SchemaMetadataStorage {
    /**
     * Swagger schemas
     */
    readonly schemas: ISchemaMetadata[] = [];
}

