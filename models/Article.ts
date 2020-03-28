import { ContentItem, Elements } from '@kentico/kontent-delivery';

export class ArticleModel extends ContentItem {
  public body!: Elements.RichTextElement;
  public metadata__page_title!: Elements.TextElement;
  public slug!: Elements.UrlSlugElement;
  public title!: Elements.TextElement;
}
