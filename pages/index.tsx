import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import Layout from '../components/Layout';
import HomePageService from '../services/HomePageService';
import ArticleService from '../services/ArticleService';

interface IHomeProps {
  articles: IArticleViewModel[];
  homePage: IHomePageViewModel;
}

interface IArticleViewModel {
  id: string;
  codename: string;
  slug: string;
  title: string;
}

interface IHomePageViewModel {
  id: string;
  codename: string;
  metadata: {
    title: string;
  };
}

const HomePage: React.FC<IHomeProps> = ({ articles, homePage }) => {
  return (
    <Layout>
      <Head>
        <title>{homePage.metadata.title} | NextJS Kontent Example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">
        <h1 className="font-semibold text-3xl mb-6">This is the home page!</h1>
        <ul className="list-disc ml-8">
          {articles.map((article) => (
            <li key={article.codename} className="mb-2">
              <Link href="/articles/[slug]" as={`/articles/${article.slug}`}>
                <a>{article.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default HomePage;

/**
 * Execute server-side data fetching.
 */
export const getStaticProps: GetStaticProps = async ({ preview }) => {
  console.log(`Loading home page content, preview mode is ${!!preview}`);

  const articleService = new ArticleService(preview ?? false);
  const articles = await articleService.getArticles();

  const service = new HomePageService(preview ?? false);
  const homePage = await service.getHomePage();

  const props: IHomeProps = {
    articles: articles.map((article) => ({
      id: article.system.id,
      codename: article.system.codename,
      slug: article.slug.value,
      title: article.title.value,
    })),
    homePage: {
      id: homePage.system.id,
      codename: homePage.system.codename,
      metadata: {
        title: homePage.metadata__page_title.value,
      },
    },
  };

  return { props };
};
