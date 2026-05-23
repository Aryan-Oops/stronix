import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { useStepStore } from '../store/stepStore';
import { useProfileStore } from '../store/profileStore';
import { PageHeader, ProgressBar } from '../components/UI';
import { stepsToKm, stepsToCalories, progressPct } from '../utils/calculations';

export default function Steps() {
  const { todaySteps, history, stepGoal, addSteps } = useStepStore();
  const { weight, stepGoal: profileGoal } = useProfileStore();
  const goal = stepGoal || profileGoal;
  const pct = progressPct(todaySteps, goal);
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  const avg = Math.round(history.reduce((a, h) => a + h.steps, 0) / history.length);
  const best = Math.max(...history.map((h) => h.steps));
  const goalsHit = history.filter((h) => h.steps >= goal).length;

  return (
    <div className="p-5">
      <PageHeader title="Step Tracker" sub={new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} />

      <div className="card text-center">
        <svg viewBox="0 0 130 130" width={140} height={140} className="mx-auto mb-2">
          <circle cx="65" cy="65" r={radius} fill="none" stroke="#222" strokeWidth="10" />
          <circle
            cx="65" cy="65" r={radius} fill="none"
            stroke="#e8ff3b" strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 65 65)"
            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
          />
          <text x="65" y="60" textAnchor="middle" fontFamily="Bebas Neue" fontSize="26" fill="#e8ff3b">
            {todaySteps.toLocaleString()}
          </text>
          <text x="65" y="76" textAnchor="middle" fontFamily="DM Sans" fontSize="10" fill="#666">
            STEPS
          </text>
        </svg>

        <div className="text-[12px] text-muted mb-3">{pct}% of {goal.toLocaleString()} goal · {(goal - todaySteps) > 0 ? (goal - todaySteps).toLocaleString() + ' to go' : 'Goal reached! 🎉'}</div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: 'Distance', val: `${stepsToKm(todaySteps)} km` },
            { label: 'Calories', val: stepsToCalories(todaySteps, weight) },
            { label: 'Active min', val: Math.round(todaySteps / 100) },
          ].map(({ label, val }) => (
            <div key={label}>
              <div className="font-display text-xl">{val}</div>
              <div className="text-[11px] text-muted">{label}</div>
            </div>
          ))}
        </div>

        <button onClick={() => addSteps(500)} className="btn-primary">
          + Simulate 500 Steps
        </button>
      </div>

      <div className="card">
        <div className="section-title">7-Day History</div>
        <ResponsiveContainer width="100%" height={100}>
          <BarChart data={history} barSize={22}>
            <XAxis dataKey="day" tick={{ fill: '#666', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: '#181818', border: '1px solid #2a2a2a', borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: '#e8ff3b' }}
              itemStyle={{ color: '#f0f0f0' }}
              formatter={(v) => [v.toLocaleString(), 'Steps']}
            />
            <Bar dataKey="steps" radius={[3, 3, 0, 0]}>
              {history.map((e, i) => (
                <Cell key={i} fill={i === history.length - 1 ? '#e8ff3b' : e.steps >= goal ? '#4dff91' : '#e8ff3b33'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-border text-center">
          <div><div className="text-[11px] text-muted">Weekly avg</div><div className="font-display text-lg text-accent">{avg.toLocaleString()}</div></div>
          <div><div className="text-[11px] text-muted">Best day</div><div className="font-display text-lg">{best.toLocaleString()}</div></div>
          <div><div className="text-[11px] text-muted">Goals hit</div><div className="font-display text-lg text-success">{goalsHit}/7</div></div>
        </div>
      </div>
    </div>
  );
}
