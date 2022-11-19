import { Router, NextFunction, Request, Response } from "express";
import passport from "passport";
import "../../strategies/google";
import { isAuthenticated } from "../../utilities/middlewares";

const router = Router();

router.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: "/protected",
		failureRedirect: "/auth/failure",
	})
);

router.get("/auth/failure", (req: Request, res: Response) => {
	res.send("Failed Authentication!");
});

router.get("/protected", isAuthenticated, (req: Request, res: Response) => {
	const { user }: any = req;
	res.send(`Hello ${user.displayName}`);
});

router.get("/logout", (req: Request, res: Response, next: NextFunction) => {
	req.logOut((err) => {
		if (err) {
			return next(err);
		}
	});

	res.send("You have logged out!");
	res.redirect("/");
});

export default router;
