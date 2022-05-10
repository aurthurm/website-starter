import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Param,
  Delete,
  Request,
  NotFoundException,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Request as ERequest } from 'express';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Action } from 'src/ability/ability.actions';
import {
  CheckAbilities,
  PublishArticleAbility,
} from 'src/ability/ability.decorator';
import { ArticlesService } from './articles.service';
import { ArticleDto, ArticleFilter } from './dto/article.dto';
import { Article } from './schemas/article.schema';
import { Pagination } from 'src/utils/paginate';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageResizer, multerOptions } from 'src/utils/upload';

@ApiBearerAuth()
@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Article was successfully created',
    type: Article,
  })
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async saveArticle(
    @Body() createArticleDto: ArticleDto,
    @Req() req: ERequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await imageResizer(file);
    return await this.articlesService.saveArticle(
      createArticleDto,
      req.user,
      file,
    );
  }

  @Post('publish/:id')
  @ApiResponse({
    status: 200,
    description: 'Article was successfully published',
    type: Article,
  })
  async publishArticle(
    @Param('id') id: string,
    @Req() req: ERequest,
  ): Promise<Article> {
    return await this.articlesService.publishArticle(id, req.user);
  }

  @Get('/paginated')
  async paginated(
    @Query() filters: ArticleFilter,
    @Request() request,
  ): Promise<Pagination<Article>> {
    return await this.articlesService.paginate(filters, {
      limit: request.query.hasOwnProperty('limit') ? request.query.limit : 10,
      page: request.query.hasOwnProperty('page') ? request.query.page : 0,
    });
  }

  @Get('/slug/:slug')
  @ApiResponse({
    status: 200,
    description: 'Articles has been successfully fetched',
    type: Article,
  })
  @ApiResponse({
    status: 404,
    description: 'An article with given slug does not exist.',
  })
  async show(@Param('slug') slug: string): Promise<Article> {
    const blog = await this.articlesService.findBySlug(slug);

    if (!blog) {
      throw new NotFoundException();
    }
    return blog;
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Articles have been successfully fetched',
    type: Article,
  })
  findAll() {
    return this.articlesService.findAll();
  }

  @Get('filter')
  @ApiResponse({
    status: 200,
    description: 'Articles have been successfully fetched',
    type: Article,
  })
  filterArticles(@Query() filters: ArticleFilter) {
    return this.articlesService.filterArticles(filters);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a article that exists in the database',
    type: String,
  })
  @ApiResponse({
    status: 404,
    description: 'An article with given id does not exist.',
  })
  @ApiResponse({
    status: 200,
    description: 'An article has been successfully fetched',
    type: Article,
  })
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @Get('publish/:id')
  @CheckAbilities(new PublishArticleAbility())
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a article that exists in the database',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'An article has been successfully published',
    type: Article,
  })
  @ApiResponse({
    status: 404,
    description: 'A Article with given id does not exist.',
  })
  pubish(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a article that exists in the database',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'An article has been successfully deleted',
    type: Article,
  })
  @ApiResponse({
    status: 404,
    description: 'An article with given id does not exist.',
  })
  @CheckAbilities({ action: Action.Delete, subject: Article })
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }

  @Delete('featured-image/:id')
  async deleteFeatureImage(@Param('id') id: string, @Request() req) {
    return await this.articlesService.deleteFeatureImage(
      id,
      req.query.filepath,
    );
  }
}
