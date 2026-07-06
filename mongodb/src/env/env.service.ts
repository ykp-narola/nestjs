import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
    constructor(private readonly config: ConfigService) {

    }

    getEnv(key: string) {
        return this.config.get<string>(key);
    }
}
