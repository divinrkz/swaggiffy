/**
 * Setup Runner class
 */
export class SetupRunner {

    private _swaggerPath;
    private _swaggerRoutePath;

    /**
     * Initial setup for Runner
     * @param swaggerPath 
     * @param swaggerRoutePath 
     */
    public setup(swaggerPath: string, swaggerRoutePath): typeof this {
        this._swaggerPath = swaggerPath;
        this._swaggerRoutePath = swaggerRoutePath;

        return this;
    }
}