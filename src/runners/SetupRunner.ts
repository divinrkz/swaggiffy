import { FileUtils } from '../utils/FileUtils';
export class SetupRunner {

    static generateConfigFile(filePath: string) {
        FileUtils.createFileInWorkspace(filePath);
    }   
}