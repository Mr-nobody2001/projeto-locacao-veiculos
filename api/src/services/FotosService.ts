import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as process from "process";

@Injectable()
export class FotosService {
    async salvarFoto(base64Data: string, pasta: string): Promise<string> {
        try {
            const matches = base64Data.match(/^data:image\/([A-Za-z-+/]+);base64,(.+)$/);
            const type = matches[1];
            const base64Image = matches[2];
            const buffer = Buffer.from(base64Image, 'base64');
            const nomeArquivo = 'foto_veiculo_' + Date.now() + '.' + type;
            const caminho = process.cwd() + `\\uploads\\${pasta}\\` + nomeArquivo;

            fs.writeFileSync(caminho, buffer);

            return caminho;
        } catch (error) {
            throw new Error(`Erro ao salvar a foto: ${error.message}`);
        }
    }
}
