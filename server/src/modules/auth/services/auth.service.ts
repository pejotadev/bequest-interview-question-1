
import {IAuthService} from './auth.service.interface';
import {UserService} from '../../user/services/user.service';

import { RegisterDTO } from '../dtos/register.dto';
import { generateKeyPairSync, createHash } from "crypto";
import User from '../../user/models/user.model';

export class AuthService implements IAuthService {
  constructor(private readonly userService: UserService ) {}

  async register(data: RegisterDTO): Promise<User> {

    const user_exists = await this.userService.getUserBy({email: data.email});

    if(user_exists){
      throw new Error('User already exists');
    }

    const { privateKey, publicKey } = generateKeyPairSync("ec", {
      namedCurve: "sect239k1",
    });

    const new_user: Partial<User> = {
      name: data.name,
      email: data.email,
      password: this.hashPassword(data.password),
      private_key: privateKey
        .export({ type: "sec1", format: "pem" })
        .toString("utf8"),
      public_key: publicKey
        .export({ type: "spki", format: "pem" })
        .toString("utf8"),
    }

    const user = await this.userService.createUser(new_user);

    if(!user){
      throw new Error('Error creating user');
    }

    return user;
    
  }

  private hashPassword(password: string) {
    const hash = createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
  }


  

}
