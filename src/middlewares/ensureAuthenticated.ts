import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
    sub: string
}

export function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authToken = req.headers.authorization

    if(!authToken){
        return res.status(401).end()
    }

    const [, token] = authToken.split(" ")

    try {
        const { sub } = verify(
            token,
            "9f1e639d3af48f16c5d56c3ffe47534e"
        ) as IPayload

        req.user_id = sub

        return next()
    } catch(err) {
        return res.status(401).end()
    }
}