import { TSwaggerSchema } from "../typings";
import {ISchemaMetaData} from './types/ISchemaMetaData';


/**
 * Global storage for registered schemas
 */
export class SchemaMetadataStorage {
    /**
     * Swagger schemas
     */
    readonly schemas: ISchemaMetaData[] = [];
}

