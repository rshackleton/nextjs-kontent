import { ArticleModel } from '../models/Article';

import BaseKontentItemService from './BaseKontentItemService';

class ArticleService extends BaseKontentItemService {
  constructor(usePreviewMode: boolean) {
    super(usePreviewMode);
  }

  async getArticle(slug: string) {
    const items = await this.client.getItems<ArticleModel>('article');
    return items.find((item) => item.slug.value === slug);
  }

  async getArticles() {
    const items = await this.client.getItems<ArticleModel>('article');
    return items;
  }
}

export default ArticleService;
