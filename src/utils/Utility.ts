class Utility {

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
        console.log('Type of Class', typeof _class);
        const obj = new _class();
        console.log(obj);
        const props = [];
        for (const prop of Object.keys(obj)) {
            console.log(typeof obj[prop]);
            props.push({type: typeof obj[prop], prop: prop});
        }

        return {
            class: _class,
            props
        }
    }
}


export default Utility;