import fs from 'fs';
import sharp from 'sharp';

export default function compressImage(file: Express.Multer.File, size: number) {
    const oldPath = file.path;
    const newPath = file.path.substr(0, file.path.lastIndexOf('.')) + '.jpeg';
    return sharp(file.path)
        .rotate()
        .resize(size)
        .toFormat('jpeg')
        .jpeg({
            quality: 80
        })
        .toBuffer()
        .then((data) => {
            // delete the original file
            try {
                fs.accessSync(oldPath);
                fs.unlinkSync(oldPath);
            } catch {
            }
            fs.writeFile(newPath, data, (err) => {
                if (err) {
                    throw err;
                }
            });
            return newPath;
        });
}
