import KontentService from './KontentService';

class BaseKontentItemService {
  protected client: KontentService;

  constructor(usePreviewMode: boolean) {
    this.client = new KontentService(usePreviewMode);
  }
}

export default BaseKontentItemService;
