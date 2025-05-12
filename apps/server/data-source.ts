import 'dotenv/config';
import { DataSource } from 'typeorm';

import { Movie } from './src/movies/movies.entity';
import { User } from './src/users/users.entity';

const isTs = __filename.endsWith('.ts')


export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Movie, User],
  migrations: [__dirname + '/src/migrations/*.js'],
});
