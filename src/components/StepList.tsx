type StepListProps = {
  steps: string[]
}

function StepList({ steps }: StepListProps) {
  return (
    <ol className="flex flex-col gap-4">
      {steps.map((step, position) => (
        <li key={step} className="flex gap-4">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-regal/20 text-sm font-medium text-regal-light">
            {position + 1}
          </span>
          <p className="text-parchment/90">{step}</p>
        </li>
      ))}
    </ol>
  )
}

export default StepList
