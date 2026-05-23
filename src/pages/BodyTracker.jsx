import { useState } from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { useBodyStore } from '../store/bodyStore';
import { PageHeader } from '../components/UI';
import { getMeasurementChange } from '../utils/calculations';

const MEASUREMENTS = [
  { key: 'chest', label: 'Chest' }, { key: 'waist', label: 'Waist' },
  { key: 'hips', label: 'Hips' }, { key: 'bicep', label: 'Bicep (L)' },
  { key: 'thigh', label: 'Thigh (L)' }, { key: 'calf', label: 'Calf (L)' },
];

export default function BodyTracker() {
  const { entries, addEntry } = useBodyStore();
  const [form, setForm] = useState({ weight: '', bf: '', chest: '', waist: '', hips: '', bicep: '', thigh: '', calf: '' });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!form.weight) return;
    addEntry({
      weight: parseFloat(form.weight),
      bf: parseFloat(form.bf) || null,
      chest: parseFloat(form.chest) || null,
      waist: parseFloat(form.waist) || null,
      hips: parseFloat(form.hips) || null,
      bicep: parseFloat(form.bicep) || null,
      thigh: parseFloat(form.thigh) || null,
      calf: parseFloat(form.calf) || null,
    });
    setForm({ weight: '', bf: '', chest: '', waist: '', hips: '', bicep: '', thigh: '', calf: '' });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const chartData = entries.slice(-8).map((e, i) => ({ label: e.date || `Entry ${i + 1}`, weight: e.weight }));

  return (
    <div className="p-5">
      <PageHeader title="Body Tracker" sub="Log weight, body fat & measurements" />

      <div className="card">
        <div className="section-title">Log Today's Stats</div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <div className="text-[11px] text-muted mb-1">Weight (kg)</div>
            <input className="inp mb-0" type="number" step="0.1" placeholder="e.g. 72.5" value={form.weight} onChange={e => setForm(f => ({ ...f, weight: e.target.value }))} />
          </div>
          <div>
            <div className="text-[11px] text-muted mb-1">Body Fat (%)</div>
            <input className="inp mb-0" type="number" step="0.1" placeholder="e.g. 14.2" value={form.bf} onChange={e => setForm(f => ({ ...f, bf: e.target.value }))} />
          </div>
        </div>
        <div className="text-[11px] text-muted mb-2 mt-1">Measurements (cm)</div>
        <div className="grid grid-cols-3 gap-2">
          {MEASUREMENTS.map(({ key, label }) => (
            <div key={key}>
              <div className="text-[11px] text-muted mb-1">{label}</div>
              <input className="inp mb-0" type="number" step="0.1" placeholder="cm" value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
            </div>
          ))}
        </div>
        <button onClick={handleSave} className="btn-primary mt-3" style={{ background: saved ? '#4dff91' : undefined }}>
          {saved ? '✓ Saved!' : 'Save Entry'}
        </button>
      </div>

      <div className="card">
        <div className="section-title">Weight History</div>
        <ResponsiveContainer width="100%" height={100}>
          <BarChart data={chartData} barSize={20}>
            <XAxis dataKey="label" tick={{ fill: '#666', fontSize: 9 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: '#181818', border: '1px solid #2a2a2a', borderRadius: 8, fontSize: 12 }}
              formatter={(v) => [`${v} kg`, 'Weight']}
              labelStyle={{ color: '#e8ff3b' }}
            />
            <Bar dataKey="weight" radius={[3, 3, 0, 0]}>
              {chartData.map((_, i) => (
                <Cell key={i} fill={i === chartData.length - 1 ? '#e8ff3b' : '#e8ff3b44'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-3 space-y-0">
          {[...entries].reverse().slice(0, 5).map((e, i) => (
            <div key={i} className="row-item">
              <span className="text-[11px] text-muted">{e.date}</span>
              <span className="text-[13px]">
                {e.weight} kg{e.bf ? ` · BF ${e.bf}%` : ''}{e.chest ? ` · Chest ${e.chest}cm` : ''}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="section-title">Measurements Summary</div>
        <div className="grid grid-cols-2 gap-2">
          {MEASUREMENTS.map(({ key, label }) => {
            const change = getMeasurementChange(entries, key);
            const latest = entries[entries.length - 1]?.[key];
            if (!latest) return null;
            return (
              <div key={key} className="bg-surface2 rounded-xl p-3">
                <div className="text-[11px] text-muted mb-1">{label}</div>
                <div className="font-medium text-[14px]">
                  {latest} cm{' '}
                  {change && (
                    <span style={{ color: change.diff > 0 ? '#4dff91' : '#ff5c3a', fontSize: 11 }}>
                      {change.diff > 0 ? '+' : ''}{change.diff}cm
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
