import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import RecipeListPage from "./pages/RecipeListPage"
import RecipeDetailPage from "./pages/RecipeDetailPage"
import CategoryPage from "./pages/CategoryPage"
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<RecipeListPage />} />
          <Route path="recettes" element={<RecipeListPage />} />
          <Route path="recette/:slug" element={<RecipeDetailPage />} />
          <Route path="categorie/:nom" element={<CategoryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
