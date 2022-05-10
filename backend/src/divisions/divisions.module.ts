import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DivisionsController } from './divisions.controller';
import { DivisionsService } from './divisions.service';
import { Category, CategorySchema } from './schemas/category.schema';
import { Tag, TagSchema } from './schemas/tag.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tag.name, schema: TagSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [DivisionsController],
  providers: [DivisionsService],
  exports: [DivisionsService],
})
export class DivisionsModule {}
