import dotenv from "dotenv";

dotenv.config();

export const server_port = String(process.env.SERVER_PORT);

export const db_host = String(process.env.DB_HOST);
export const db_user = String(process.env.DB_USER);
export const db_pass = String(process.env.DB_PASS);
export const db_name = String(process.env.DB_NAME);
export const db_port = Number(process.env.DB_PORT);

export const client_id = String(process.env.CLIENT_ID);
export const client_secret = String(process.env.CLIENT_SECRET);
