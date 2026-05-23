import { useState } from 'react';
import { useWorkoutStore } from '../store/workoutStore';
import { WORKOUT_PLANS } from '../utils/defaults';
import { Badge, ProgressBar, PageHeader } from '../components/UI';

function ExerciseItem({ ex, day }) {
  const { getCompleted, markSet } = useWorkoutStore();
  const done = getCompleted(day, ex.id);
  const pct = Math.round((done / ex.sets) * 100);

  const badge = done >= ex.sets
    ? <Badge type="green">Done</Badge>
    : done > 0
    ? <Badge type="yellow">{done}/{ex.sets}</Badge>
    : <Badge type="muted">Pending</Badge>;

  return (
    <div className="flex items-center gap-3 py-3 border-b border-border last:border-none last:pb-0">
      <div className="w-9 h-9 rounded-xl bg-surface2 flex items-center justify-center text-base flex-shrink-0">
        {ex.icon}
      </div>
      <div className="flex-1">
        <div className="font-medium text-[13px]">{ex.name}</div>
        <div className="text-[11px] text-muted">{ex.sets}×{ex.reps} · {ex.weight}</div>
        <ProgressBar pct={pct} />
      </div>
      <div className="flex flex-col items-end gap-1.5">
        {badge}
        {done < ex.sets && (
          <button
            onClick={() => markSet(day, ex.id, done + 1)}
            className="text-[10px] text-accent border border-accent/30 px-2 py-0.5 rounded-full hover:bg-accent/10 transition-colors"
          >
            +Set
          </button>
        )}
      </div>
    </div>
  );
}

export default function Workout() {
  const [activeDay, setActiveDay] = useState('push');
  const { resetDay } = useWorkoutStore();
  const plan = WORKOUT_PLANS[activeDay];
  const { getCompleted } = useWorkoutStore();

  const totalDone = plan.exercises.filter(ex => getCompleted(activeDay, ex.id) >= ex.sets).length;
  const overallPct = Math.round((totalDone / plan.exercises.length) * 100);

  return (
    <div className="p-5">
      <PageHeader title="Workout Plan" sub="Week 4 — Hypertrophy Phase" />

      <div className="flex gap-2 mb-4 flex-wrap">
        {Object.keys(WORKOUT_PLANS).map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`btn-outline ${activeDay === day ? 'active' : ''}`}
          >
            {WORKOUT_PLANS[day].title}
          </button>
        ))}
      </div>

      <div className="card">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="font-display text-xl tracking-wide">{plan.title}</div>
            <div className="text-[12px] text-muted">{plan.sub} · {plan.duration}</div>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            {totalDone === plan.exercises.length
              ? <Badge type="green">Complete</Badge>
              : totalDone > 0
              ? <Badge type="yellow">In Progress</Badge>
              : <Badge type="muted">Not Started</Badge>}
            <button
              onClick={() => resetDay(activeDay)}
              className="text-[10px] text-muted hover:text-red-400 transition-colors"
            >
              Reset day
            </button>
          </div>
        </div>

        <div className="mb-1 text-[11px] text-muted">{totalDone}/{plan.exercises.length} exercises done</div>
        <ProgressBar pct={overallPct} />

        <div className="mt-4">
          {plan.exercises.map((ex) => (
            <ExerciseItem key={ex.id} ex={ex} day={activeDay} />
          ))}
        </div>
      </div>
    </div>
  );
}
