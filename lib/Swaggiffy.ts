import App from './app';
import { PathString } from './typings';
import { getConfigMetadataStorage } from './globals';
import { ConfigMetadataStorage } from './storage/ConfigMetadataStorage';
import { SwaggiffyError } from './errors/SwaggiffyError';
import { InitRunner } from './runners/InitRunner';
import { Runner } from './runners/Runner';

/**
 * Swaggiffy base class
 */
export class Swaggiffy {
    private app: App;
    private configStore: ConfigMetadataStorage = getConfigMetadataStorage();

    constructor() {
        this.app = new App();
    }

    /**
     * Setups expressApplication with swaggiffy.
     * @returns Swaggiffy
     */
    public setupExpress(expressApp: Express.Application): this {
        // this.configStore expressApplication in ConfigMetadataStorage.
        this.configStore.expressApplication = expressApp;
        return this;
    }

    /**
     * dsfa
     *
     * Setups route endpoint url with swaggiffy.
     * @returns Swaggiffy
     */
    public setupRoute(routeEndPointUrl: PathString): this {
        this.configStore.swaggerEndPointUrl = routeEndPointUrl;
        return this;
    }

    /**
     * dsfa
     *
     * Setups route endpoint url with swaggiffy.
     * @returns Swaggiffy
     */
    public setupPort(port: number): this {
        this.configStore.appPort = port;
        return this;
    }

    /**
     * Setups and Builds a swagger config file template in the specified directory and file.
     * @returns Swaggiffy
     */
    public setupSwagger(filePath: string): this {
        this.configStore.swaggerDefinitionFilePath = this.configStore.relativePath ? process.cwd() + '/' + filePath : filePath;
        return this;
    }

    /**
     * Swaggifies your application.
     * @returns Swaggiffy
     */
    public async swaggiffy(): Promise<this> {
        try {
            if (this.configStore.expressApplication === undefined || this.configStore.expressApplication === null)
                throw new SwaggiffyError('Express Application instance is undefined.');

            await InitRunner.cacheGlobalConfigurations();

            this.app.init(this.configStore);
        } catch (err: unknown) {
            throw new SwaggiffyError();
        }

        return this;
    }
}
