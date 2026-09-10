import type { Category } from "../types/recipe"

export const categories: Category[] = ["entree", "plat", "dessert", "soupe"]

export function getCategoryLabel(category: Category): string {
  switch (category) {
    case "entree":
      return "Starters"
    case "plat":
      return "Mains"
    case "dessert":
      return "Desserts"
    case "soupe":
      return "Soups"
  }
}

export function isCategory(value: string): value is Category {
  return (categories as string[]).includes(value)
}
