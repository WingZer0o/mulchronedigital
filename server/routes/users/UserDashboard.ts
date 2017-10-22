import { User } from "../../models/user";
import { Database } from '../../globals/Database';
import { BaseRouter } from "../classes/BaseRouter";
import { Router, Request, Response, NextFunction } from "express";
import { JsonWebTokenWorkers } from "../../security/JsonWebTokenWorkers";
import { JsonWebToken } from "../../../shared/interfaces/IJsonWebToken";
import { ObjectId } from "mongodb";
import { UserAuthenicationValidator } from "../../../shared/UserAuthenicationValidator";


export class UserDashboardRouter extends BaseRouter {
  public router: Router;

  constructor() {
    super();
    this.router = Router();
    this.configureRouter();
  }

  private configureRouter(): void {
    // Register user
    this.router.use("/getuserinformation", this.createStandardLocalResponseObjects);
    this.router.use("/getuserinformation", this.checkForUserJsonWebToken);
    this.router.get("/getuserinformation", this.validateUserCredentials);

    // change user password
    this.router.use("/changepassword", this.createStandardLocalResponseObjects);
    this.router.use("/changepassword", this.checkForUserJsonWebToken);
    this.router.put("/changepassword", this.validateUserChangePassword);
  }

  private async validateUserCredentials(req: Request, res: Response) {
    try {
      const db = await Database.CreateDatabaseConnection();
      const usersCollection = db.collection("Users");
      // TODO: why does this have to be to return as an array?
      // return only the username for the time being, omit the userid
      const databaseUsers: User[] = await usersCollection.find<User>(
        { "_id": new ObjectId(res.locals.token.id) },
        { "username": 1, "_id": 0 }
      ).toArray();
      if (databaseUsers.length <= 0) {
        res.status(503).json(res.locals.responseMessages.generalError());
        res.end();
      }

      // we are looking by object id there should only user in this array.
      res.status(200).json(res.locals.responseMessages.dashboardUserFound(databaseUsers[0]));
      res.end();
    } catch (error) {
      // TOOD: log error?
      res.status(503).json(res.locals.responseMessages.generalError());
      res.end();
    }
  }

  private async validateUserChangePassword(req: Request, res: Response) {
    try {
      if (!await UserAuthenicationValidator.isPasswordValid(req.body.currentPassword) || !await UserAuthenicationValidator.isPasswordValid(req.body.newPassword)) {
        res.status(422).json(res.locals.responseMessages.passwordIsNotValid());
        res.end();
        return;
      }
      const db = await Database.CreateDatabaseConnection();
      const usersCollection = db.collection("Users");
      const databaseUsers: User[] = await usersCollection.find<User>(
        { "_id": new ObjectId(res.locals.token.id) },
        { "password": 1, "_id": 1 }
      ).toArray();
      if (databaseUsers.length <= 0) {
        db.close();
        res.json(res.locals.responseMessages.noUserFound());
        res.end();
      }


      if (!await UserAuthenicationValidator.comparedStoredHashPasswordWithLoginPassword(req.body.currentPassword, databaseUsers[0].password)) {
        db.close();
        res.json(res.locals.responseMessages.passwordsDoNotMatch());
        res.end();
      }
      const user = new User(databaseUsers[0].username, databaseUsers[0].email, req.body.newPassword);
      if (!await user.updateUserPassword()) {
        db.close();
        res.json(res.locals.responseMessages.generalError());
        res.end();
      }

      const whatever = await usersCollection.updateOne(
        { "_id": new ObjectId(databaseUsers[0]._id) },
        { $set: { "password": user.password, "modifiedAt": user.modifiedAt } }
      );

      // CONSOLE.LOG(WHATEVER);
      // console.log(databaseUsers[0].password);


      console.log(req.body);
    } catch (error) {
      console.log(error);
      // TOOD: log error?
      res.status(503).json(res.locals.responseMessages.generalError());
      res.end();
    }
  }
}
