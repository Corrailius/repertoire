import { Outlet, Link } from "react-router-dom"
import NavItem from "./NavItem"
import { categories, getCategoryLabel } from "../data/categories"
import heroMark from "../assets/hero.png"

function Layout() {
  return (
    <div className="flex min-h-screen flex-col text-parchment">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-abyss/95">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <Link to="/recettes" className="flex items-center gap-2.5">
            <img src={heroMark} alt="" className="h-8 w-8" />
            <span className="font-serif text-xl tracking-wide">Repertoire</span>
          </Link>
          <nav className="flex flex-wrap items-center gap-1">
            <NavItem to="/recettes" label="All Recipes" />
            {categories.map((category) => (
              <NavItem key={category} to={`/categorie/${category}`} label={getCategoryLabel(category)} />
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
        <Outlet />
      </main>

      <footer className="border-t border-white/10 py-6 text-center text-xs text-mist-dim">
        Recipes worth repeating.
      </footer>
    </div>
  )
}

export default Layout
