import {readFileSync, writeFile, readFile} from 'fs';
import { TClassDef, TClassProp, TClassProps, TSwaggerSchema, TSwaggerType } from '../typings';
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


    static getClassProps(_class: any): TClassDef {
        const instance: typeof _class = new _class();
        const props: TClassProps = [];
        for (const prop of Object.keys(instance)) {
            props.push({type: typeof instance[prop], prop: prop});
        }
        return <TClassDef>{ class: _class.name, props };
    }


    static genSchemaDef(obj: TClassDef): TSwaggerSchema {
        let props: TClassProp = <TClassProp>{};
        for (const prop of obj.props) {
          props = Object.assign({[prop.prop]: { type: prop.type}}, props);
        }

        console.log(props);
        console.log({active: {type: 'boolean'}, d: {type: 'boolean'}, sd: {type: 'boolean'}, ds: {type: 'boolean'}})
        return <TSwaggerSchema>{
            [obj.class]: {
                type: 'object',
                properties: {props}
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
            const tester = Object.assign({[modelName]: obj[modelName]}, {});
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

}

