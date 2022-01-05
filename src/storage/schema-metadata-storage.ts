import { TSwaggerSchema } from "../typings";
import {SchemaMetadata} from "./types/SchemaMetadata";


/**
 * Global storage for registered schemas
 */
export class SchemaMetadataStorage {
    /**
     * Swagger schemas
     */
    readonly schemas: SchemaMetadata[] = [];
}

