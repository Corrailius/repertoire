import { NavLink } from "react-router-dom"

type NavItemProps = {
  to: string
  label: string
}

function NavItem({ to, label }: NavItemProps) {
  return (
    <NavLink
      to={to}
      end={to === "/recettes"}
      className={({ isActive }) =>
        `rounded-lg px-3 py-1.5 text-sm font-medium ${
          isActive ? "bg-regal/25 text-parchment" : "text-mist hover:text-parchment"
        }`
      }
    >
      {label}
    </NavLink>
  )
}

export default NavItem
