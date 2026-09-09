import { getAllRecipes } from "../data/recipes"
import RecipeList from "../components/RecipeList"

function RecipeListPage() {
  const recipes = getAllRecipes()

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif text-3xl text-parchment">All Recipes</h1>
        <p className="mt-2 text-mist">{recipes.length} dishes gathered from a few favourite kitchens.</p>
      </div>
      <RecipeList recipes={recipes} />
    </div>
  )
}

export default RecipeListPage
