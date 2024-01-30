interface UserData  {
    userId: number,
}

export class UserDataContext {
    private static instance: UserDataContext
    private userData!: UserData

    private constructor(){}

    public static getInstance():UserDataContext{
        if(!UserDataContext.instance){
            UserDataContext.instance = new UserDataContext()
        }

        return UserDataContext.instance
    }

    public setUser(data:UserData):void{
        this.userData = data
    }

    public getUser():UserData{
        return this.userData
    }
}