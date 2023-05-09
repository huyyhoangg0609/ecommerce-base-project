/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'Hoang123',
            database: 'ecommerce',
            synchronize: true,
            entities: ['dist/modules/**/*.entity.js'],
        }),
    ],
})
export class DatabaseModule {}