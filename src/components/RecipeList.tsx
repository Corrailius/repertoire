import type { Recipe } from "../types/recipe"
import RecipeCard from "./RecipeCard"
import EmptyState from "./EmptyState"

type RecipeListProps = {
  recipes: Recipe[]
  emptyTitle?: string
  emptyMessage?: string
}

function RecipeList({ recipes, emptyTitle, emptyMessage }: RecipeListProps) {
  if (recipes.length === 0) {
    return (
      <EmptyState
        title={emptyTitle ?? "No recipes here"}
        message={emptyMessage ?? "Nothing to show yet, check back later."}
        actionLabel="Browse all recipes"
        actionTo="/recettes"
      />
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}

export default RecipeList
