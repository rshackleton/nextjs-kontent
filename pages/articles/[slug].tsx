import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import Layout from '../../components/Layout';
import { ArticleModel } from '../../models/Article';
import ArticleService from '../../services/ArticleService';

interface IArticleProps {
  data: ArticleModel;
}

const ArticlePage: React.FC<IArticleProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <Layout>
      <Head>
        <title>
          {data.metadata__page_title.value} | NextJS Kontent Example
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">
        <h1 className="font-semibold text-3xl mb-6">{data.title.value}</h1>
        <div
          className="rich-content"
          dangerouslySetInnerHTML={{ __html: data.body.value }}
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
  const item = await service.getArticle(slug);

  if (!item) {
    return { props: {} };
  }

  // Hack to convert to plain object to avoid serialization error.
  const obj = {
    ...JSON.parse(JSON.stringify(item)),
    body: {
      value: item.body.resolveHtml(),
    },
  };

  return {
    props: { data: obj },
  };
};
