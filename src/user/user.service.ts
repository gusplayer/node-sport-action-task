import { Injectable } from "@nestjs/common"

import { PrismaService } from "@/shared/services"

@Injectable()
export class UserService {
	constructor(private readonly prismaService: PrismaService) {}
}
