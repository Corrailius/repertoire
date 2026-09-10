import { getCategoryLabel } from "../data/categories"
import type { Category } from "../types/recipe"

type CategoryBadgeProps = {
  category: Category
}

function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span className="inline-flex w-fit items-center rounded-full border border-regal-light/30 bg-regal/15 px-3 py-1 text-xs font-medium tracking-wide text-regal-light">
      {getCategoryLabel(category)}
    </span>
  )
}

export default CategoryBadge
