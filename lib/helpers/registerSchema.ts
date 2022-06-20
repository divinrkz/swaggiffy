import * as express from 'express';
import { APIPathDefinition, APIRegisterMeta, TClassDef, TClassProps } from '../typings';
import { getAPIDefinitionMetadataStorage } from '../globals';
import { APIDefinitionMetadata } from '../storage/types/APIDefinitionMetadata';
import { type } from 'os';
import { Utility } from '../utils/Utility';

/**
 * Create swagger schema definition
 * @returns schemaDefinition {SchemaDefinition}
 */

export function registerSchema(name: string, obj: any) {
    const props: TClassProps = [];
    for (const prop of Object.keys(obj)) {
        let _type;

        if (typeof obj[prop] == 'object') {
            if (typeof obj[prop].type == 'function') _type = Utility.extractType(obj[prop].type);
            else _type = obj[prop].type || 'string';
        } else _type = obj[prop].type || 'string';
        props.push({ prop, type: _type });
    }
    return <TClassDef>{ name: name, props: props.reverse() };
}
