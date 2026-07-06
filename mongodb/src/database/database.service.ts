import { Injectable } from '@nestjs/common';
//  nest g service database
@Injectable()
export class DatabaseService {
    private isConnected = false;

    onModuleInit() {
        this.isConnected = true
        console.log(`Database Connected => ${this.isConnected}`);
    }

    onApplicationBootstrap() {
        console.log(`Database Connection Ready => ${this.isConnected}`);
    }

    onModuleDestroy() {
        this.isConnected = false
        console.log(`Database Disconnected => ${this.isConnected}`);
    }

    onApplicationShutdown(signal: string) {
        this.isConnected = false
        console.log(`Database Connection Close => ${this.isConnected} on signal ${signal}`);
    }

    getStatus() {
        return this.isConnected ? "Connected" : "Disconnected";
    }
}
