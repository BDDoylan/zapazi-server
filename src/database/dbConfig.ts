import { db_dialect, db_host, db_user, db_pass, db_name, db_port } from "../config";
import { Sequelize } from "sequelize-typescript";
const db: any = {};

const connection = new Sequelize({
	dialect: db_dialect,
	host: db_host,
	username: db_user,
	password: db_pass,
	database: db_name,
	port: db_port,
	logging: false,
	models: [__dirname + "/models"],
});

db.connection = connection;
db.models = connection.models;
db.Sequelize = Sequelize;

export default db;
