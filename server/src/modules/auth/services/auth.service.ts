import * as crypto from 'crypto';

import {IAuthService} from './auth.service.interface';
import {userService} from '../../user/factory/user.factory';
import User from '../../user/models/user.model';
import { UserService } from '../../user/services/user.service';
import { RegisterDTO } from '../dtos/register.dto';
import { LoginDTO } from '../dtos/login.dto';
import jwt from 'jsonwebtoken';


export class AuthService implements IAuthService {
  private userService: UserService;

  constructor() {
    this.userService = userService;
  }

  async register(data: RegisterDTO): Promise<User> {
 
    const user_exists = await this.userService.getUserBy({email: data.email});

    if(user_exists){
      throw new Error('User already exists');
    }

    const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
      },
    });
    
    const new_user: Partial<User> = {
      name: data.name,
      email: data.email,
      password: this.hashPassword(data.password),
      private_key: privateKey.toString(),
      public_key: publicKey.toString()
    }

    console.log(new_user);

    const user = await this.userService.createUser(new_user);

    if(!user){
      throw new Error('Error creating user');
    }

    return user;
    
  }

  async login(data: LoginDTO){
    const user = await this.userService.getUserBy({email: data.email});

    if(!user || user.password !== this.hashPassword(data.password)){
      throw new Error('Invalid user or password');
    }

    return jwt.sign({email: user.email, name: user.name, id: user.id}, user.public_key, {
      expiresIn: '1h'
    });

    
  }

  private hashPassword(password: string) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
  }


  

}
