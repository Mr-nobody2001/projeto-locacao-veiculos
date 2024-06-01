import {Module} from '@nestjs/common';
import {CorService} from './cor.service';
import {CorController} from './cor.controller';
import {DatabaseModule} from "../../lib/database/database.module";
import {corProviders} from "./cor.providers";

@Module({
    imports: [DatabaseModule],
    controllers: [CorController],
    providers: [CorService,
        ...corProviders,
    ],
    exports: [CorService],
})
export class CorModule {
}
