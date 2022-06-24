import * as express from 'express';
import { APIPathDefinition, APIRegisterMeta, SchemaRegistryOptions, SchemaRegistryType, TClassDef, TClassProps, TSwaggerSchema } from '../typings';
import { getAPIDefinitionMetadataStorage, getSchemaMetadataStorage } from '../globals';
import { APIDefinitionMetadata } from '../storage/types/APIDefinitionMetadata';
import { type } from 'os';
import { Utility } from '../utils/Utility';
import * as mongoose from 'mongoose';
import { option } from 'yargs';
import { SwaggiffyError } from '../errors/SwaggiffyError';
import { SchemaExtractor } from '../extractors/schema.extractor';
import { SchemaMetadata } from '../storage/types/SchemaMetadata';

/**
 * Create swagger schema definition
 * @returns schemaDefinition {SchemaDefinition}
 */

export function registerSchema(name: string, schema: SchemaRegistryType, options?: SchemaRegistryOptions) {
    if (options) {
        if (options.orm === 'mongoose') {
            const extractor = SchemaExtractor.extractMongoose(schema as mongoose.Schema, name);
            console.log(extractor)
        } else {
            throw new SwaggiffyError('Orm is not supported');
        }
    } else {
        if (schema instanceof mongoose.Schema) {
            const extractor = SchemaExtractor.extractMongoose(schema as mongoose.Schema, name);
            console.log(extractor)
        
        } else {
            const extractor = SchemaExtractor.extractPlain(schema, name);
            const swaggerDefinition: TSwaggerSchema = Utility.genSchemaDef(extractor);

            getSchemaMetadataStorage().schemas.push({
                target: extractor,
                name: name,
                swaggerDefinition,
            } as SchemaMetadata);
        }
    }
}
