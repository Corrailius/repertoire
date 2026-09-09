import { Link } from "react-router-dom"
import type { Recipe } from "../types/recipe"
import CategoryBadge from "./CategoryBadge"
import RecipeMeta from "./RecipeMeta"

type RecipeCardProps = {
  recipe: Recipe
}

function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link
      to={`/recette/${recipe.slug}`}
      className="group flex flex-col gap-3 rounded-xl border border-white/10 bg-aubergine p-5 hover:border-regal/40 hover:bg-aubergine-light"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-lg leading-snug text-parchment group-hover:text-white">
            {recipe.name}
          </h3>
          <p className="text-xs text-mist-dim">{recipe.origin}</p>
        </div>
        <CategoryBadge category={recipe.category} />
      </div>
      <p className="line-clamp-2 text-sm text-mist">{recipe.description}</p>
      <RecipeMeta prepMinutes={recipe.prepMinutes} cookMinutes={recipe.cookMinutes} />
    </Link>
  )
}

export default RecipeCard
