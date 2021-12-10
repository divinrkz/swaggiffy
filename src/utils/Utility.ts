import { Class } from "../typings";
import {readFileSync, writeFile, readFile} from 'fs';


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
      
        const obj = new _class();
        const props = [];

        for (const prop of Object.keys(obj)) {
            props.push({type: typeof obj[prop], prop: prop});
        }

        return {
            class: _class,
            className: _class.constructor.name,
            props
        }
    }

    static compileSwagger() {

    }


    static getSwagger() {
        const json: Buffer =  readFileSync(__dirname + '/swagger.json');
        const swagger = JSON.parse(json.toString());
        console.info('Swagger APIS', swagger.apis);   
        return swagger;  
    }


    static writeSwagger(obj: any) {
        const swagger = this.getSwagger();
        console.info(swagger.swaggerDefinition.definitions);

        const test = {name: 'divin'};

        readFile(this.__path, (error, data) => {
            if (error) {
              console.error(error);
              return;
            }

    
            const parsedData = JSON.parse(data.toString());
            parsedData.swaggerDefinition.definitions = this.formatClassProps(obj);
            writeFile(this.__path, JSON.stringify(parsedData, null, 2), (err) => {
              if (err) {
                console.log('Failed to write updated data to file');
                return;
              }
              console.log('Updated file successfully');
            });
          });
    }


    static formatClassProps(obj: any) {
          return {
              [obj.className]: {
                  type: 'object',
                  properties: {
                      [obj.props[0].prop]: {
                          type: [obj.props[0].prop]
                      }
                  }
              }
          }

    }

}


export default Utility;