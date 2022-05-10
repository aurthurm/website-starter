import { Module } from '@nestjs/common';
import { FileStorageController } from './file-storage.controller';

@Module({
  controllers: [FileStorageController],
})
export class FileStorageModule {}
