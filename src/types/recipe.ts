import type { Ingredient } from "./ingredient"

export type Category = "entree" | "plat" | "dessert" | "soupe"

export type Recipe = {
  id: number
  slug: string
  name: string
  origin: string
  description: string
  category: Category
  prepMinutes: number
  cookMinutes: number
  ingredients: Ingredient[]
  steps: string[]
}
