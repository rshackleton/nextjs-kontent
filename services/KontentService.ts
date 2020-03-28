import {
  DeliveryClient,
  TypeResolver,
  ContentItem,
} from '@kentico/kontent-delivery';

import { ArticleModel } from '../models/Article';
import { HomePageModel } from '../models/Home';

class KontentService {
  private client: DeliveryClient;

  constructor(usePreviewMode: boolean) {
    this.client = new DeliveryClient({
      globalQueryConfig: {
        usePreviewMode,
        useSecuredMode: false,
      },
      projectId: process.env.KC_PROJECT_ID ?? '',
      previewApiKey: process.env.KC_PREVIEW_KEY ?? '',
      typeResolvers: [
        new TypeResolver('article', () => new ArticleModel()),
        new TypeResolver('home_page', () => new HomePageModel()),
      ],
    });
  }

  async getItem<T extends ContentItem>(codename: string): Promise<T> {
    const response = await this.client.item<T>(codename).toPromise();
    return response.item;
  }

  async getItems<T extends ContentItem>(type: string): Promise<T[]> {
    const response = await this.client.items<T>().type(type).toPromise();
    return response.items;
  }
}

export default KontentService;
