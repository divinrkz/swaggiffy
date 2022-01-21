import { Defaults } from '../utils/Defaults';
import { FileUtils } from '../utils/FileUtils';
export class SetupRunner {

    /**
     * Generate Swaggify Configuration File Template
     */
    static async generateConfigFile(configFile?: string) {
       await FileUtils.createFileInWorkspace(configFile || Defaults.SWAGGIFY_CONFIG_FILE);       
    }   

}