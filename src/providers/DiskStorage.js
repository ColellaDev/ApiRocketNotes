const fs = require("fs")
const path = require("path")
const uploadConfig = require("../configs/upload")

class DiskStorage {
    async saveFile(file) {
        await fs.promises.rename( // rename, renomeia ou move o arquivo
            path.resolve(uploadConfig.TMP_FOLDER, file),
            path.resolve(uploadConfig.UPLOADS_FOLDER, file)
        ) // path.resolve ele resolve o caminho do arquivo independente do Sistema

        return file
    }

    async deleteFile(file) {
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)

        try {
            await fs.promises.stat(filePath); //stat retorna o status do arquivo
        } catch {
            return
        }

        await fs.promises.unlink(filePath) //unlink deleta o arquivo
    }
}

module.exports = DiskStorage


