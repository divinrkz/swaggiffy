import { SchemaMetadata } from "../storage/types/SchemaMetadata";
import { TClassDef, TClassProps, TSchemaProp, TSwaggerSchema, TSwaggerSchemaDef } from "../typings";
import { PlatformTools } from "../platform/PlatformTools";
import { Defaults } from "./Defaults";

export class Utility {
    /**
     * Returns target Class properties
     * @param _class
     * @returns Target class properties
     */
    static getClassProps(target: any, name?: string): TClassDef {
        const instance: typeof target = new target();
        const props: TClassProps = [];

        for (const prop of Object.keys(instance)) {
            props.push({ prop, type: typeof instance[prop] });
        }
        return <TClassDef>{ name: name || target.name, props: props.reverse() };
    }

    /**
     * Generate Swagger Schema Definition
     */
    static genSchemaDef(obj: TClassDef): TSwaggerSchema {
        let props: TSchemaProp = {};

        for (const prop of obj.props) {
            props = Object.assign({ [prop.prop]: { type: prop.type } }, props);
        }

        return <TSwaggerSchema>{
            [obj.name]: {
                type: "object",
                properties: props,
            },
        };
    }

    /**
     * Extracts Swagger Schema Object from JSON
     * @param swagger JSON Document
     * @params schema: new swaggified schemas
     * @returns schema object
     */
    static updateSchema(swaggerDoc: Buffer, schema: TSwaggerSchemaDef): string {
        const parsed = JSON.parse(swaggerDoc.toString());
        parsed.swaggerDefinition.definitions = schema;
        return JSON.stringify(parsed, null, 2);
    }

    /**
     * Generates swagger file from schemas
     * @params schema
     * @returns Promise<void>
     */
    static async swaggify(schema: TSwaggerSchemaDef) {
        return new Promise<void>((ok, fail) => {
            const swaggerDoc: Buffer = PlatformTools.getFileContents(Defaults.SWAGGER_DEFINITION_FILE);
            const updatedSchema: string = this.updateSchema(swaggerDoc, schema);

            PlatformTools.writeToFile(Defaults.SWAGGER_DEFINITION_FILE, updatedSchema);
        });
    }

    /**
     * Converts SchemaMetadata[] to plain JSON Object
     * @param array SchemaMetadata array
     * @returns JSON defined SwaggerSchema
     */
    static compressArrToObj(array: SchemaMetadata[]): TSwaggerSchemaDef {
        let definition: TSwaggerSchemaDef = <TSwaggerSchemaDef>{};
        for (const item of array) {
            definition = {
                ...definition,
                ...{ [item.name]: item.swaggerDefinition[item.name] },
            };
        }

        return definition;
    }
}
