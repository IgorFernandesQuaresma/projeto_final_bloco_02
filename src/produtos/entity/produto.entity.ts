import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Categoria } from "../../categorias/entities/categoria.entity";




@Entity({name: "tb_produtos"})
export class Produto {

    @PrimaryGeneratedColumn()     
    id: number;

    @IsNotEmpty()
    @Column({length:100, nullable: false})
    nome: string;

    @IsNotEmpty()
    @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 }) 
    preco: number;

    @IsNotEmpty()
    @Column({length:1000, nullable: false})
    tamanho: string;

    @IsNotEmpty()
    @Column({length:1000, nullable: false})
    marca: string;

    @IsNotEmpty()
    @Column({length:1000, nullable: false})
    foto: string;

    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: "CASCADE"
    })
    
    categoria: Categoria
  
}