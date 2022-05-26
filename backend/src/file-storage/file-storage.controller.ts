import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Res,
  Request,
  Delete,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import { deleteFile, imageResizer, multerOptions } from 'src/utils/upload';

@Controller('file-storage')
@ApiTags('file-storage')
export class FileStorageController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @Post('upload-one')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req) {
    console.log(req.headers);
    imageResizer(file);
    // return { ...file };
    return {
      location: 'http://' + req.headers.host + '/' + file.path,
      extras: file,
    };
  }

  @Post('upload-many')
  @UseInterceptors(FilesInterceptor('image', 20, multerOptions))
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach((file) => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }

  @Get('')
  async viewUploadedFile(@Request() req, @Res() res) {
    const imagePath = req.query.filepath.split('/');
    const fileName = imagePath.pop();
    const rootPath = `./${imagePath.join('/')}`;
    return res.sendFile(fileName, { root: rootPath });
  }

  @Delete('')
  async deleteUploadedFile(@Request() req) {
    try {
      await deleteFile(req.query.filepath);
      return { message: 'success' };
    } catch (err) {
      return { message: err };
    }
  }
}
