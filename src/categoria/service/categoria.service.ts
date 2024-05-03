import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";

@Injectable()
export class CategoriaService {
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
    ) { }

    async findAll(): Promise<Categoria[]> {
        return await this.categoriaRepository.find({
           
        });   
    }

    async findById(id: number): Promise<Categoria> {

        let categoria = await this.categoriaRepository.findOne({
            where: {
                id
            },
            
        });

        if (!categoria)
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);

        return categoria;
    }

    async findByCategoria(categoria: string): Promise<Categoria[]> {
        return await this.categoriaRepository.find({
            where:{
                categoria: ILike(`%${categoria}%`)
            },
            
        })
    }

    async create(categoria: Categoria): Promise<Categoria> {

        let buscaCategoria = await this.categoriaRepository.findOne({
            where: { categoria: categoria.categoria },
          });

        if (buscaCategoria)
        throw new HttpException('Categoria ja existe', HttpStatus.CONFLICT);


        return await this.categoriaRepository.save(categoria);
    }

    async update(categoria: Categoria): Promise<Categoria> {
        
        let buscaCategoria = await this.findById(categoria.id);

        if (!buscaCategoria || !categoria.id)
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);
        
        return await this.categoriaRepository.save(categoria);
    }

    async delete(id: number): Promise<DeleteResult> {
        
        let buscaCategoria = await this.findById(id);

        if (!buscaCategoria)
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);

        return await this.categoriaRepository.delete(id);

    }

    
} 