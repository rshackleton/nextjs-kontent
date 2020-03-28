import { HomePageModel } from '../models/Home';

import BaseKontentItemService from './BaseKontentItemService';

class HomePageService extends BaseKontentItemService {
  constructor(usePreviewMode: boolean) {
    super(usePreviewMode);
  }

  async getHomePage() {
    const items = await this.client.getItems<HomePageModel>('home_page');
    return items?.[0];
  }
}

export default HomePageService;
