import { Defaults } from '../utils/Defaults';
import { FileUtils } from '../utils/FileUtils';
export class SetupRunner {

    /**
     * Generate Swaggify Configuration File Template
     */
    static async generateConfigFile() {
       await FileUtils.createFileInWorkspace(Defaults.SWAGGIFY_CONFIG_FILE);

       
       
    //    FileUtils.writeToFile(Defaults.SWAGGIFY_CONFIG_FILE, );
    }   

}