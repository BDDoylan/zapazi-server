import { db_host, db_user, db_pass, db_name, db_port } from "../config";
import { Sequelize } from "sequelize-typescript";
import { User } from "./models/user";

const connection = new Sequelize({
	dialect: "mysql",
	host: db_host,
	username: db_user,
	password: db_pass,
	database: db_name,
	port: db_port,
	logging: false,
	models: [User],
});

export default connection;
