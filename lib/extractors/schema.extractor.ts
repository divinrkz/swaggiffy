import { SchemaRegistryObj, TClassDef, TClassProps } from '../typings';
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
            props.push({ prop, type: typeof schema[prop] });
        }
        
        return <TClassDef>{ name , props: props.reverse() };
    }

}