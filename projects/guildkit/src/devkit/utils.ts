import { existsSync as exists } from "node:fs";
import { cp, readdir, unlink } from "node:fs/promises";
import { join, relative } from "node:path";

const walkDir = async (dirPath: string) => (await readdir(dirPath, {
  withFileTypes: true,
  recursive: true,
})).filter((entry) => entry.isFile())
  .map((file) => {
    const fullPath = join(file.parentPath || dirPath, file.name);
    const relPath = relative(dirPath, fullPath);
    return relPath;
  });

export const syncDirs = async (srcDirPath: string, destDirPath: string) => {
  // Delete files only exist in destDir
  if (exists(destDirPath)) {
    const srcFilePaths = await walkDir(srcDirPath);
    const destFilePaths = await walkDir(destDirPath);

    await Promise.all(
      destFilePaths.map(async (destFilePath) => {
        if (!srcFilePaths.find((srcFilePath) => srcFilePath === destFilePath)) {
          await unlink(join(destDirPath, destFilePath));
        }
      }),
    );
  }

  return cp(srcDirPath, destDirPath, { recursive: true, force: true });
};
