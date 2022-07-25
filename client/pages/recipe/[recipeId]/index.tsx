import { FC } from 'react';
import { GetServerSideProps } from 'next';
import Head from "next/head";
import { Recipe } from "../../../types/types";

import MainHeader from '../../../components/layout/MainHeader';
import RecipeHeader from "../../../components/recipe/RecipeHeader";
import RecipeContent from "../../../components/recipe/Recipe";
import Footer from "../../../components/layout/Footer";

const RecipePage: FC<{ recipe: Recipe }> = ({ recipe }) => {
    return (
        <>
            <Head>
                <title>Recipe</title>
            </Head>
            <MainHeader />
			<RecipeHeader recipe={recipe} />
            <RecipeContent recipe={recipe} />
            <Footer />
        </>
    );
};

export default RecipePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await fetch(`http://localhost:5000/api/recipes/${context.query.recipeId}`);
    const recipe = await res.json();

    if (!recipe) {
        return {
            notFound: true
        }
    }
  
    return { 
        props: { recipe } 
    }
};

