import { FileUtils } from './utils/FileUtils';
export * from './decorators/SwaggifySchema';
export * from './Swaggify';

FileUtils.createFileInWorkspace('src/swagger/config/swagger.json');