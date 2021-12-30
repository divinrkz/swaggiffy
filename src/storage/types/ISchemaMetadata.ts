export interface ISchemaMetadata {
    /**
     * Class which owns the schema
     */
    target: Function;

    /**
     * Name of Class owning the schema 
     */
    name: string;

    /**
     * Swagger Definition for the schema
     */
    swaggish: any;
}