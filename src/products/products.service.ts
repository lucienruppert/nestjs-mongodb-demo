import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModule: Model<Product>,
  ) {}

  public async insertProduct(
    title: string,
    description: string,
    price: number,
  ): Promise<string> {
    const newProduct = new this.productModule({ title, description, price });
    const result = await newProduct.save();
    return result.id as string;
  }

  public async getAllProducts(): Promise<Array<Product>> {
    const products = await this.productModule.find().exec();
    return products.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    }));
  }

  public async getProduct(id: string): Promise<Product> {
    const product = await this.findProduct(id);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  public async deleteProduct(id: string): Promise<void> {
    const result = await this.productModule.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0)
      throw new NotFoundException('Could not find the product');
  }

  public async updateProduct(
    id: string,
    title: string,
    description: string,
    price: number,
  ): Promise<void> {
    const updatedProduct = await this.findProduct(id);
    if (title) updatedProduct.title = title;
    if (description) updatedProduct.description = description;
    if (price) updatedProduct.price = price;
    updatedProduct.save();
  }

  private async findProduct(id: string): Promise<Product> {
    let product: Product;
    try {
      product = await this.productModule.findById(id);
    } catch {
      throw new NotFoundException();
    }
    if (!product) throw new NotFoundException();
    return product;
  }
}
