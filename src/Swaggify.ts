import {Express} from "express";
import App from "./app";
import { PathString } from "./typings";
import { getConfigMetadataStorage } from "./globals";
import { ConfigMetadataStorage } from "./storage/ConfigMetadataStorage";
import { CustomException } from "./exceptions/SwaggifyException";


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
    public setupExpress(expressApp: Express): typeof this {         
        // Store expressApplication in ConfigMetadataStorage.
        this.configStore.expressApplication = expressApp;
        
        return this;
    }

    /**
     * Setups route endpoint url with swaggify.
     * @returns Swaggify
     */
    public setupRoute(routeEndPointUrl: PathString): typeof this {
        this.configStore.swaggerEndPointUrl = routeEndPointUrl;
        return this;
    } 


    /**
     * Setups and Builds a swagger config file template in the specified directory and file.
     * @returns Swaggify
     */
    public setupSwagger(filePath: string): typeof this {
        this.configStore.swaggerConfigPath = filePath;
        return this;
    }


    /**
     * Swaggifies your application.
     * @returns Swaggify
     */
    public swaggify(): typeof this {
        const store: ConfigMetadataStorage = this.configStore;

        if (store.expressApplication == undefined || store.expressApplication == null)
            throw CustomException(); 
            
        this.app.init(this.configStore.expressApplication);
        return this;
    }

    this.app.init(this.expressApp);

}

