import passport from "passport";
import { client_id, client_secret } from "../config";
const GoogleStrategy = require("passport-google-oauth20").Strategy;
import db from "../database/dbConfig";
import { UserI } from "../database/models/user";

passport.serializeUser((user: any, cb) => {
	console.log("Serializing User...");
	console.log(user.dataValues);

	cb(null, user);
});

passport.deserializeUser((user: any, cb) => {
	console.log("Deserializing User");
	console.log(user);

	// try {
	// 	const user = await db.models.User.findOne({ where: { userId: userId } });

	// 	if (!user) throw new Error("User not found");

	// 	console.log(user.dataValues);
	// 	cb(null, user);
	// } catch (err) {
	// 	console.log(err);
	// 	cb(err, null);
	// }
	cb(null, user);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: client_id,
			clientSecret: client_secret,
			callbackURL: "http://localhost:5000/auth/google/callback",
		},
		async (accessToken: any, refreshToken: any, profile: any, cb: any) => {
			try {
				const user: UserI = await db.models.User.findOne({ where: { userId: profile.id } });

				if (user) {
					console.log("User has been found: Welcome", user.displayName);

					return cb(null, user);
				} else {
					const newUser: UserI = await db.models.User.create({
						userId: profile.id,
						email: profile.emails[0].value,
						displayName: profile.displayName,
					});

					console.log("Created zapazi user: Welcome", newUser.displayName);

					return cb(null, newUser);
				}
			} catch (err) {
				console.log(err);

				return cb(err, null);
			}
		}
	)
);
