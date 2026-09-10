import { formatMinutes } from "../lib/format"

type RecipeMetaProps = {
  prepMinutes: number
  cookMinutes: number
}

function RecipeMeta({ prepMinutes, cookMinutes }: RecipeMetaProps) {
  return (
    <dl className="flex gap-5 text-sm text-mist">
      <div className="flex items-baseline gap-1.5">
        <dt className="text-mist-dim">Prep</dt>
        <dd>{formatMinutes(prepMinutes)}</dd>
      </div>
      <div className="flex items-baseline gap-1.5">
        <dt className="text-mist-dim">Cook</dt>
        <dd>{formatMinutes(cookMinutes)}</dd>
      </div>
    </dl>
  )
}

export default RecipeMeta
