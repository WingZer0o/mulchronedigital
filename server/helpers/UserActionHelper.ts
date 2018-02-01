import { UserAction, UserChangedPasswordAction, UserChangedUsernameAction, UserForgotPasswordAction, UserLoggedInAction } from "../models/UserAction";
import { UserActionsCollection } from "../cluster/master";
import { ObjectId } from "mongodb";

export class UserActionHelper {
    private userLoggedInActionType: string = "user_logged_in";
    private userChangedPasswordActionType: string = "user_changed_password";
    private userChangedUsernameAction: string = "user_changed_username";
    private userForgotPasswordAction: string = "user_forgot_password";

    constructor() {

    }

    public async userLoggedIn(userId: ObjectId, ip: string): Promise<any> {
        try {
            const userAction = new UserLoggedInAction(userId, ip, this.userLoggedInActionType);
            await this.insertUserAction(userAction);
        } catch (error) {
            // TODO: log error
            console.log(error);
        }
    }

    public async userChangedPassword(userId: ObjectId, ip: string, oldPassword: string) {
        try {
            const userAction = new UserChangedPasswordAction(userId, ip, this.userChangedPasswordActionType, oldPassword);
            await this.insertUserAction(userAction);
        } catch (error) {
            // TODO: log error
            console.log(error);
        }
    }

    public async userChangedUsername(userId: ObjectId, ip: string, oldUsername: string) {
        try {
            const userAction = new UserChangedUsernameAction(userId, ip, this.userChangedUsernameAction, oldUsername);
            await this.insertUserAction(userAction);
        } catch (error) {
            // TODO: log error
            console.log(error);
        }
    }

    public async userForgotPassword(userId: ObjectId, ip: string, forgotPasswordTokenId: ObjectId): Promise<any> {
        try {
            const userAction = new UserForgotPasswordAction(userId, ip, this.userForgotPasswordAction, forgotPasswordTokenId);
            await this.insertUserAction(userAction);
        } catch (error) {
            // TODO: log error
            console.log(error);
        }
    }

    private async insertUserAction(action: UserAction): Promise<any> {
        try {
            await UserActionsCollection.insertOne(action);
        } catch (error) {
            // TODO: log error
            console.log(error);
        }
    }
}