import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from './entities/auth.entity';
import { EncoderService } from './enconder/encoder.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepositoryService } from '../role/role-repository.service';
import { LoginAuthDto } from './dto/login.dto';
import { JwtPayload } from './interface/jwt.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  #logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private readonly roleRepository: RoleRepositoryService,
    private encoderServide: EncoderService,
  ) {}

  async create(createAuthDto: CreateAuthDto): Promise<User> {
    try {
      const { password } = createAuthDto;
      const plainTextToHash = await this.encoderServide.encodePassword(
        password,
      );

      const role = await this.roleRepository.getDefaultRole();
      const user = await this.userRepository.create({
        ...createAuthDto,
        password: plainTextToHash,
        role,
      });
      const userToSave = await this.userRepository.save(user);
      return new User(userToSave);
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException('This email is already registered');

      this.#logger.error({ error });

      throw new InternalServerErrorException('Error creating user');
    }
  }

  async login(loginAuthDto: LoginAuthDto): Promise<{ accessToken: string }> {
    const user = await this.findByEmail(loginAuthDto.email);

    const checkPassword = await this.encoderServide.checkPassword(
      loginAuthDto.password,
      user.password,
    );

    if (!checkPassword)
      throw new UnauthorizedException('Please check your credentials');

    const { id, email, role } = user;
    const payload: JwtPayload = {
      id,
      email,
      role,
    };
    try {
      const accessToken = this.jwtService.sign(payload);

      return {
        accessToken,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error trying to sign in');
    }
  }

  async findByEmail(email: string): Promise<User> {
    const user: User = await this.userRepository.findOne({
      where: { email },
      relations: {
        role: true,
      },
    });
    if (!user)
      throw new NotFoundException(`user with email: ${email} not found`);

    return user;
  }
}
