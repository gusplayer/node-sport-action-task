import { Type } from "class-transformer"
import { IsNumber, IsOptional, IsString, Min } from "class-validator"

export class FilterParcicipantsDto {
	@IsOptional()
	@IsNumber()
	@Min(1)
	@Type(() => Number)
	page?: number

	@IsOptional()
	@IsNumber()
	@Min(1)
	@Type(() => Number)
	limit?: number

	@IsOptional()
	@IsString()
	firstName?: string

	@IsOptional()
	@IsString()
	lastName?: string
}
