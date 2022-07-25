import { FC } from 'react';
import { GetServerSideProps } from 'next';
import Head from "next/head";
import { Category, Cuisine } from '../../types/types';

import Wrapper from "../../components/layout/Wrapper";
import RecipeForm from "../../components/admin/RecipeForm";


const Dashboard: FC<{ cuisines: Cuisine[], categories: Category[] }> = ({ cuisines, categories }) => {

    return (
        <div>
            <Head>
                <title>Admin dashboard</title>
            </Head>
            <Wrapper>
                <RecipeForm cuisines={cuisines} categories={categories} />
            </Wrapper>
        </div>
    );
}

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async () => {
    const fetchedCuisines = await fetch(`http://localhost:5000/api/recipes/cuisines`);
    const cuisines = await fetchedCuisines.json();

    const fetchedCategories = await fetch(`http://localhost:5000/api/recipes/categories`);
    const categories = await fetchedCategories.json();

    if (!cuisines || !categories) {
        return {
            notFound: true
        }
    }
  
    return { 
        props: { cuisines, categories } 
    }
};