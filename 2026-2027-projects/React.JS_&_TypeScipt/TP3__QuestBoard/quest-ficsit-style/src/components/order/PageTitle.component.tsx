import type { ReactNode } from "react";

type PageTitleProps = {
  title: string;
  subtitle: string;
  /** Ce qui se pose à droite du titre : un total, un bouton. */
  aside?: ReactNode;
};

/** L'en-tête commun aux trois écrans du registre de production. */
const PageTitle = ({ title, subtitle, aside }: PageTitleProps) => (
  <div className="mb-4 flex items-start gap-4">
    <div className="flex-1">
      <h2 className="text-2xl font-bold text-stone-900">{title}</h2>
      <p className="mt-0.5 text-sm text-stone-500">{subtitle}</p>
    </div>

    {aside}
  </div>
);

export default PageTitle;
