import App from './app';
import { PathString } from './typings';
import { getConfigMetadataStorage } from './globals';
import { ConfigMetadataStorage } from './storage/ConfigMetadataStorage';
import { SwaggifyError } from './errors/SwaggifyError';
import { InitRunner } from './runners/InitRunner';
import { Runner } from './runners/Runner';

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
    public setupExpress(expressApp: Express.Application): this {
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
        this.configStore.swaggerDefinitionFilePath = this.configStore.relativePath ? process.cwd() + '/' + filePath : filePath;
        return this;
    }

    /**
     * Swaggifies your application.
     * @returns Swaggify
     */
    public async swaggify(): Promise<this> {
        try {
            if (this.configStore.expressApplication === undefined || this.configStore.expressApplication === null)
                throw new SwaggifyError('Express Application instance is undefined.');

            await InitRunner.cacheGlobalConfigurations();

            this.app.init(this.configStore);
        } catch (err: unknown) {
            throw new SwaggifyError();
        }

        return this;
    }
}
