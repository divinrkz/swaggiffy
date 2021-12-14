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
            class: _class.name,
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


        readFile(this.__path, (error, data) => {
            if (error) {
              console.error(error);
              return;
            }

    
            const parsedData = JSON.parse(data.toString());
            const definition = parsedData.swaggerDefinition.definitions;

            const swaggifyModel: any = this.formatClassProps(obj);
            const modelName = Object.keys(swaggifyModel)[0];

            console.log('Definition1', definition);

            const tester = Object.assign({[modelName]: swaggifyModel[modelName]}, definition);
            
            console.log('Definition2', tester);

            // parsedData.swaggerDefinition.definitions = tester;

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
              [obj.class]: {
                  type: 'object',
                  properties: {
                      [obj.props[0].prop]: {
                          type: obj.props[0].type
                      }
                  }
              }
          }

    }


    static arrayize(obj: any) {
        const obj1 = { SwaggifyModel1: { type: 'object', properties: { name: [] } } };
        const obj2 = { SwaggifyModel2: { type: 'object', properties: { name: [] } } };

        const arr = [];
        arr.push(obj1);
        arr.push(obj2);

        console.log('Array', Object.values(arr));

        
        this.getSwaggerObject(arr);

        

        return arr;



    }

    static getSwaggerObject(arr: any) {
        console.log('Get swagger object', arr);

        for (const a of arr) {
            console.log(Object.keys(a)[0]);
        }


    }

}


export default Utility;