import passport from "passport";
import { client_id, client_secret } from "../config";
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser((user: any, done) => {
	done(null, user);
});

passport.deserializeUser((user: any, done) => {
	done(null, user);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: client_id,
			clientSecret: client_secret,
			callbackURL: "http://localhost:5000/google/callback",
		},
		function (accessToken: any, refreshToken: any, profile: any, cb: any) {
			cb(null, profile);
		}
	)
);
