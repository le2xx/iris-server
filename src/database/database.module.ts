import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RssTable } from './rss-table.entity';
import { RssTableService } from './rss-table.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'iris_user',
      password: 'iris_password',
      database: 'iris_db',
      entities: [RssTable],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([RssTable]),
  ],
  providers: [RssTableService],
})
export class DatabaseModule {}
