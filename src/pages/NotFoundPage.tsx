import EmptyState from "../components/EmptyState"

function NotFoundPage() {
  return (
    <EmptyState
      title="Page not found"
      message="That page doesn't exist. Let's get you back to something delicious."
      actionLabel="Browse all recipes"
      actionTo="/recettes"
    />
  )
}

export default NotFoundPage
