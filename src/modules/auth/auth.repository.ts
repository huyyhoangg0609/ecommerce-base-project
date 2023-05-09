import { Injectable } from "@nestjs/common";
import { TypeOrmBaseRepository } from "src/common/database/typeorm.baserepo";
import { Account } from "./entities/account.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AuthRepository extends TypeOrmBaseRepository<Account> {
   constructor(@InjectRepository(Account) authRepo: Repository<Account>) {
    super(authRepo);
   }

   async getRefreshTokenById(accountId: string) {
      return await this.findOne({ select: ['refreshToken'], where: {id: accountId} });
   }

   async updateRefreshToken(accountId: string, refreshToken: string) {
      return await this.update({ id: accountId }, { refreshToken });
   }

   async findAccountById(accountId: string) {
      return await this.findOne({ where: { id: accountId }});
   }

   

}