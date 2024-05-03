import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CategoriaModule } from './categorias/categoria.module';
import { Categoria } from './categorias/entities/categoria.entity';
import { Produto } from './produtos/entity/produto.entity';
import { ProdutoModule } from './produtos/produto.module';


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
      entities: [Categoria, Produto],
      synchronize: true,
    }),

    CategoriaModule,
    ProdutoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
