import { NextApiRequest, NextApiResponse } from 'next';

import ArticleService from '../../services/ArticleService';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Validate the incoming request.
  if (req.query.secret !== process.env.PREVIEW_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  if (!req.query.slug) {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  let location: string | null;

  // Determine url based on type.
  switch (req.query.type) {
    case 'article':
      location = await resolveArticle(req.query.slug as string);
      break;

    case 'home_page':
      location = await resolveHomePage(req.query.slug as string);
      break;

    default:
      return res.status(401).json({ message: 'Invalid type' });
  }

  // Ensure we've found a valid page to redirect to.
  if (!location) {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  // Enable Preview Mode.
  res.setPreviewData({});

  // Redirect to the page.
  res.writeHead(307, { Location: location });
  res.end();
};

/**
 * Retrieve the article in preview mode.
 * @param slug
 */
async function resolveArticle(slug: string): Promise<string | null> {
  const service = new ArticleService(true);
  const article = await service.getArticle(slug);

  if (!article) {
    return null;
  }

  return `/articles/${article?.slug.value ?? ''}`;
}

/**
 * Ensure path is the root.
 * @param slug
 */
async function resolveHomePage(slug: string): Promise<string | null> {
  if (slug !== '/') {
    return null;
  }

  return '/';
}
