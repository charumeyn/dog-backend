import { Dog } from 'src/dogs/entities/dog.entity';
import {DataSource, DataSourceOptions} from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '8989',
  database: 'postgres_db',
  entities: [Dog],
  migrations: ['dist/db/migrations/*.js'],
}


const dataSource = new DataSource(dataSourceOptions);
export default dataSource;