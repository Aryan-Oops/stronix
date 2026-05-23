import { useState, useRef, useEffect } from 'react';
import { IconSend } from '@tabler/icons-react';
import { useProfileStore } from '../store/profileStore';
import { useBodyStore } from '../store/bodyStore';
import { useStepStore } from '../store/stepStore';
import { PageHeader } from '../components/UI';

const CHIPS = [
  'Best post-workout meal?',
  'Should I rest today?',
  'How to improve my bench press?',
  'Analyse my body progress',
  'Create a new workout plan for me',
  'What should I eat before training?',
];

export default function AICoach() {
  const profile = useProfileStore();
  const { entries } = useBodyStore();
  const { todaySteps, stepGoal } = useStepStore();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Hey ${profile.name}! 💪 I'm your Stronix AI Coach. I can help with workouts, diet, recovery, and your body composition goals. What's on your mind today?` },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const msgsRef = useRef();

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [messages]);

  const latest = entries[entries.length - 1];
  const systemPrompt = `You are Stronix AI Coach, a fitness expert assistant built into a gym tracking app.
User profile: Name: ${profile.name}, Location: ${profile.location}, Height: ${profile.height}cm, Weight: ${latest?.weight ?? profile.weight}kg, Goal weight: ${profile.goalWeight}kg, Body fat: ${latest?.bf ?? profile.bodyFat}%, Level: ${profile.level}, Goal: ${profile.goal}, Split: ${profile.split}.
Today's steps: ${todaySteps}/${stepGoal || profile.stepGoal}.
Give concise, practical, motivating fitness and nutrition advice. Be specific to the user's stats. Under 100 words. Max 2 emojis. Use Indian context where relevant (food, lifestyle).`;

  const send = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg || loading) return;
    setInput('');
    const newMessages = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: systemPrompt,
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || 'Something went wrong. Try again!';
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Connection error — but I\'m here! Ask me anything about your training. 💪' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 flex flex-col" style={{ height: 'calc(100vh - 0px)' }}>
      <PageHeader title="AI Coach" sub="Powered by Stronix Intelligence" />

      <div className="flex gap-2 flex-wrap mb-4">
        {CHIPS.map((chip) => (
          <button key={chip} onClick={() => send(chip)} className="chip">{chip}</button>
        ))}
      </div>

      <div ref={msgsRef} className="flex-1 overflow-y-auto space-y-3 mb-4 min-h-0">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-2 items-start ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] flex-shrink-0 font-display ${m.role === 'assistant' ? 'bg-accent text-bg' : 'bg-surface3 text-text'}`}>
              {m.role === 'assistant' ? 'AI' : profile.name.slice(0, 2).toUpperCase()}
            </div>
            <div
              className="max-w-[76%] px-3.5 py-2.5 text-[13px] leading-relaxed"
              style={{
                background: m.role === 'assistant' ? '#181818' : '#e8ff3b',
                color: m.role === 'assistant' ? '#f0f0f0' : '#000',
                borderRadius: m.role === 'assistant' ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
                fontWeight: m.role === 'user' ? 500 : 400,
              }}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2 items-start">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-[11px] text-bg font-display flex-shrink-0">AI</div>
            <div className="px-3.5 py-2.5 text-[13px] text-muted bg-surface2" style={{ borderRadius: '4px 14px 14px 14px' }}>
              Thinking...
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-3 border-t border-border">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Ask your AI coach..."
          className="cinp flex-1 bg-surface2 border border-border rounded-xl px-3 py-2.5 text-[13px] text-text outline-none focus:border-accent/40"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        />
        <button onClick={() => send()} className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center flex-shrink-0 border-none cursor-pointer hover:opacity-90 transition-opacity">
          <IconSend size={18} color="#000" />
        </button>
      </div>
    </div>
  );
}
