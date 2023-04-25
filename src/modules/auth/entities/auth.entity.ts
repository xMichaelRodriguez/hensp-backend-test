import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from 'src/modules/role/entities/role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({
    example: '1',
    description: 'id of user',
  })
  @PrimaryGeneratedColumn('increment')
  @Expose()
  id: number;

  @ApiProperty({
    example: 'JohnDoe',
    description: 'username',
  })
  @Column({
    nullable: false,
  })
  username: string;

  @ApiProperty({
    example: 'johndoe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @Column({
    nullable: false,
    unique: true,
    type: 'text',
  })
  email: string;

  @ApiProperty({
    example: 'password-example',
  })
  @Exclude()
  @Column({ type: 'text', nullable: true })
  password?: string;

  @ApiProperty({ example: 'admin' })
  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn({
    name: 'role_id',
  })
  role: Role;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
