import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signupdto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { updateUserDto } from './dto/updatauserdto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Get('getUser')
  @ApiOperation({ summary: 'Get all Users' })
  async getusers() {
    return this.authService.users();
  }

  @Post('/sign-up')
  @ApiOperation({ summary: 'Create a new User entry' })
  @ApiResponse({ status: 201, description: 'User Added successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  signUp(@Body() signUpDto: SignUpDto): Promise<{ message: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({ status: 201, description: 'Login successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user based on ID' })
  async updatecourse(
    @Param('id') userid: string,
    @Body() updateData: updateUserDto,
  ) {
    return this.authService.updateById(userid, updateData);
  }

  @Get('/getProfile/:id')
  @ApiOperation({ summary: 'Get user based on ID' })
  async getProfile(@Param('id') userid: string) {
    return this.authService.getProfile(userid);
  }

   @Patch(':id/make-admin')
  async makeAdmin(@Param('id') id: string) {
    return this.authService.makeAdmin(id);
  }
}
