import { Express } from "express";
import swaggerUi, { JsonObject } from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { PlatformTools } from "./platform/PlatformTools";
import { FileUtils } from "./utils/FileUtils";
import { PathString } from "./typings";
import { SwaggifyError } from "./errors/SwaggifyError";

/**
 * Implicit Express Server.
 */
class App {
    private app: Express;

    constructor() {}

    /**
     * Initialize and Setup the server.
     * @param expressApp expressApplication
     * @param swaggerEndpoint  swaggerEndpointUrl
     * @param swaggerConfigFile swaggerConfigFilePath
     */
    public init(expressApp: Express, swaggerConfigFile: string, swaggerEndpoint: PathString): void {
        this.app = expressApp;
        this.run(swaggerConfigFile, swaggerEndpoint);
    }

    /**
     * Serves swagger file in specified file and endpoint
     * @param swaggerEndpoint  swaggerEndpointUrl
     * @param swaggerConfigFile swaggerConfigFilePath
     */
    public serveSwagger(swaggerConfigFile: string, swaggerEndpoint: PathString): void {
        import(swaggerEndpoint).then((file) => {
            const specs: JsonObject = swaggerJsdoc(file);
            this.app.use(swaggerConfigFile, swaggerUi.serve, swaggerUi.setup(specs));
        });
    }

    /**
     * Runs and executes swaggify
     * @param swaggerEndpoint  swaggerEndpointUrl
     * @param swaggerConfigFile swaggerConfigFilePath
     */
    private async run(swaggerConfigFile: string, swaggerEndpoint: PathString) {
        // Runner.execute();
        setTimeout(() => {
            console.log(swaggerConfigFile, swaggerEndpoint);
            this.serveSwagger(swaggerConfigFile, swaggerEndpoint);
        }, 2000);
    }
}

export default App;
