import { copyFile, mkdir, readdir, readFile, unlink } from "node:fs/promises";
import { dirname, join, relative } from "node:path";

const walkDir = async (dirPath: string) => (await readdir(dirPath, {
  withFileTypes: true,
  recursive: true,
})).filter((entry) => entry.isFile())
  .map((file) => {
    const fullPath = join(file.parentPath || dirPath, file.name);
    const relPath = relative(dirPath, fullPath);
    return { relPath, fullPath } as const;
  });

export const syncDir = async (srcDirPath: string, destDirPath: string) => {
  await mkdir(destDirPath, { recursive: true });

  const srcFilePaths = await walkDir(srcDirPath);
  const destFilePaths = await walkDir(destDirPath);

  await Promise.all([
    ...srcFilePaths.map(async ({ relPath, fullPath: srcFilePath }) => {
      const destFilePath = join(destDirPath, relPath);

      // 1. Overwrite files if they are different
      if (destFilePaths.find(({ relPath: destRelPath }) => destRelPath === relPath)) {
        const srcContent = await readFile(srcFilePath);
        const destContent = await readFile(destFilePath);

        if (!srcContent.equals(destContent)) {
          await copyFile(srcFilePath, destFilePath);
        }
      } else { // 2. Copy files that only exist in srcPath
        await mkdir(dirname(destFilePath), { recursive: true });
        await copyFile(srcFilePath, destFilePath);
      }
    }),
    ...destFilePaths.map(async ({ relPath, fullPath: destFilePath }) => {
      if (!srcFilePaths.find(({ relPath: srcRelPath }) => srcRelPath === relPath)) {
        await unlink(destFilePath);
      }
    }),
  ]);
};
