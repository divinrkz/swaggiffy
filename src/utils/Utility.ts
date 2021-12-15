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
        return swagger;  
    }


    static writeSwagger(obj: any) {

        readFile(this.__path, (error, data) => {
            if (error) {
              console.error(error);
              return;
            }

    
            const parsedData = JSON.parse(data.toString());
            const definition = parsedData.swaggerDefinition.definitions;

            const swaggifyModel: any = this.formatClassProps(obj);
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