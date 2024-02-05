import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.model';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') productTitle: string,
    @Body('description') productDescription: string,
    @Body('price') productPrice: number,
  ): Promise<object> {
    const generatedId = await this.productsService.insertProduct(
      productTitle,
      productDescription,
      productPrice,
    );
    return { id: generatedId };
  }

  @Get()
  async getProducts(): Promise<Array<Product>> {
    const products = await this.productsService.getAllProducts();
    return products;
  }

  @Get(':id')
  getSpecificProduct(@Param('id') productId: string): Promise<Product> {
    return this.productsService.getProduct(productId);
  }

  @Delete(':id')
  async removeProduct(@Param('id') productId: string): Promise<void> {
    await this.productsService.deleteProduct(productId);
    return null;
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') productId: string,
    @Body('title') productTitle: string,
    @Body('description') productDescription: string,
    @Body('price') productPrice: number,
  ): Promise<void> {
    await this.productsService.updateProduct(
      productId,
      productTitle,
      productDescription,
      productPrice,
    );
    return null;
  }
}
