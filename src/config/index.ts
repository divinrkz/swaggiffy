import dotenv from "dotenv";
import { PlatformTools } from "../lib/platform/PlatformTools";

export  abstract class Config {

    constructor() {
        dotenv.config();
    }

}