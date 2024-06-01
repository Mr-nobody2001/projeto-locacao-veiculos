import {Module} from '@nestjs/common';
import {CategoriaService} from './categoria.service';
import {CategoriaController} from './categoria.controller';
import {DatabaseModule} from "../../lib/database/database.module";
import {categoriaProviders} from "./categoria.providers";

@Module({
    imports: [DatabaseModule],
    controllers: [CategoriaController],
    providers: [CategoriaService,
        ...categoriaProviders,
    ],
    exports: [CategoriaService],
})
export class CategoriaModule {
}
