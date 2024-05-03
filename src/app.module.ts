import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CategoriaModule } from './categoria/categoria.module';
import { Categoria } from './categoria/entities/categoria.entity';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({ 
      type: 'mysql', 
      host: 'localhost',
      port: parseInt(process.env.PORT),
      username: 'root',
      password: process.env.PASSWORD,
      database: 'db_farmacia',
      entities: [Categoria],
      synchronize: true,
    }),

    CategoriaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
