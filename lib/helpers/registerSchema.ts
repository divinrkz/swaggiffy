import * as express from 'express';
import { APIPathDefinition, APIRegisterMeta, TClassDef, TClassProps } from '../typings';
import { getAPIDefinitionMetadataStorage } from '../globals';
import { APIDefinitionMetadata } from '../storage/types/APIDefinitionMetadata';

/**
 * Create swagger schema definition
 * @returns schemaDefinition {SchemaDefinition}
 */
export function registerSchema(name: string, obj: any) {
    const props: TClassProps = [];
    console.log(Object.keys(obj))
    for (const prop of Object.keys(obj)) {
        props.push({ prop, type: typeof obj[prop] });
    }
    return <TClassDef>{ name: name, props: props.reverse() };
}

