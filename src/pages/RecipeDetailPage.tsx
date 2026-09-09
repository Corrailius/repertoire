import { useParams, Link } from "react-router-dom"
import { findRecipeBySlug } from "../data/recipes"
import CategoryBadge from "../components/CategoryBadge"
import RecipeMeta from "../components/RecipeMeta"
import IngredientList from "../components/IngredientList"
import StepList from "../components/StepList"
import EmptyState from "../components/EmptyState"

function RecipeDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const recipe = slug ? findRecipeBySlug(slug) : undefined

  if (!recipe) {
    return (
      <EmptyState
        title="Recipe not found"
        message="This recipe isn't in the repertoire, it may have been moved or never existed."
        actionLabel="Browse all recipes"
        actionTo="/recettes"
      />
    )
  }

  return (
    <div className="flex flex-col gap-10">
      <Link to="/recettes" className="w-fit text-sm text-mist hover:text-parchment">
        ← Back to recipes
      </Link>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-serif text-3xl text-parchment">{recipe.name}</h1>
          <CategoryBadge category={recipe.category} />
        </div>
        <p className="text-sm text-mist-dim">{recipe.origin}</p>
        <p className="max-w-2xl text-mist">{recipe.description}</p>
        <RecipeMeta prepMinutes={recipe.prepMinutes} cookMinutes={recipe.cookMinutes} />
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <section>
          <h2 className="mb-4 font-serif text-xl text-parchment">Ingredients</h2>
          <IngredientList ingredients={recipe.ingredients} />
        </section>
        <section>
          <h2 className="mb-4 font-serif text-xl text-parchment">Steps</h2>
          <StepList steps={recipe.steps} />
        </section>
      </div>
    </div>
  )
}

export default RecipeDetailPage
