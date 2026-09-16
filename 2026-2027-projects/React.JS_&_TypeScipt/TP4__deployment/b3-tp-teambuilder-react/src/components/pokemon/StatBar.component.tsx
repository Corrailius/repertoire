type StatBarProps = {
  label: string;
  value: number;
};

// La plus haute statistique du jeu tourne autour de 255 : on s'en sert
// comme maximum pour la largeur de la barre.
const MAX_STAT = 255;

const StatBar = ({ label, value }: StatBarProps) => {
  const percentage = (value / MAX_STAT) * 100;

  return (
    <div className="flex items-center gap-3">
      <span className="w-32 text-xs text-gray-500 capitalize">{label}</span>
      <span className="w-8 text-right text-xs font-semibold text-gray-800">
        {value}
      </span>
      <div className="h-2 flex-1 rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-red-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default StatBar;
