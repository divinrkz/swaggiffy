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

export type SchemaParam = {
    name: string;
    schema: SchemaRegistryType;
    options?: SchemaRegistryOptions;
};

export function registerSchema(name: string, schema: SchemaRegistryType, options?: SchemaRegistryOptions) {
    let extractor: TClassDef | undefined;

    if (options) {
        if (options.orm === 'mongoose') {
            extractor = SchemaExtractor.extractMongoose(schema as mongoose.Schema, name);
        } else {
            throw new SwaggiffyError('Orm is not supported');
        }
    } else {
        if (schema instanceof mongoose.Schema) {
            extractor = SchemaExtractor.extractMongoose(schema as mongoose.Schema, name);
        } else {
            extractor = SchemaExtractor.extractPlain(schema, name);
        }
    }

    const swaggerDefinition: TSwaggerSchema = Utility.genSchemaDef(extractor);

    getSchemaMetadataStorage().schemas.push({
        target: extractor,
        name: name,
        swaggerDefinition,
    } as SchemaMetadata);
}

export function registerSchemas(schemas: SchemaParam[]) {
    let extractor: TClassDef | undefined;
    for (const _schema of schemas) {
        if (_schema.options) {
            if (_schema.options.orm === 'mongoose') {
                extractor = SchemaExtractor.extractMongoose(_schema.schema as mongoose.Schema, _schema.name);
            } else {
                throw new SwaggiffyError('Orm is not supported');
            }
        } else {
            if (_schema.schema instanceof mongoose.Schema) {
                extractor = SchemaExtractor.extractMongoose(_schema.schema as mongoose.Schema, _schema.name);
            } else {
                extractor = SchemaExtractor.extractPlain(_schema.schema, _schema.name);
            }
        }

        const swaggerDefinition: TSwaggerSchema = Utility.genSchemaDef(extractor);

        getSchemaMetadataStorage().schemas.push({
            target: extractor,
            name: _schema.name,
            swaggerDefinition,
        } as SchemaMetadata);
    }
}
