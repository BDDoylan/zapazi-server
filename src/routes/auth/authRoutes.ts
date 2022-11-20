import { Router, NextFunction, Request, Response } from "express";
import passport from "passport";
import "../../strategies/google";
import { isLoggedIn } from "../../utilities/middlewares";

const router = Router();

router.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: "/auth/protected",
		failureRedirect: "/auth/failure",
	})
);

router.get("/failure", (req: Request, res: Response) => {
	res.send("Failed Authentication!");
});

router.get("/status", (req: Request, res: Response) => {
	return req.isAuthenticated() ? res.send(true) : res.send(false);
});

router.get("/protected", isLoggedIn, (req: Request, res: Response) => {
	const { user }: any = req;
	res.send(`Hello ${user.displayName}`);
});

router.get("/logout", isLoggedIn, (req: Request, res: Response, next: NextFunction) => {
	req.logOut((err) => {
		if (err) {
			return next(err);
		}
		res.send("You have logged out!");
		res.redirect("/");
	});
});

export default router;
