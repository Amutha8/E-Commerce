import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signupdto';
import { updateUserDto } from './dto/updatauserdto';
import * as jwt from 'jsonwebtoken';

import { Role } from './enum/role.enum';
@Injectable()
export class AuthService  {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async users() {
    const user = await this.userModel.find();
    return user;
  }
  async getProfile(userid: string) {
    const user = await this.userModel.findById(userid);
    return user;
  }

  async signUp(signUpDto: SignUpDto): Promise<{ message: string }> {
    const { name, email, dept, password, role, age, phno, address, rollno } =
      signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      dept,
      age,
      phno,
      address,
      rollno,
      password: hashedPassword,
      role,
    });

    return { message: 'Registered successfully' };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      userId: user.id.toString(),
      email: user.email,
      role: user.role,
    };
    const secret = this.configService.get<string>('JWT_SECRET');
    
    if (!secret) {
      throw new Error('JWT_SECRET is missing in .env file');
    }

    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    console.log('Generated Token:', token);
    const eventPayload = {
      event: 'Login',
      userId: user.id,
      createdAt: new Date().toISOString(),
    };
    

    console.log('Kafka Event Emitted:', eventPayload);

    return {
      token: token,
      user: {
        _id: user.id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async updateById(userid: string, updateData: updateUserDto) {
    return await this.userModel.findByIdAndUpdate(userid, updateData, {
      new: true,
      runValidators: true,
    });
  }
  
  async makeAdmin(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');
    user.role = [Role.Admin];
    await user.save();
    return { message: 'User promoted to admin', user };
  }
}
