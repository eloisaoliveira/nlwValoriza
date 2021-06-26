import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

import { UsersRepositories } from "../repositories/UsersRepositories"

interface IAuthenticateRequest {
    email: string 
    password: string
}

class AuthenticateUserService{

    async execute({email, password}: IAuthenticateRequest){
        const usersRepositories = getCustomRepository(UsersRepositories)

        const user = await usersRepositories.findOne({
            email
        })

        if(!user){
            throw new Error("Email/Password incorrect")
        }

        const passwordMath = await compare(password, user.password)

        if(!passwordMath){
            throw new Error("Email/Password incorrect")
        }

        const token = sign(
            {
                email: user.email
            },
            "9f1e639d3af48f16c5d56c3ffe47534e",
            {
                subject: user.id,
                expiresIn: "1d"
            }
        )

        return token
    }

}

export { AuthenticateUserService }