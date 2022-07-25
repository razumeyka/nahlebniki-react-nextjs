import { FC } from 'react';
import { GetServerSideProps } from 'next';
import Head from "next/head";
import { Recipe, Cuisine } from "../../types/types";

import MainHeader from '../../components/layout/MainHeader';
import RecipesHeader from '../../components/recipes/RecipesHeader';
import Wrapper from "../../components/layout/Wrapper";
import CardsGrid from "../../components/recipes/CardsGrid";
import Footer from '../../components/layout/Footer';

interface RecipesProps {
    cuisines: Cuisine[]
    recipes: {
        [key: string]: Recipe[],
    }
};

const RecipesPage: FC<RecipesProps> = ({ recipes, cuisines }) => {
    return (
        <div>
            <Head>
                <title>Recipes</title>
            </Head>
            <MainHeader />
            <RecipesHeader />
            <CardsGrid 
                recipes={recipes} 
                cuisines={cuisines}
            />
            <Footer />
        </div>
    );
};

export default RecipesPage;

export const getServerSideProps: GetServerSideProps = async () => {
    const fetchedRecipes = await fetch(`http://localhost:5000/api/recipes`);
    const recipes = await fetchedRecipes.json();

    const fetchedCuisines = await fetch(`http://localhost:5000/api/recipes/cuisines`);
    const cuisines = await fetchedCuisines.json();

    if (!recipes || !cuisines) {
        return {
            notFound: true
        }
    }
  
    return { 
        props: { recipes, cuisines } 
    }
};
