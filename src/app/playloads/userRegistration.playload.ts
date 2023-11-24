export class UserRegistration {
    firstName: string
    lastName: string
    email: string
    password: string
    pseudo: string
    acceptTerm: boolean

}


export class UserLogin {
    email: string
    password: string
    rememberMe?: boolean
}