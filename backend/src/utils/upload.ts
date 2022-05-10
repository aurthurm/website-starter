import { existsSync, mkdirSync, readFile, unlink } from 'fs';
import { extname, join } from 'path';
import { promisify } from 'util';
import * as sharp from 'sharp';
import { diskStorage } from 'multer';

const readFileAsync = promisify(readFile);

export const dynamicDesination = (req, file, callback) => {
  const today = new Date();
  const uploadDir = `uploads/${today.getFullYear()}/${today.getMonth()}`;
  const resolveDir = join(__dirname, '../../', uploadDir);
  if (!existsSync(resolveDir)) {
    mkdirSync(resolveDir, {
      recursive: true,
    });
  }
  callback(null, `./${uploadDir}`);
};

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(10)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

export const multerOptions = {
  storage: diskStorage({
    destination: dynamicDesination,
    filename: editFileName,
  }),
  fileFilter: imageFileFilter,
};

export const imageResizer = async (file: Express.Multer.File) => {
  if (!file?.path) return;
  await readFileAsync(file.path).then(async (buffer: Buffer) => {
    const thumb = `${file.destination}/${
      file.filename.split('.')[0]
    }_thumb${extname(file.originalname)}`;
    await sharp(buffer)
      .resize(200, 200, {
        fit: 'inside',
      })
      .toFile(thumb);
  });
};

export const deleteFile = async (filePath: string) => {
  const unlinkAsync = promisify(unlink);

  if (filePath?.length > 0) {
    await unlinkAsync(filePath);
    // delete thumb
    const splitPath = filePath.split('.');
    const ext = splitPath.pop();
    const partialPath = splitPath.join('.');
    const thumb = `${partialPath}_thumb.${ext}`;
    await unlinkAsync(thumb);
  }
};

export const duplicateFileCleaner = async (
  newFilePath: string,
  oldFilePath: string,
) => {
  if (newFilePath?.length <= 0 && oldFilePath?.length <= 0) {
    return '';
  } else if (newFilePath?.length > 0 && oldFilePath?.length > 0) {
    const oldFile = await readFileAsync(oldFilePath);
    const newFile = await readFileAsync(newFilePath);
    if (oldFile.compare(newFile) === 0) {
      await deleteFile(newFilePath);
      return oldFilePath;
    } else {
      await deleteFile(oldFilePath);
      return newFilePath;
    }
  } else if (newFilePath?.length <= 0) {
    return oldFilePath;
  } else {
    return newFilePath;
  }
};
