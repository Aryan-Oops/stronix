import { useDietStore } from '../store/dietStore';
import { useProfileStore } from '../store/profileStore';
import { Badge, ProgressBar, PageHeader } from '../components/UI';
import { progressPct } from '../utils/calculations';

export default function Diet() {
  const { meals, totalCal, totalProtein, totalCarbs, totalFat, logMeal } = useDietStore();
  const { calorieTarget } = useProfileStore();
  const calPct = progressPct(totalCal, calorieTarget);

  return (
    <div className="p-5">
      <PageHeader title="Diet Plan" sub={`Muscle gain · ${calorieTarget} kcal/day`} />

      <div className="card">
        <div className="flex justify-between items-center mb-2">
          <div>
            <div className="section-title">Calories Today</div>
            <div className="font-display text-2xl">
              {totalCal} <span className="text-sm text-muted font-body font-normal">/ {calorieTarget} kcal</span>
            </div>
          </div>
          <Badge type={calPct >= 90 ? 'green' : calPct >= 60 ? 'yellow' : 'muted'}>
            {calPct >= 90 ? 'On Track' : calPct >= 60 ? 'In Progress' : 'Behind'}
          </Badge>
        </div>
        <ProgressBar pct={calPct} color="#4dff91" />
      </div>

      <div className="card">
        <div className="section-title">Macros</div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Protein', val: totalProtein, goal: 160, unit: 'g', color: '#e8ff3b' },
            { label: 'Carbs', val: totalCarbs, goal: 310, unit: 'g', color: '#ff5c3a' },
            { label: 'Fats', val: totalFat, goal: 65, unit: 'g', color: '#4dff91' },
          ].map(({ label, val, goal, unit, color }) => (
            <div key={label} className="bg-surface2 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color }}>{label}</div>
              <div className="font-display text-xl">{val}{unit}</div>
              <div className="text-[10px] text-muted mt-0.5">Goal: {goal}{unit}</div>
              <ProgressBar pct={progressPct(val, goal)} color={color} />
              <div className="text-[10px] text-muted mt-1">{progressPct(val, goal)}%</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="section-title">Today's Meals</div>
        {meals.map((meal) => (
          <div key={meal.id} className="row-item">
            <div className="flex-1">
              <div className="font-medium text-[13px]">{meal.icon} {meal.name}</div>
              <div className="text-[11px] text-muted">{meal.desc}</div>
            </div>
            <div className="flex flex-col items-end gap-1.5 ml-3">
              <div className="font-medium text-[13px]">{meal.cal} kcal</div>
              <div className="flex items-center gap-2">
                <Badge type={meal.logged ? 'green' : 'muted'}>{meal.logged ? 'Logged' : 'Pending'}</Badge>
                <button
                  onClick={() => logMeal(meal.id)}
                  className="text-[10px] text-accent border border-accent/30 px-2 py-0.5 rounded-full hover:bg-accent/10 transition-colors"
                >
                  {meal.logged ? 'Undo' : 'Log'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
