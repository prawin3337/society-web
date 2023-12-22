export interface IUser {
    flatNumber: string,
    name: string,
    mobileNumber: number,
    emailId?: string
}

export interface ILogin {
    userId: string,
    password: string
}