import { NextFunction, Request, response, Response } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import bcrypt from "bcrypt";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    if (!request.session || !request.session.user) {
      return 401;
    }
    return await this.userRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const user = await this.userRepository.findOne({
      where: {
        id: parseInt(request.params.id),
      },
    });
    return user;
  }

  async Login(request: Request, response: Response) {
    const user = await this.userRepository.findOne({
      where: {
        email: request.body.params.email,
      },
    });

    if (!user) return 409;

    const validPassword = await bcrypt.compare(request.body.params.password, user?.password);

    if (validPassword) {
      request.session.user = user;
    }

    return validPassword ? createResponseUser(user) : false;
  }

  async Logout(request: Request, response: Response) {
    return request.session.destroy((err) => {
      return 401;
    });
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const newUser = new User();
    newUser.email = request.body.params.email;
    newUser.firstName = request.body.params.firstName;
    newUser.lastName = request.body.params.lastName;
    newUser.role = request.body.params.role;
    newUser.isActive = true;

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(request.body.params.password, salt);

    let userCreated = true;
    let errorMessage;

    try {
      await this.userRepository.save(newUser);
    } catch (error) {
      console.log("ERROR While creating user : ", error);
      userCreated = false;
      errorMessage = error;
      if (error.code == "23505" || error.code == 23505) {
        userCreated = false;
        return 409;
      }
    }

    if (userCreated) {
      request.session.user = newUser;
    }

    return createResponseUser(newUser);
  }

  async createuser(request: Request, response: Response, next: NextFunction) {
    await AppDataSource.manager.save(AppDataSource.manager.create(User, request.body));
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let userToRemove = await this.userRepository.findOneBy({ id: parseInt(request.params.id) });
    if (userToRemove) await this.userRepository.remove(userToRemove);
  }

  async me(request: Request) {
    if (!request.session?.user) return false;
    return createResponseUser(request.session.user);
  }
}

const createResponseUser = (completeUser: User) => {
  return (({ firstName, lastName, email, role, isActive, id }) => ({
    firstName,
    lastName,
    email,
    role,
    isActive,
    id,
  }))(completeUser);
};
