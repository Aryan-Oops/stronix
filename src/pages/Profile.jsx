import { useState } from 'react';
import { useProfileStore } from '../store/profileStore';
import { ACHIEVEMENTS } from '../utils/defaults';
import { Badge, Toggle, PageHeader } from '../components/UI';
import { calcBMI } from '../utils/calculations';

export default function Profile() {
  const profile = useProfileStore();
  const { updateProfile } = useProfileStore();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: profile.name, stepGoal: profile.stepGoal, calorieTarget: profile.calorieTarget });

  const bmi = calcBMI(profile.weight, profile.height);
  const bmiLabel = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese';

  const handleSave = () => {
    updateProfile({ name: form.name, stepGoal: parseInt(form.stepGoal), calorieTarget: parseInt(form.calorieTarget) });
    setEditing(false);
  };

  return (
    <div className="p-5">
      <PageHeader title="Profile" />

      <div className="card text-center">
        <div className="w-[68px] h-[68px] rounded-full bg-accent flex items-center justify-center font-display text-2xl text-bg mx-auto mb-3">
          {profile.name.slice(0, 2).toUpperCase()}
        </div>
        <div className="text-[17px] font-medium">{profile.name}</div>
        <div className="text-[12px] text-muted mb-3">{profile.location}</div>
        <div className="flex gap-2 justify-center flex-wrap">
          {[profile.goal, profile.level, profile.split].map((tag) => (
            <span key={tag} className="px-2.5 py-1 bg-surface2 rounded-lg text-[11px] text-muted">{tag}</span>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="section-title">Body Stats</div>
        <div className="grid grid-cols-2 gap-2 mb-2">
          {[
            { label: 'Height', val: `${profile.height} cm` },
            { label: 'Weight', val: `${profile.weight} kg` },
            { label: 'Goal Weight', val: `${profile.goalWeight} kg` },
            { label: 'Body Fat', val: `${profile.bodyFat}%` },
            { label: 'BMI', val: bmi },
            { label: 'BMI Status', val: bmiLabel },
          ].map(({ label, val }) => (
            <div key={label} className="bg-surface2 rounded-xl p-3">
              <div className="text-[11px] text-muted mb-0.5">{label}</div>
              <div className="font-medium text-[14px]">{val}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="section-title">Achievements</div>
        {ACHIEVEMENTS.map((a) => (
          <div key={a.id} className="flex items-center gap-3 py-2.5 border-b border-border last:border-none last:pb-0">
            <div className="w-10 h-10 rounded-xl bg-surface2 flex items-center justify-center text-xl flex-shrink-0">
              {a.icon}
            </div>
            <div className="flex-1">
              <div className="font-medium text-[13px]">{a.name}</div>
              <div className="text-[11px] text-muted">{a.desc}</div>
            </div>
            <Badge type={a.earned ? 'yellow' : 'muted'}>{a.earned ? 'Earned' : 'Locked'}</Badge>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-3">
          <div className="section-title" style={{ margin: 0 }}>Settings</div>
          <button onClick={() => editing ? handleSave() : setEditing(true)} className="text-[12px] text-accent hover:opacity-80 transition-opacity">
            {editing ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="space-y-1">
          {[
            { label: 'Name', key: 'name', type: 'text' },
            { label: 'Daily step goal', key: 'stepGoal', type: 'number' },
            { label: 'Calorie target', key: 'calorieTarget', type: 'number' },
          ].map(({ label, key, type }) => (
            <div key={key} className="row-item">
              <span className="text-muted text-[13px]">{label}</span>
              {editing ? (
                <input
                  type={type}
                  value={form[key]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  className="bg-surface2 border border-accent/40 rounded-lg px-2 py-1 text-[13px] text-right text-text outline-none w-32"
                />
              ) : (
                <span className="text-[13px]">{profile[key]}</span>
              )}
            </div>
          ))}

          <div className="row-item">
            <span className="text-muted text-[13px]">Workout reminders</span>
            <Toggle on={profile.workoutReminders} onChange={(v) => updateProfile({ workoutReminders: v })} />
          </div>
          <div className="row-item">
            <span className="text-muted text-[13px]">Meal reminders</span>
            <Toggle on={profile.mealReminders} onChange={(v) => updateProfile({ mealReminders: v })} />
          </div>
        </div>
      </div>
    </div>
  );
}
