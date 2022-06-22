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
            // generate mongoose schema
        } else {
            throw new SwaggiffyError('Orm is not supported');
        }
    } else {
        if (schema instanceof mongoose.Schema) {
            // generate mongoose schema
        } else {
            const objDef = SchemaExtractor.extractPlain(schema, name);
            const swaggerDefinition: TSwaggerSchema = Utility.genSchemaDef(objDef);

            getSchemaMetadataStorage().schemas.push({
                target: objDef,
                name: name,
                swaggerDefinition,
            } as SchemaMetadata);
        }
    }

    
    // for (const prop of Object.keys(obj)) {
    //     let _type;

    //     if (typeof obj[prop] == 'object') {
    //         if (typeof obj[prop].type == 'function') _type = Utility.extractType(obj[prop].type);
    //         else _type = obj[prop].type || 'string';
    //     } else _type = obj[prop].type || 'string';
    //     props.push({ prop, type: _type });
    // }
    // return <TClassDef>{ name: name, props: props.reverse() };
}
