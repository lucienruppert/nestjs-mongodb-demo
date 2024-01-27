import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Array<Product> = [];

  public insertProduct(
    title: string,
    description: string,
    price: number,
  ): string {
    const id = new Date().getTime().toString();
    const newProduct = new Product(id, title, description, price);
    this.products.push(newProduct);
    return id;
  }

  public getAllProducts(): Array<object> {
    return [...this.products];
  }

  public getProduct(id: string): object {
    return this.findProduct(id)[0];
  }

  public deleteProduct(id: string): void {
    const productIndex = this.findProduct(id)[1];
    this.products.splice(productIndex, 1);
  }

  public updateProduct(
    id: string,
    title: string,
    description: string,
    price: number,
  ): void {
    const [product, index] = this.findProduct(id);
    const updateProduct = { ...product };
    if (title) updateProduct.title = title;
    if (description) updateProduct.description = description;
    if (price) updateProduct.price = price;
    this.products[index] = updateProduct;
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    const product = this.products[productIndex];
    if (!product) throw new NotFoundException();
    return [product, productIndex];
  }
}
