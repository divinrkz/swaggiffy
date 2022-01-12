import express, {Express} from "express";
import {Config} from "./config";
import swaggerUi, {JsonObject} from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { User } from "./models/user.model";
import { Phone, Person } from "./models/phone.model";
import {Runner} from "./lib/runners/runner";
import { PlatformTools } from './lib/platform/PlatformTools';
import { FileUtils } from "./lib/utils/FileUtils";

class App extends Config {

    private PORT: number = parseInt(process.env.PORT as string);
    private app: Express;

    constructor() {
        super();
        this.app = express();
        this.init();
    }

    public init(): void {
        // PlatformTools.logInfo("Testing", {});
        // this.swaggify();
        console.log(FileUtils.createFileInWorkspace('swagger.json'));
    }

    public listen(): void {
        this.app.listen(this.PORT, () => {
            console.log(`App listening on PORT ${process.env.PORT}`);
        });
    }  
    

    private async swaggify() {    
        new Phone();
        new Person();
        new User();
        
        Runner.execute();

       setTimeout(() => {
        import("./swagger/swagger.json").then((file) =>  {
            const specs: JsonObject = swaggerJsdoc(file);
            this.app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
        });
       }, 2000); 
    }
}

export default App;