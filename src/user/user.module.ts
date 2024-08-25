import { Module } from "@nestjs/common"

import { SharedModule } from "@/shared/shared.module"

import { UserController } from "./user.controller"
import { UserService } from "./user.service"

@Module({
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
	imports: [SharedModule]
})
export class UserModule {}
