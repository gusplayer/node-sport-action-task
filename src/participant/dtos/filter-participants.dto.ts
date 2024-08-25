import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNumber, IsOptional, IsString, Min } from "class-validator"

export class FilterParcicipantsDto {
	@ApiProperty({
		example: 1,
		required: true
	})
	@IsOptional()
	@IsNumber()
	@Min(1)
	@Type(() => Number)
	page?: number

	@ApiProperty({
		example: 10,
		required: true
	})
	@IsOptional()
	@IsNumber()
	@Min(1)
	@Type(() => Number)
	limit?: number

	@ApiProperty({
		example: "John",
		required: false
	})
	@IsOptional()
	@IsString()
	firstName?: string

	@ApiProperty({
		example: "Doe",
		required: false
	})
	@IsOptional()
	@IsString()
	lastName?: string
}
