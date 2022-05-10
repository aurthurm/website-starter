import { SetMetadata } from '@nestjs/common';
import { Article } from 'src/articles/schemas/article.schema';
import { Action } from './ability.actions';
import { Subjects } from './ability.factory';

export interface RequiredRule {
  action: Action;
  subject: Subjects;
}

export const CHECK_ABILITY = 'check_ability';

export const CheckAbilities = (...requirements: RequiredRule[]) =>
  SetMetadata(CHECK_ABILITY, requirements);

export class PublishArticleAbility implements RequiredRule {
  action = Action.Publish;
  subject = Article;
}
