import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import Layout from '../../components/Layout';
import ArticleService from '../../services/ArticleService';

interface IArticleProps {
  article: IArticleViewModel;
}

interface IArticleViewModel {
  id: string;
  codename: string;
  body: string;
  slug: string;
  title: string;
  metadata: {
    title: string;
  };
}

const ArticlePage: React.FC<IArticleProps> = ({ article }) => {
  if (!article) {
    return null;
  }

  return (
    <Layout>
      <Head>
        <title>{article.metadata.title} | NextJS Kontent Example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">
        <h1 className="font-semibold text-3xl mb-2">{article.title}</h1>
        <p className="mb-8 underline">
          <Link href="/">
            <a>Back to home</a>
          </Link>
        </p>
        <div
          className="rich-content"
          dangerouslySetInnerHTML={{ __html: article.body }}
        ></div>
      </div>
    </Layout>
  );
};

export default ArticlePage;

export const getStaticPaths: GetStaticPaths = async () => {
  const service = new ArticleService(false);
  const items = await service.getArticles();

  return {
    fallback: true,
    paths: items.map((item) => `/articles/${item.slug.value}`),
  };
};

/**
 * Execute server-side data fetching.
 */
export const getStaticProps: GetStaticProps = async ({ params, preview }) => {
  console.log(`Loading article content, preview mode is ${!!preview}`);

  const slug = params?.slug as string;
  const service = new ArticleService(preview ?? false);
  const article = await service.getArticle(slug);

  if (!article) {
    return { props: {} };
  }

  const props: IArticleProps = {
    article: {
      id: article.system.id,
      codename: article.system.codename,
      body: article.body.resolveHtml(),
      slug: article.slug.value,
      title: article.title.value,
      metadata: {
        title: article.metadata__page_title.value,
      },
    },
  };

  return { props };
};
