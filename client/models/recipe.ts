class Recipe {
    title: string;
    author: string;
    country: string;
    description: string;
    imageUrl: string;
    ingredients: { title: string, quantity: string, unit: string }[];
    steps: { stepNumber: string, description: string, imageUrl: string }[];

    constructor( 
        recipeTitle: string, 
        recipeAuthor: string, 
        recipeCountry: string, 
        recipeDescription: string, 
        recipeImageUrl: string, 
        recipeIngredients: { title: string, quantity: string, unit: string }[], 
        recipeSteps: { stepNumber: string, description: string, imageUrl: string }[]
    ) {
        this.title = recipeTitle;
        this.author = recipeAuthor;
        this.country = recipeCountry;
        this.description = recipeDescription;
        this.imageUrl = recipeImageUrl;
        this.ingredients =  [ ...recipeIngredients ];
        this.steps = [ ...recipeSteps ];
    }
}

export default Recipe;