import {writeFile, readFile} from 'fs';
import { SchemaMetadata } from '../../storage/types/SchemaMetadata';
import { TClassDef, TClassProps, TSchemaProp, TSwaggerSchema } from '../../typings';
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
    static swaggify(obj: TSwaggerSchema): void {
        readFile(Constants.SWAGGER_CONFIG, (error, data) => {
            if (error) {
              console.error(error);
              return;
            }
            const parsedData = JSON.parse(data.toString());
            const modelName = Object.keys(obj)[0];
            const tester: TSwaggerSchema = Object.assign({[modelName]: obj[modelName]}, {});
           
            parsedData.swaggerDefinition.definitions = tester;

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
     * Compress an array to an object JSON type
     */
    static compressArrToObj(array: SchemaMetadata[]): TSwaggerSchema {

        // console.log('Compress', arr);

        // let obj: any = <TSwaggerSchema>{};

        // for (const item of arr) {

        //     obj = {...obj, ...{[item.name]: item.swaggerDefinition}};
        //     // Object.assign({[prop.prop]: { type: prop.type}}, props);
        // }


        const definition: any = {};
        const obj:any = { a:1, b:2 }
        const add = { c:3, d:4, e: ['x','y','z'] }
        
        Object.entries(add).forEach(([key,value]) => { obj[key] = value })

console.log('Object', obj);

        for (const item of array) {
            Object.entries(item).forEach(([key, value]) => {definition[key] = value});
        }

        console.log('Definition', definition)

        // console.log(obj);
        return <TSwaggerSchema> {
            
        };
    }
}

