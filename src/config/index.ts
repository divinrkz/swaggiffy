import dotenv from "dotenv";

export default abstract class Config {

    constructor() {
        dotenv.config();
    }

}