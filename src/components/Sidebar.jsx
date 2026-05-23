import { NavLink } from 'react-router-dom';
import {
  IconLayoutDashboard, IconBarbell, IconWalk, IconSalad,
  IconRulerMeasure, IconCamera, IconRobot, IconUser,
} from '@tabler/icons-react';

const NAV = [
  { to: '/dashboard', icon: IconLayoutDashboard, label: 'Dashboard' },
  { to: '/workout', icon: IconBarbell, label: 'Workout' },
  { to: '/steps', icon: IconWalk, label: 'Steps' },
  { to: '/diet', icon: IconSalad, label: 'Diet' },
  { to: '/body', icon: IconRulerMeasure, label: 'Body Tracker' },
  { to: '/photos', icon: IconCamera, label: 'Progress Photos' },
  { to: '/ai', icon: IconRobot, label: 'AI Coach' },
];

export default function Sidebar() {
  return (
    <aside className="w-[60px] bg-surface border-r border-border flex flex-col items-center py-3 gap-1.5 flex-shrink-0">
      <div className="font-display text-accent text-xl tracking-[3px] mb-3">ST</div>
      {NAV.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          title={label}
          className={({ isActive }) =>
            `nav-btn ${isActive ? 'active' : ''}`
          }
        >
          <Icon size={20} />
        </NavLink>
      ))}
      <NavLink
        to="/profile"
        title="Profile"
        className={({ isActive }) => `nav-btn mt-auto ${isActive ? 'active' : ''}`}
      >
        <IconUser size={20} />
      </NavLink>

      {/* Mobile bottom nav */}
      <style>{`
        @media (max-width: 767px) {
          aside {
            position: fixed; bottom: 0; left: 0; right: 0;
            width: 100%; height: 56px; flex-direction: row;
            justify-content: space-around; border-right: none;
            border-top: 1px solid #2a2a2a; z-index: 50; padding: 0 8px;
          }
          aside .font-display { display: none; }
          aside a.mt-auto { margin-top: 0 !important; }
        }
      `}</style>
    </aside>
  );
}
