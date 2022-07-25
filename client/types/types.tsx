export interface RecipeIngredient {
    _id: string, 
    title: string, 
    quantity: number, 
    unit: string,
    group: string
};

export interface RecipeStep {
    _id: string;
    stepNumber: string;
    description: string;
    imageUrl: string;
}

export interface Recipe {
    _id: string;
    title: string;
    author: string;
    authorCountry: string;
    originCountry: string;
    description: string;
    imageUrl: string;
    backstageImagesUrl: string[],
    categories: string[],
    serving: number,
    ingredients: RecipeIngredient[];
    isIngredientsGrouped: boolean,
    steps: RecipeStep[];
}

export interface Cuisine {
    _id: string,
    name: string,
    iconUrl: string
}

export interface Category {
    _id: string,
    name: string,
    iconUrl: string
}