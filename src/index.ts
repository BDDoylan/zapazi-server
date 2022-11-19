import { server_port } from "./config";
import express, { NextFunction, Request, Response } from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import connection from "./database/dbConfig";

// Routes
import routes from "./routes/index";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: "O87GSEBTGO34HJTB3HTBV3IT4G87FVO879STSSIHRFSHBGIHBVS" }));

app.use(passport.initialize());
app.use(passport.session());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	res.status(500).json({ message: err.message });
});

app.use(routes);

try {
	connection.sync().then(() => {
		console.log("Database synced successfully!");
	});
} catch (err) {
	console.log(err);
}

app.listen(server_port, () => console.log(`App is running on port ${server_port}!`));
