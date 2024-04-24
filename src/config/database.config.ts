import { DataSourceOptions } from 'typeorm';

export const config: DataSourceOptions = {
  type: 'sqlite',
  database: './database/database.db',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};