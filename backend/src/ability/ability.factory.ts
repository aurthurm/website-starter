import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Action } from './ability.actions';
import { Article } from 'src/articles/schemas/article.schema';
import { User } from 'src/users/schemas/user.schema';
import { Role } from 'src/users/users.role';
import { Status } from 'src/articles/articles.constants';

export type Subjects = InferSubjects<typeof Article | typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  defineAbilityFor(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    switch (user.role) {
      case Role.Admin:
        can(Action.Manage, 'all');
        break;

      case Role.Editor:
        can(Action.Manage, Article);
        cannot(Action.Publish, Article, {
          author: { $eq: user },
        }).because('You cannot publish your own article');
        break;

      default:
        can(Action.Read, Article);
    }

    cannot(Action.Delete, Article, {
      status: { $eq: Status.Published },
    }).because('You cannot delete a currenctly published article');

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
