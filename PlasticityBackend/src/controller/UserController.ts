import { NextFunction, Request, response, Response } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import bcrypt from "bcrypt";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    console.log("Session : ", request.session.id);
    return this.userRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const user = await this.userRepository.findOne({
      where: {
        id: parseInt(request.params.id),
      },
    });
    console.log("User Found : ", user);
    return user;
  }

  async Login(request: Request, response: Response) {
    const user = await this.userRepository.findOne({
      where: {
        email: request.body.email,
      },
    });

    if (!user) return "Wrong Email or Password";

    const validPassword = await bcrypt.compare(request.body.password, user?.password);

    if (validPassword) {
      request.session.user = user;
    }

    return validPassword ? true : false;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    console.log("Saving user : ", request.body);
    const newUser = new User();
    newUser.email = request.body.email;
    newUser.firstName = request.body.firstName;
    newUser.lastName = request.body.lastName;
    newUser.role = "student";
    newUser.isActive = true;

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(request.body.password, salt);
    console.log("Session : ", request.session.id);
    return this.userRepository.save(newUser);
  }

  async createuser(request: Request, response: Response, next: NextFunction) {
    await AppDataSource.manager.save(AppDataSource.manager.create(User, request.body));
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let userToRemove = await this.userRepository.findOneBy({ id: parseInt(request.params.id) });
    if (userToRemove) await this.userRepository.remove(userToRemove);
  }
}
