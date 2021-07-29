import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'body-parser';
import * as cors from 'cors';
import { Request, static as serveStatic } from 'express';
import { get, isUndefined } from 'lodash';
import * as methodOverride from 'method-override';
import * as morgan from 'morgan';
import { join } from 'path';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const port = process.env.port || environment.port;

    app.setBaseViewsDir(join(__dirname, 'app'));
    app.setViewEngine('ejs');

    app.use(morgan('combined'));
    app.use(cors({
        exposedHeaders: [
            'Location'
        ]
    }));
    app.use(urlencoded({
        extended: true
    }));
    app.use(json());

    app.use(methodOverride((request: Request) => {
        const method = get(request, 'body._method');
        if (!isUndefined(method)) {
            delete request.body._method;
        }
        return method;
    }));

    app.use('/assets', serveStatic(join(__dirname, 'assets')));

    await app.listen(port, '0.0.0.0', () => console.log(`Web app listening at port ${port}`));
}

bootstrap();
