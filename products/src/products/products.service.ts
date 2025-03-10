import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { Product } from 'entities/product.entity';

@Injectable()
export class ProductsService {

  private products: Product[] = []


  create(createProductDto: CreateProductDto) {
    
    const {name, description, price} = createProductDto;
    const newProduct = new Product(
      uuid(),
      name,
      description,
      price
    )

    this.products.push(newProduct);
    return newProduct;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string): Product {

    const product = this.products.find(product => product.id === id);
    if( !product ) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    
    const { id:_, name, description, price } = updateProductDto; // id renombrado a _(guion bajo) para no tener conflicto con el id de la entidad

    const product = this.findOne(id);

    product.updateWith({ name, description, price });

    return product;

  }

  remove(id: string) : Product {
    const product = this.findOne(id);
    this.products = this.products.filter(product => product.id !== id);
    return product;
  }
}
