import {readFileSync, writeFile, readFile} from 'fs';
import { TClassProps } from '../typings';


class Utility {

    private static __path: string = __dirname + '/swagger.json';

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


    static getClassProps(_class: any) {
      
        const instance: typeof _class = new _class();
      
        const props: TClassProps = [];

        for (const prop of Object.keys(instance)) {
            props.push({type: typeof instance[prop], prop: prop});
        }

        return {
            class: _class.name,
            props
        }
    }

    static compileSwagger() {

    }


    static writeSwagger(obj: any) {
        readFile(this.__path, (error, data) => {
            if (error) {
              console.error(error);
              return;
            }

            const parsedData = JSON.parse(data.toString());
            const definition = parsedData.swaggerDefinition.definitions;

            const swaggifyModel: any = obj;
            const modelName = Object.keys(swaggifyModel)[0];


            const tester = Object.assign({[modelName]: swaggifyModel[modelName]}, definition);
        
            parsedData.swaggerDefinition.definitions = tester;

            writeFile(this.__path, JSON.stringify(parsedData, null, 2), (err) => {
              if (err) {
                console.error('Failed to write updated data to file');
                return;
              }
              console.error('Updated file successfully');
            });
          });
    }


    static formatClassProps(obj: any) {

        let props = {};

        for (const prop of obj.props) {
          props = Object.assign({[prop.prop]: { type: prop.type}}, props);
        }

          return {
              [obj.class]: {
                  type: 'object',
                  properties: props
              }
          }

    }


}


export default Utility;