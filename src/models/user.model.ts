import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

@Table({
  tableName: "users",
  timestamps: true,
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: "image_url",
  })
  imageUrl?: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    field: "email_verified",
  })
  emailVerified!: boolean;

  @Column({
    type: DataType.JSONB,
    defaultValue: {},
  })
  preferences!: object;

  @Column({
    type: DataType.STRING,
    defaultValue: "active",
    field: "account_status",
  })
  accountStatus!: string;

  @Column({
    type: DataType.DATE,
    field: "last_login",
  })
  lastLogin?: Date;

  @CreatedAt
  @Column({ field: "created_at" })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: "updated_at" })
  updatedAt!: Date;
}

export default User; 

