import { SchemaMetadata } from '../storage/types/SchemaMetadata';
import {
    APIPathDefinition,
    SwaggerAPIDefinition,
    TClassDef,
    TClassProps,
    TSchemaProp,
    TSwaggerDataType,
    TSwaggerNumberFormats,
    TSwaggerSchema,
    TSwaggerSchemaDef,
    TSwaggerStringFormats,
} from '../typings';
import { PlatformTools } from '../platform/PlatformTools';
import { Defaults } from './Defaults';
import { ConfigMetadataStorage } from '../storage/ConfigMetadataStorage';
import { getConfigMetadataStorage } from '../globals';
import { APIDefinitionMetadata } from '../storage/types/APIDefinitionMetadata';
import mongoose from 'mongoose';
import { FileUtils } from './FileUtils';
import { ValidationUtils } from './ValidationUtils';

export class Utility {
    /**
     * Returns target Class properties
     * @param _class
     * @returns Target class properties
     */
    static configStore: ConfigMetadataStorage = getConfigMetadataStorage();

    /**
     * Generate Swagger Schema Definition
     */
    static genSchemaDef(obj: TClassDef): TSwaggerSchema {
        let props: TSchemaProp = {};

        for (const prop of obj.props) {
            props = Object.assign(
                {
                    [prop.prop]: {
                        type: prop.type,
                        example: prop.example,
                        description: prop.description,
                        required: prop.required,
                    },
                },
                props,
            );
        }

        return <TSwaggerSchema>{
            [obj.name]: {
                type: 'object',
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
     * Extracts Swagger Schema Object from JSON
     * @param swagger JSON Document
     * @params schema: new swaggified schemas
     * @returns schema object
     */
    static updateAPIDefinition(swaggerDoc: Buffer, apiDefinition: SwaggerAPIDefinition): string {
        const parsed = JSON.parse(swaggerDoc.toString());
        parsed.swaggerDefinition.paths = apiDefinition;
        return JSON.stringify(parsed, null, 2);
    }

    /**
     * Generates swagger file from schemas
     * @params schema
     * @returns Promise<void>
     */
    static async swaggiffy(schema: TSwaggerSchemaDef | SwaggerAPIDefinition, type: 'DEFINITION' | 'SCHEMA') {
        return new Promise<void>((ok, fail) => {
            const swaggerDoc: Buffer = PlatformTools.getFileContents(Utility.configStore.swaggerDefinitionFilePath);
            let definition: string = '';
            if (type === 'DEFINITION') definition = this.updateAPIDefinition(swaggerDoc, schema as SwaggerAPIDefinition);
            else if (type === 'SCHEMA') definition = this.updateSchema(swaggerDoc, schema as TSwaggerSchemaDef);

            PlatformTools.writeToFile(Utility.configStore.swaggerDefinitionFilePath, definition);
            ok();
        });
    }

    /**
     * Converts SchemaMetadata[] to plain JSON Object
     * @param array SchemaMetadata array
     * @returns JSON defined SwaggerSchema
     */
    static toSwaggerSchema(array: SchemaMetadata[]): TSwaggerSchemaDef {
        let definition: TSwaggerSchemaDef = <TSwaggerSchemaDef>{};

        for (const item of array) {
            definition = {
                ...definition,
                ...{ [item.name]: item.swaggerDefinition[item.name] },
            };
        }

        return definition;
    }

    /**
     * Converts APIDefinitionMetadata[] to plain JSON Object
     * @param array APIDefinitionMetadata array
     * @returns JSON defined SwaggerSchema
     */
    static toSwaggerAPIDefinition(array: APIDefinitionMetadata[]): SwaggerAPIDefinition {
        let apiDefinition: SwaggerAPIDefinition = <SwaggerAPIDefinition>{};

        const pathStrings: string[] = array.map((item) => item.apiDefinition.pathString);
        const uniquePathStrings: string[] = Array.from(new Set(pathStrings));

        for (const pathString of uniquePathStrings) {
            const methods = array.filter((item) => item.apiDefinition.pathString === pathString);
            let apiDefinerObj: SwaggerAPIDefinition = <SwaggerAPIDefinition>{};
            for (const method of methods) {
                apiDefinerObj = {
                    ...apiDefinerObj,
                    ...{
                        [method.apiDefinition.method]: {
                            tags: method.apiDefinition.tags,
                            operationId: method.apiDefinition.meta.operationId,
                            summary: method.apiDefinition.meta.summary,
                            description: method.apiDefinition.meta.description,
                            parameters: method.apiDefinition.meta.parameters,
                            consumes: method.apiDefinition.meta.consumes,
                            produces: method.apiDefinition.meta.produces,
                            responses: method.apiDefinition.meta.responses,
                            security: method.apiDefinition.meta.security,
                        },
                    },
                };
            }

            apiDefinition = {
                ...apiDefinition,
                ...{
                    [ValidationUtils.cleanSwaggerPathString(pathString)]: {
                        ...apiDefinerObj,
                    },
                },
            };
        }

        return apiDefinition;
    }

    static extractType(func: Function) {
        const str = func.toString();

        if (str.toLowerCase().includes('string')) return 'string';
        else if (str.toLowerCase().includes('number')) return 'number';
        else if (str.toLowerCase().includes('boolean')) return 'boolean';
        else if (str.toLowerCase().includes('date')) return 'string';
        else if (str.toLowerCase().includes('objectid')) return 'string';
        else if (str.toLowerCase().includes('uuid')) return 'string';
    }

    static castMongooseType(
        type: string,
    ): [TSwaggerDataType, TSwaggerStringFormats | TSwaggerNumberFormats | undefined, boolean | undefined, string | number | boolean | undefined] {
        switch (type) {
            case mongoose.Schema.Types.String.schemaName:
                return ['string', undefined, undefined, 'string'];
            case mongoose.Schema.Types.Number.schemaName:
                return ['number', undefined, undefined, 0];
            case mongoose.Schema.Types.Date.schemaName:
                return ['string', 'date', undefined, new Date().toLocaleString()];
            case mongoose.Schema.Types.Boolean.schemaName:
                return ['boolean', undefined, undefined, false];
            case mongoose.Schema.Types.Buffer.schemaName:
                return ['object', undefined, undefined, undefined];
            case mongoose.Schema.Types.Mixed.schemaName:
                return ['object', undefined, undefined, undefined];
            case 'ObjectID':
                return ['string', undefined, true, '507f1f77bcf86cd799439011'];
            case mongoose.Schema.Types.Array.schemaName:
                return ['array', undefined, undefined, undefined];
            case mongoose.Schema.Types.Map.schemaName:
                return ['object', undefined, undefined, undefined];
            default:
                return ['object', undefined, undefined, undefined];
        }
    }

    static castJSType(type: string): [TSwaggerDataType, TSwaggerStringFormats | TSwaggerNumberFormats | undefined] {
        switch (type) {
            case 'string':
                return ['string', undefined];

            case 'number':
                return ['number', undefined];

            case 'bigint':
                return ['number', undefined];

            case 'boolean':
                return ['boolean', undefined];

            case 'symbol':
                return ['object', undefined];

            case 'undefined':
                return ['object', undefined];

            case 'object':
                return ['object', undefined];

            case 'function':
                return ['object', undefined];

            default:
                return ['object', undefined];
        }
    }
}
