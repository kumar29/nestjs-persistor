import {Supertype, supertypeClass} from '@haventech/amorphic';
import '../../common/js/models';
import {NestFactory} from '@nestjs/core';
import {AppModule} from "../../../app.module";

@supertypeClass
export class Controller extends Supertype {
    async serverInit() {
        const app = await NestFactory.create(AppModule);
        await app.listen(3000);
    }
}

