import * as express from 'express';
import { APIPathDefinition, APIRegisterMeta, SchemaRegistryOptions, SchemaRegistryType, TClassDef, TClassProps } from '../typings';
import { getAPIDefinitionMetadataStorage } from '../globals';
import { APIDefinitionMetadata } from '../storage/types/APIDefinitionMetadata';
import { type } from 'os';
import { Utility } from '../utils/Utility';
import * as mongoose from 'mongoose';
import { option } from 'yargs';
import { SwaggiffyError } from '../errors/SwaggiffyError';


/**
 * Create swagger schema definition
 * @returns schemaDefinition {SchemaDefinition}
 */


export function registerSchema(schema: SchemaRegistryType, options?: SchemaRegistryOptions) {
    console.log(schema)
    const props: TClassProps = [];

    if (options) {
        if (options.orm === 'mongoose') {
            // generate mongoose schema
        } else {
            throw new SwaggiffyError('Orm is not supported');
        }
    }
    if (schema instanceof mongoose.Schema) {
        
    }
    else {

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
