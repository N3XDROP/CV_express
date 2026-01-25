import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from "typeorm";
import { IsEmail, Length } from "class-validator";
import * as bcrypt from "bcrypt";

// Roles de usuario
export enum UserRole {
  user = "0",
  admin = "1"
}

export const AVAILABLE_ROLES = Object.values(UserRole);

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index({ unique: true })
  @Column({ length: 150 })
  @IsEmail()
  email!: string;

  @Column({ length: 150 })
  name!: string;

  @Column({ length: 150 })
  lastName!: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.user,
  })
  role!: UserRole;

  @Column({ length: 150 })
  @Length(8, 150)
  password!: string;

  @Column("varchar", { nullable: true, length: 255 })
  resetToken!: string | null;

  @Column("varchar", { nullable: true, length: 255 })
  refreshToken!: string | null;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt?: Date | null;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) return;

    if (this.password.startsWith("$2b$") || this.password.startsWith("$2a$")) {
      return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
