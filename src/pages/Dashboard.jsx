import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from 'recharts';
import { useProfileStore } from '../store/profileStore';
import { useStepStore } from '../store/stepStore';
import { useDietStore } from '../store/dietStore';
import { useBodyStore } from '../store/bodyStore';
import { StatCard, ProgressBar, PageHeader } from '../components/UI';
import { progressPct, stepsToCalories, getWeightTrend } from '../utils/calculations';

export default function Dashboard() {
  const profile = useProfileStore();
  const { todaySteps, stepGoal, history } = useStepStore();
  const { totalCal, calorieTarget, totalProtein, totalCarbs, totalFat } = useDietStore();
  const { entries } = useBodyStore();
  const cal = calorieTarget || profile.calorieTarget;
  const trend = getWeightTrend(entries);
  const latest = entries[entries.length - 1];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="p-5">
      <div className="text-[12px] text-muted mb-0.5">{greeting}, {profile.name} 💪</div>
      <PageHeader title="Your Overview" />

      <div className="grid grid-cols-3 gap-2.5 mb-3">
        <StatCard label="Steps Today" value={todaySteps.toLocaleString()} sub={`${progressPct(todaySteps, stepGoal || profile.stepGoal)}% of goal`} pct={progressPct(todaySteps, stepGoal || profile.stepGoal)} />
        <StatCard label="Cal Burned" value={stepsToCalories(todaySteps, profile.weight)} sub="From steps today" color="#ff5c3a" />
        <StatCard label="Streak" value="9" sub="Days in a row 🔥" color="#4dff91" />
      </div>

      <div className="grid grid-cols-2 gap-2.5 mb-3">
        <div className="card mb-0">
          <div className="section-title">Weekly Activity</div>
          <ResponsiveContainer width="100%" height={80}>
            <BarChart data={history} barSize={14}>
              <XAxis dataKey="day" tick={{ fill: '#666', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Bar dataKey="steps" radius={[3, 3, 0, 0]}>
                {history.map((e, i) => (
                  <Cell key={i} fill={i === history.length - 1 ? '#e8ff3b' : '#e8ff3b33'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card mb-0">
          <div className="section-title">Body Progress</div>
          <div className="flex justify-between items-end mb-2">
            <div>
              <div className="font-display text-2xl">{latest?.weight ?? profile.weight} kg</div>
              <div className="text-[11px] text-muted">Current weight</div>
            </div>
            <div className="text-right">
              <div className="font-display text-lg" style={{ color: trend >= 0 ? '#4dff91' : '#ff5c3a' }}>
                {trend >= 0 ? '+' : ''}{trend} kg
              </div>
              <div className="text-[11px] text-muted">Since start</div>
            </div>
          </div>
          <div className="text-[11px] text-muted mb-1">Goal: {profile.goalWeight} kg</div>
          <ProgressBar pct={progressPct(latest?.weight ?? profile.weight, profile.goalWeight)} color="#4dff91" />
        </div>
      </div>

      <div className="card">
        <div className="section-title">Nutrition Today</div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Protein', val: totalProtein, goal: 160, color: '#e8ff3b', unit: 'g' },
            { label: 'Carbs', val: totalCarbs, goal: 310, color: '#ff5c3a', unit: 'g' },
            { label: 'Fats', val: totalFat, goal: 65, color: '#4dff91', unit: 'g' },
          ].map(({ label, val, goal, color, unit }) => (
            <div key={label} className="bg-surface2 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color }}>{label}</div>
              <div className="font-display text-xl">{val}{unit}</div>
              <ProgressBar pct={progressPct(val, goal)} color={color} />
              <div className="text-[10px] text-muted mt-1">{progressPct(val, goal)}%</div>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-border flex justify-between items-center">
          <span className="text-[12px] text-muted">Calories consumed</span>
          <span className="font-display text-lg">{totalCal} <span className="text-sm text-muted font-body font-normal">/ {cal} kcal</span></span>
        </div>
        <ProgressBar pct={progressPct(totalCal, cal)} color="#4dff91" />
      </div>
    </div>
  );
}
