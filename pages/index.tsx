import { GetServerSideProps } from 'next';
import Head from 'next/head';

import Layout from '../components/Layout';

interface IHomeProps {}

const Home: React.FC<IHomeProps> = () => {
  return (
    <Layout>
      <Head>
        <title>NextJS Kontent Example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p>Hello World</p>
    </Layout>
  );
};

export default Home;

/**
 * Execute server-side data fetching.
 */
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
