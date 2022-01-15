import { Defaults } from '../utils/Defaults';
import { FileUtils } from '../utils/FileUtils';
export class SetupRunner {

    /**
     * Generate Swaggify Configuration File Template
     */
    static generateConfigFile() {
        FileUtils.createFileInWorkspace(Defaults.SWAGGIFY_CONFIG_FILE);
    }   

}