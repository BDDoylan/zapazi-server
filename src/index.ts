import { server_port, client_url } from "./config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
const SequelizeStore = require("connect-session-sequelize")(session.Store);
import db from "./database/dbConfig";

// Routes
import routes from "./routes/index";

const app = express();
app.use(
	cors({
		origin: client_url,
		credentials: true,
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		secret: "O87GSEBTGO34HJTB3HTBV3IT4G87FVO879STSSIHRFSHBGIHBVS",
		resave: false, // don't save session if unmodified
		saveUninitialized: false, // don't create session until something stored
		store: new SequelizeStore({
			db: db.connection,
			expiration: 315360000000,
		}),
		cookie: { maxAge: 315360000000 },
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	res.status(500).json({ message: err.message });
});

app.use(routes);

try {
	db.connection.sync().then(() => {
		console.log("Database synced successfully!");
	});
} catch (err) {
	console.log(err);
}

app.listen(server_port, () => console.log(`App is running on port ${server_port}!`));
