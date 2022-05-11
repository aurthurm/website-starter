import { Model } from 'mongoose';
import { Pagination, PaginationOptionsInterface } from 'src/utils/paginate';
import { getSlug } from 'src/utils/slug';

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ArticleDto, ArticleFilter } from './dto/article.dto';
import { Article, ArticleDocument } from './schemas/article.schema';
import { Status } from './articles.constants';
import { deleteFile, duplicateFileCleaner } from 'src/utils/upload';

@Injectable()
export class ArticlesService {
  private readonly logger = new Logger(ArticlesService.name);

  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  async saveArticle(
    article: ArticleDto,
    author: unknown,
    file: Express.Multer.File,
  ): Promise<Article> {
    if (['', null, undefined].includes(article._id)) {
      delete article['_id'];
      return await this.createArticle(article, author, file);
    } else {
      return await this.updateArticle(article['_id'], article, file);
    }
  }

  async createArticle(
    article: ArticleDto,
    author: unknown,
    file: Express.Multer.File,
  ): Promise<Article> {
    const createdArticle = new this.articleModel({
      ...article,
      author,
      status: Status.Draft,
      featuredImage: file?.path,
    });
    createdArticle.slug = await getSlug(createdArticle.title);
    await createdArticle.populate(['publisher', 'author']);
    return createdArticle.save();
  }

  async updateArticle(
    id: string,
    updateData: ArticleDto,
    file: Express.Multer.File,
  ) {
    const slug = await getSlug(updateData.title);
    const article = await this.articleModel
      .findByIdAndUpdate(id, { ...updateData, slug })
      .setOptions({ overwrite: true, new: true });
    if (!article) {
      throw new NotFoundException();
    }
    if (file) {
      const filePath = await duplicateFileCleaner(
        file.path,
        article.featuredImage,
      );
      article.featuredImage = filePath;
    }
    return await article.save();
  }

  async deleteFeatureImage(id: string, filePath: string): Promise<Article> {
    const article = await this.articleModel.findById(id);
    article.featuredImage = undefined;
    if (!article) {
      throw new NotFoundException();
    }
    try {
      await deleteFile(filePath);
    } catch (err) {
      console.error(err);
    }
    return article.save();
  }

  // partial update
  // db.collection.update(  { _id:...} , { $set: someObjectWithNewData }

  async publishArticle(id: string, user: unknown): Promise<Article> {
    const article = await this.articleModel.findOne({ _id: id });
    article.status = Status.Published;
    return await article.save();
  }

  async findAll(): Promise<Article[]> {
    return await this.articleModel.find().populate(['publisher', 'author']);
  }

  async filterArticles(filters: ArticleFilter): Promise<Article[]> {
    const params = {};
    if (filters.title) {
      params['title'] = { $regex: new RegExp(filters.title, 'i') };
    }
    if (filters.status) {
      params['status'] = filters.status;
    }
    if (filters.category) {
      params['category'] = filters.category;
    }
    if (filters.department) {
      params['department'] = filters.department;
    }
    return await this.articleModel
      .find(params)
      .populate(['publisher', 'author']);
  }

  async paginate(
    filters: ArticleFilter,
    options: PaginationOptionsInterface,
  ): Promise<Pagination<Article>> {
    const params = {};
    if (filters.title) {
      params['title'] = { $regex: new RegExp(filters.title, 'i') };
    }
    if (filters.status) {
      params['status'] = filters.status;
    }
    if (filters.category) {
      params['category'] = filters.category;
    }
    if (filters.department) {
      params['department'] = filters.department;
    }

    const page = +options.page + 1;
    const results = await this.articleModel
      .find(params)
      .limit(options.limit)
      .skip(options.limit * (page - 1))
      .populate(['publisher', 'author']);

    const count = await this.articleModel.countDocuments(params);
    return new Pagination<Article>({
      results,
      total: count,
      total_pages: Math.ceil(count / results.length),
      currentPage: page,
    });
  }

  async findOne(id: string): Promise<Article | null> {
    return this.articleModel
      .findOne({ _id: id })
      .populate(['publisher', 'author']);
  }

  async findBySlug(slug: string): Promise<Article | null> {
    return await this.articleModel
      .findOne({ slug })
      .populate(['publisher', 'author']);
  }

  async remove(id: string): Promise<Article> {
    return await this.articleModel.findByIdAndRemove({ _id: id }).exec();
  }

  async uniqueSlug(article: Article): Promise<Article> {
    article.slug = await getSlug(article.title);
    const exists = await this.findSlugs(article.slug);

    // if slug doesn't already exists
    if (!exists || exists.length === 0) {
      return article;
    }

    // Omit if same entity
    if (exists.length === 1 && article._id === exists[0]._id) {
      return article;
    }

    // Add to suffix
    article.slug = article.slug + '-' + exists.length;

    return article;
  }

  private async findSlugs(slug: string): Promise<Article[]> {
    const slugRegex = new RegExp(slug, 'i');
    return await this.articleModel.find({ slug: slugRegex });
  }
}
