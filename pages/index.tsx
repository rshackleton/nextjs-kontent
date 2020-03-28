import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import Layout from '../components/Layout';
import { HomePageModel } from '../models/Home';
import HomePageService from '../services/HomePageService';
import ArticleService from '../services/ArticleService';
import { ArticleModel } from '../models/Article';

interface IHomeProps {
  articles: ArticleModel[];
  homePage: HomePageModel;
}

const HomePage: React.FC<IHomeProps> = ({ articles, homePage }) => {
  return (
    <Layout>
      <Head>
        <title>
          {homePage.metadata__page_title.value} | NextJS Kontent Example
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">
        <h1 className="font-semibold text-3xl mb-6">This is the home page!</h1>
        <ul className="list-disc ml-8">
          {articles.map((article) => (
            <li key={article.system.codename} className="mb-2">
              <Link
                href="/articles/[slug]"
                as={`/articles/${article.slug.value}`}
              >
                <a>{article.title.value}</a>
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

  const props = {
    articles,
    homePage,
  };

  // Hack to convert to plain object to avoid serialization error.
  return {
    props: JSON.parse(JSON.stringify(props)),
  };
};
