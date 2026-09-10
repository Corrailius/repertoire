import { useParams } from "react-router-dom"
import { filterRecipesByCategory } from "../data/recipes"
import { getCategoryLabel, isCategory } from "../data/categories"
import RecipeList from "../components/RecipeList"
import EmptyState from "../components/EmptyState"

function CategoryPage() {
  const { nom } = useParams<{ nom: string }>()

  if (!nom || !isCategory(nom)) {
    return (
      <EmptyState
        title="Unknown category"
        message={`"${nom}" isn't a category in this repertoire yet.`}
        actionLabel="Browse all recipes"
        actionTo="/recettes"
      />
    )
  }

  const recipes = filterRecipesByCategory(nom)
  const label = getCategoryLabel(nom)

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif text-3xl text-parchment">{label}</h1>
        <p className="mt-2 text-mist">
          {recipes.length} recipe{recipes.length === 1 ? "" : "s"} in this category.
        </p>
      </div>
      <RecipeList
        recipes={recipes}
        emptyTitle={`No ${label.toLowerCase()} yet`}
        emptyMessage="This category is empty for now, but more recipes are on the way."
      />
    </div>
  )
}

export default CategoryPage
