import { useState, useRef } from 'react';
import { IconCamera, IconPlus, IconPhoto } from '@tabler/icons-react';
import { PageHeader } from '../components/UI';

const SLOTS = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'];
const VIEWS = ['Front', 'Side', 'Back'];

const STORAGE_KEY = 'stronix_photos';

const loadPhotos = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
  catch { return {}; }
};

export default function ProgressPhotos() {
  const [photos, setPhotos] = useState(loadPhotos);
  const [view, setView] = useState('Front');
  const [uploadIdx, setUploadIdx] = useState(null);
  const fileRef = useRef();

  const handleSlotClick = (idx) => {
    setUploadIdx(idx);
    fileRef.current.click();
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file || uploadIdx === null) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const key = `${view}-${uploadIdx}`;
      const next = { ...photos, [key]: ev.target.result };
      setPhotos(next);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const getPhoto = (idx) => photos[`${view}-${idx}`] || null;
  const firstPhoto = photos[`${view}-0`] || null;
  const latestIdx = SLOTS.map((_, i) => i).reverse().find((i) => photos[`${view}-${i}`]);
  const latestPhoto = latestIdx !== undefined ? photos[`${view}-${latestIdx}`] : null;

  return (
    <div className="p-5">
      <PageHeader title="Progress Photos" sub="Track your visual transformation over time" />

      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <div className="section-title" style={{ margin: 0 }}>May 2026</div>
          <div className="flex gap-2">
            {VIEWS.map((v) => (
              <button key={v} onClick={() => setView(v)} className={`btn-outline ${view === v ? 'active' : ''}`}>{v}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {SLOTS.map((label, idx) => {
            const photo = getPhoto(idx);
            const isAdd = idx === 5;
            return (
              <div
                key={idx}
                onClick={() => handleSlotClick(idx)}
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer border border-dashed border-border flex flex-col items-center justify-center gap-1.5 bg-surface2 hover:border-accent/40 transition-colors group"
                style={isAdd && !photo ? { borderColor: '#e8ff3b33' } : {}}
              >
                {photo ? (
                  <>
                    <img src={photo} alt={label} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                      <span className="text-[10px] text-white">Change photo</span>
                    </div>
                  </>
                ) : (
                  <>
                    {isAdd
                      ? <IconPlus size={22} className="text-accent" />
                      : <IconCamera size={22} className="text-muted" />}
                    <span className="text-[10px]" style={{ color: isAdd ? '#e8ff3b' : '#666' }}>
                      {isAdd ? 'Add New' : label}
                    </span>
                  </>
                )}
                {photo && (
                  <div className="absolute bottom-1.5 left-2">
                    <span className="text-[9px] text-white bg-black/60 px-1.5 py-0.5 rounded">{label}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <input type="file" ref={fileRef} accept="image/*" className="hidden" onChange={handleFile} />
        <p className="text-[11px] text-muted mt-3 text-center">Click any slot to upload a photo · Photos saved locally on your device</p>
      </div>

      <div className="card">
        <div className="section-title">Side-by-Side Compare</div>
        <div className="flex gap-3">
          {[{ label: 'Before', photo: firstPhoto }, { label: 'After', photo: latestPhoto && latestIdx !== 0 ? latestPhoto : null }].map(({ label, photo }) => (
            <div key={label} className="flex-1 aspect-[3/4] rounded-xl overflow-hidden bg-surface2 flex flex-col items-center justify-center gap-2 relative">
              {photo ? (
                <>
                  <img src={photo} alt={label} className="w-full h-full object-cover absolute inset-0" />
                  <div className="absolute bottom-2 left-2.5">
                    <span className="text-[10px] text-white bg-black/60 px-2 py-0.5 rounded-full">{label}</span>
                  </div>
                </>
              ) : (
                <>
                  <IconPhoto size={28} className="text-muted" />
                  <span className="text-[11px] text-muted">{label}</span>
                </>
              )}
            </div>
          ))}
        </div>
        {(!firstPhoto || !latestPhoto) && (
          <p className="text-[11px] text-muted mt-3 text-center">Upload photos in the grid above to enable comparison</p>
        )}
      </div>
    </div>
  );
}
