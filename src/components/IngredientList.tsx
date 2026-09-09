import type { Ingredient } from "../types/ingredient"

type IngredientListProps = {
  ingredients: Ingredient[]
}

function IngredientList({ ingredients }: IngredientListProps) {
  return (
    <ul className="flex flex-col gap-2">
      {ingredients.map((ingredient) => (
        <li
          key={ingredient.name}
          className="flex items-baseline gap-3 border-b border-white/5 pb-2 text-sm last:border-none"
        >
          <span className="w-24 shrink-0 text-mist-dim">{ingredient.quantity}</span>
          <span className="text-parchment">{ingredient.name}</span>
        </li>
      ))}
    </ul>
  )
}

export default IngredientList
