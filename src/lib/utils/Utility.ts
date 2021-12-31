import {writeFile, readFile} from 'fs';
import { SchemaMetadata } from '../../storage/types/SchemaMetadata';
import { TClassDef, TClassProps, TSchemaProp, TSwaggerSchema, TSwaggerSchemaDef } from '../../typings';
import {Constants} from './Constants';

export class Utility {  
    static _getAllFilesFromFolder(dir: any) {
        var filesystem = require("fs");
        var results: any[] = [];
        filesystem.readdirSync(dir).forEach(function(file: any) {
            file = dir+'/'+file;
            var stat = filesystem.statSync(file);
            if (stat && stat.isDirectory()) {
                results = results.concat(Utility._getAllFilesFromFolder(file))
            } else {
                if (file.endsWith('route.ts' || 'route.js'))
                    results.push(file);
            }    
        });
        return results;
    };


    /**
     * Returns target Class properties
     * @param _class 
     * @returns Target class properties
     */
    static getClassProps(target: any, name?: string): TClassDef {
        const instance: typeof target = new target();
        const props: TClassProps = [];
        for (const prop of Object.keys(instance)) {
            props.push({type: typeof instance[prop], prop: prop});
        }
        return <TClassDef>{ name: name || target.name, props: props.reverse() };
    }


    static genSchemaDef(obj: TClassDef): TSwaggerSchema {
        let props: TSchemaProp = {};

        for (const prop of obj.props) {
          props = Object.assign({[prop.prop]: { type: prop.type}}, props);
        }

        return <TSwaggerSchema> {
            [obj.name]: {
                type: 'object',
                properties: props
            } 
        };
    }
    static swaggify(obj: TSwaggerSchemaDef): void {
        readFile(Constants.SWAGGER_CONFIG, (error, data) => {
            if (error) {
              console.error(error);
              return;
            }
            const parsedData = JSON.parse(data.toString());
           
            parsedData.swaggerDefinition.definitions = obj;

            writeFile(Constants.SWAGGER_CONFIG, JSON.stringify(parsedData, null, 2), (err) => {
              if (err) {
                console.error('Failed to write updated data to file');
                return;
              }
              console.error('Updated file successfully');
            });
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
            definition = {...definition, ...{[item.name]: item.swaggerDefinition[item.name]}};
        }
        
        return definition;
    }
}

