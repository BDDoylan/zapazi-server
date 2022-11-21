import { Router, NextFunction, Request, Response } from "express";
import passport from "passport";
import "../../strategies/google";
import { isLoggedIn } from "../../utilities/middlewares";
import { profile_url, register_url, client_url } from "../../config";

const router = Router();

router.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: profile_url,
		failureRedirect: register_url,
	})
);

router.get("/failure", (req: Request, res: Response) => {
	res.send("Failed Authentication!");
});

router.get("/getUser", (req: Request, res: Response) => {
	res.send(req.user);
});

router.get("/logout", isLoggedIn, (req: Request, res: Response, next: NextFunction) => {
	req.logOut((err) => {
		if (err) {
			return next(err);
		}
		res.send("You have logged out!");
		res.redirect(client_url);
	});
});

export default router;
