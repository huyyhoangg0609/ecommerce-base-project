/* eslint-disable @typescript-eslint/ban-types */
import { Injectable, BadRequestException } from "@nestjs/common";
import { BaseEntity, DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

@Injectable()
export class TypeOrmBaseRepository<T extends BaseEntity> {
    constructor(private readonly baseRepo: Repository<T>) {}

    async findMany(options?: FindManyOptions<T>): Promise<T[]> {
        return await this.baseRepo.find(options);
    }

    async findOne(options?: FindOneOptions<T>): Promise<T> {
        return await this.baseRepo.findOne(options);
    }

    async count(options?: FindManyOptions<T>): Promise<number> {
        return await this.baseRepo.count(options);
    }

    async create(model: DeepPartial<T>): Promise<T> {
        try {
            const newEntity = await this.baseRepo.create(model);
            return await newEntity.save();
        } catch(err) {
            throw new BadRequestException(err);
        }   
    }

    async update(options: FindOptionsWhere<T>, model: QueryDeepPartialEntity<T>) {
        try {
            return await this.baseRepo.update(options, model);
        } catch(err) {
            throw new BadRequestException(err);
        }
    }

}