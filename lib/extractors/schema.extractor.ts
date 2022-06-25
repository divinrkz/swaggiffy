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
            const [propType, propFormat] = Utility.castJSType(typeof schema[prop]);
            props.push({
                prop,
                type: propType,
                required: undefined,
                description: undefined,
                example: undefined,
                format: propFormat,
            });
        }

        return <TClassDef>{ name, props: props.reverse() };
    }

    static extractMongoose(schema: mongoose.Schema, name?: string) {
        const props: TClassProps = [];

        for (const prop of Object.keys(schema.paths)) {

            const [propType, propFormat, isRequired] = Utility.castMongooseType(schema.paths[prop].instance);
            props.push({
                prop,
                type: propType,
                required: isRequired,
                description: undefined,
                example: undefined,
                format: propFormat,
            });
            
        }
        // props.push({
        //     prop: '_id',
        //     type: 'string',
        //     required: true,
        //     description: 'MongoDB _id',
        //     example: '5c8f8f8f8f8f8f8f8f8f8f8'
        // })


        return <TClassDef>{ name, props: props.reverse() };
    }

    static extractClassProps(target: any, name?: string): TClassDef {
        const instance: typeof target = new target();
        const props: TClassProps = [];
        console.log(Object.keys(instance));
        for (const prop of Object.keys(instance)) {
            const [propType, propFormat] = Utility.castJSType(typeof instance[prop]);
            props.push({
                prop,
                type: propType,
                required: undefined,
                description: undefined,
                example: undefined,
                format: propFormat,
            });
        }
        return <TClassDef>{ name: name || target.name, props: props.reverse() };
    }
}
