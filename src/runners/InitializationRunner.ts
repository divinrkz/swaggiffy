import { Defaults } from "../utils/Defaults";
import { FileUtils } from "../utils/FileUtils"

/**
 * Swaggify Initialization Runner
 */
export class InitRunner {
    static async extractConfigurations(): Promise<string> {
        return new Promise<string>(async (ok, fail) => {
          const configFile: string = process.cwd() + '/' +  FileUtils.cleanPath(Defaults.SWAGGIFY_CONFIG_FILE);
          console.log(await FileUtils.getFileContents(configFile).toString());           
        })
    }   
}