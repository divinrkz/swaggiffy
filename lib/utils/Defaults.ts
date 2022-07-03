import { PathString, TFormat, TOpenApiVersion } from '../typings';

/**
 * Class containing all global Defaults and Constants
 */
export class Defaults {
    /**
     * Default Swagger Endpoint Url
     */
    public static SWAGGER_ENDPOINT_URL: PathString = '/api-docs';

    /**
     * Default Swagger Config File Path
     */
    public static SWAGGER_DEFINITION_FILE = './swagger/swagger.json';

    /**
     * Default Swaggiffy Configuration File
     */
    public static SWAGGIFY_CONFIG_FILE = './swaggiffy.config.json';

    /**
     * Default Swagger Definition File Format
     */
    public static SWAGGER_DEFINITION_FORMAT: TFormat = 'json';

    /**
     * App port
     */
    public static APP_PORT: number = 5008;


    /**
     * Default Swagger Definition File Format
     */
    public static OPENAPI_VERSION: TOpenApiVersion = '2.0';
}
