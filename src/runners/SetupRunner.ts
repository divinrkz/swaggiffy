import { Defaults } from '../utils/Defaults';
import { FileUtils } from '../utils/FileUtils';
export class SetupRunner {

    /**
     * Generate Swaggify Configuration File Template
     */
    static async generateConfigFile() {
       return FileUtils.createFileInWorkspace(Defaults.SWAGGIFY_CONFIG_FILE);
    }   

}