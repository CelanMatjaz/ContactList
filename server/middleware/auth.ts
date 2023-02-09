import { NextFunction, Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";

export async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer ")
    ) {
        return res.status(401).json({ errors: ["Not authorized"] });
    }

    const token = req.headers.authorization.substring(7);

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ errors: ["Not authorized"] });

        /// @ts-ignore
        req.userId = decoded.id;
        return next();
    });
}
