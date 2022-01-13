import dotenv from "dotenv";

export  abstract class Config {

    constructor() {
        dotenv.config();
    }

}