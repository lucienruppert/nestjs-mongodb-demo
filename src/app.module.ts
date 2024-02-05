import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { MongooseModule } from '@nestjs/mongoose';

const uri =
  'mongodb+srv://luciendelmar:w77us2H1fyguW1gJ@cluster0.c0bviof.mongodb.net/?retryWrites=true&w=majority';

@Module({
  imports: [ProductModule, MongooseModule.forRoot(uri)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
