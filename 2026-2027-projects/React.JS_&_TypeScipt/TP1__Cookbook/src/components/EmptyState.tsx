import { Link } from "react-router-dom"

type EmptyStateProps = {
  title: string
  message: string
  actionLabel?: string
  actionTo?: string
}

function EmptyState({ title, message, actionLabel, actionTo }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-white/10 bg-aubergine px-6 py-16 text-center">
      <h2 className="font-serif text-2xl text-parchment">{title}</h2>
      <p className="max-w-md text-mist">{message}</p>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="mt-2 rounded-lg bg-regal px-5 py-2.5 text-sm font-medium text-white hover:bg-regal-light"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  )
}

export default EmptyState
