import { NextFunction, Request, Response } from "express";

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
	req.isAuthenticated() ? next() : res.sendStatus(401);
};
