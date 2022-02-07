import App from "./app";
import { PathString } from "./typings";
import { getConfigMetadataStorage } from "./globals";
import { ConfigMetadataStorage } from "./storage/ConfigMetadataStorage";
import { SwaggifyError } from "./errors/SwaggifyError";
import { Defaults } from "./utils/Defaults";
import { SetupRunner } from "./runners/SetupRunner";
import { Templates } from "./utils/Templates";
import { InitRunner } from "./runners/InitRunner";

/**
 * Swaggify base class
 */
export class Swaggify {
    private app: App;
    private configStore: ConfigMetadataStorage = getConfigMetadataStorage();

    constructor() {
        this.app = new App();
    }

    /**
     * Setups expressApplication with swaggify.
     * @returns Swaggify
     */
    public setupExpress(expressApp: any): this {
        // this.configStore expressApplication in ConfigMetadataStorage.
        this.configStore.expressApplication = expressApp;
        return this;
    }

    /**
     * dsfa
     *
     * Setups route endpoint url with swaggify.
     * @returns Swaggify
     */
    public setupRoute(routeEndPointUrl: PathString): this {
        this.configStore.swaggerEndPointUrl = routeEndPointUrl;
        return this;
    }

    /**
     * Setups and Builds a swagger config file template in the specified directory and file.
     * @returns Swaggify
     */
    public setupSwagger(filePath: string): this {
        this.configStore.swaggerDefinitionFilePath = filePath;
        return this;
    }

    /**
     * Swaggifies your application.
     * @returns Swaggify
     */
    public async swaggify(): Promise<this> {
        try {
            await InitRunner.cacheGlobalConfigurations();
            
      
            if (this.configStore.expressApplication == undefined || this.configStore.expressApplication == null)
                throw new SwaggifyError("Express Application instance is undefined");
                
            // const res = await SetupRunner.generateConfigFile(Templates.getConfigTemplate());

            // if (this.configStore.expressApplication == undefined || this.configStore.expressApplication == null)
            //     throw new SwaggifyError("Express Application instance is undefined");

            // if (this.configStore.swaggerEndPointUrl == undefined || this.configStore.swaggerEndPointUrl == null)
            //     this.configStore.swaggerEndPointUrl = Defaults.SWAGGER_ENDPOINT_URL;

            // if (this.configStore.swaggerDefinitionFilePath == undefined || this.configStore.swaggerDefinitionFilePath == null)
            //     this.configStore.swaggerDefinitionFilePath = Defaults.SWAGGER_DEFINITION_FILE;

            this.app.init(this.configStore.expressApplication, this.configStore.swaggerDefinitionFilePath, this.configStore.swaggerEndPointUrl);
        } catch (err: unknown) {
            throw new SwaggifyError();
        }

        return this;
    }
}
