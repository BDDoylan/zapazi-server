import { Table, Model, Column, AllowNull, NotEmpty } from "sequelize-typescript";

export interface UserI {
	userId: string;
	email: string;
	displayName: string;
}

@Table({
	tableName: "user",
	timestamps: true,
})
export default class User extends Model implements UserI {
	@AllowNull(false)
	@NotEmpty
	@Column
	userId!: string;

	@AllowNull(false)
	@NotEmpty
	@Column
	email!: string;

	@AllowNull(false)
	@NotEmpty
	@Column
	displayName!: string;
}
