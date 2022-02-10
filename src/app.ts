import { Express } from "express";
import swaggerUi, { JsonObject } from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { PlatformTools } from "./platform/PlatformTools";
import { FileUtils } from "./utils/FileUtils";
import { PathString } from "./typings";
import { SwaggifyError } from "./errors/SwaggifyError";
import { ConfigMetadataStorage } from './storage/ConfigMetadataStorage';

/**
 * Implicit Express Server.
 */
class App {
    private app: Express;

    constructor() {}

    /**
     * Initialize and Setup the server.
     * @param config ConfigMetadataStorage
     */
    public init(config: ConfigMetadataStorage): void {
        this.app = config.expressApplication;
        this.run(config.swaggerDefinitionFilePath, config.swaggerEndPointUrl);
    }

    /**
     * Serves swagger file in specified file and endpoint
     * @param swaggerEndPoint  swaggerEndPointUrl
     * @param swaggerDefinitionFile swaggerDefinitionFilePath
     */
    public serveSwagger(swaggerDefinitionFile: string, swaggerEndPoint: PathString): void {
        import(swaggerDefinitionFile).then((file) => {
            const specs: JsonObject = swaggerJsdoc(file);
            this.app.use(swaggerEndPoint, swaggerUi.serve, swaggerUi.setup(specs));
        });
    }

    /**
     * Runs and executes swaggify
     * @param swaggerEndPoint  swaggerEndPointUrl
     * @param swaggerDefinitionFile swaggerDefinitionFilePath
     */
    private async run(swaggerDefinitionFile: string, swaggerEndPoint: PathString) {
        // Runner.execute();
        this.app.listen(4008, () => {
            console.log('Listening');
        })
        this.serveSwagger(swaggerDefinitionFile, swaggerEndPoint);

    }
}

export default App;
