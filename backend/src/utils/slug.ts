import slugify from 'slugify';

export const getSlug = async (
  slug: string,
  replacement = '-',
): Promise<string> => {
  return slugify(slug, { replacement, lower: true });
};
