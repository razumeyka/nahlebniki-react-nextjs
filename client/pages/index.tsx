import type { NextPage } from 'next';
import Head from 'next/head';
import classes from '../styles/Home.module.scss';

import FullScreenLayout from '../components/layout/FullScreenLayout';
import MainHeader from '../components/layout/MainHeader';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Food blog</title>
      </Head>
      <MainHeader />
      <FullScreenLayout>
        <div className={classes.heading}>Food Blog</div>
      </FullScreenLayout>
    </>
  )
};

export default Home;
