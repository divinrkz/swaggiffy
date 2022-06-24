import mongoose from 'mongoose';
import { SchemaRegistryObj, TClassDef, TClassProps, TSwaggerType } from '../typings';
import { Utility } from '../utils/Utility';

/**
 * Schema Extractor utilities
 */
export class SchemaExtractor {
    /**
     * Extract props from plain schema
     * @param schema Schema to extract
     */
    static extractPlain(schema: SchemaRegistryObj, name?: string) {
        const props: TClassProps = [];
        for (const prop of Object.keys(schema)) {
            props.push({
                prop,
                type: typeof schema[prop],
                required: undefined,
                description: undefined,
                example: undefined,
                format: undefined,
            });
        }

        return <TClassDef>{ name, props: props.reverse() };
    }

    static extractMongoose(schema: mongoose.Schema, name?: string) {
        const props: TClassProps = [];
        for (const prop of Object.keys(schema.paths)) {
            console.log(schema.paths[prop].instance);
            const propType: string = Utility.castType(schema.paths[prop].instance);
            props.push({
                prop,
                type: 'string',
                required: undefined,
                description: undefined,
                example: undefined,
                format: undefined,
            });
        }
        //     const schemaProp = schema.path(prop);
        //     props.push({
        //         prop,
        //         type: schemaProp.instance,
        //         required: schemaProp.isRequired,
        //         description: schemaProp.options.description,
        //         example: schemaProp.options.example,
        //         format: schemaProp.options.format,
        //     });
        // }

        // return <TClassDef>{ name, props: props.reverse() };
    }

    static extractClassProps(target: any, name?: string): TClassDef {
        const instance: typeof target = new target();
        const props: TClassProps = [];
        console.log(Object.keys(instance));
        for (const prop of Object.keys(instance)) {
            props.push({
                prop,
                type: typeof instance[prop],
                required: undefined,
                description: undefined,
                example: undefined,
                format: undefined,
            });
        }
        return <TClassDef>{ name: name || target.name, props: props.reverse() };
    }
}
