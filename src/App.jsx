import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Calendar, Clock, BookOpen, Layers, Zap, User, Users, Sun, X, Utensils,
  BarChart2, Info, Home, Heart, CheckCircle, Save, PieChart, Briefcase,
  Wifi, Search, Trash2, ChevronRight, MoreVertical, Bell
} from 'lucide-react';

// --- DATA CONFIGURATION ---
const CLASS_STRENGTHS = {
  "I BCA": 55,
  "II BCA": 52,
  "III BCA": 48
};

// --- FACULTY DATA ---
const facultyData = [
  {
    name: "Dr. Padmanaban",
    role: "Head of Department",
    subjects: ["DM Practical (SLAB)"],
    initials: "DP",
    color: "bg-orange-500"
  },
  {
    name: "Dr. Suresh",
    role: "Faculty",
    subjects: ["AN Practical (III BCA)", "Value Education / Project (II BCA)"],
    initials: "DS",
    color: "bg-blue-500"
  },
  {
    name: "Mrs. Seethalakshmi",
    role: "Faculty",
    subjects: ["R Programming (III BCA)", "Office Automation (I BCA)", "Naan Mudhalvan (III BCA)"],
    initials: "MS",
    color: "bg-purple-500"
  },
  {
    name: "Mrs. Deepa S",
    role: "Faculty",
    subjects: ["Java Programming (II BCA)", "Naan Mudhalvan (II BCA)", "C++ Lab (SLAB)"],
    initials: "MD",
    color: "bg-pink-500"
  },
  {
    name: "Mrs. Jayashree",
    role: "Faculty",
    subjects: ["C++ Programming (I BCA)", "Network Security / Practical (III BCA)"],
    initials: "MJ",
    color: "bg-emerald-500"
  }
];

const timetableData = {
  title: "DRBCCC Hindu College",
  department: "Dept. of Computer Applications",
  semester: "2025-2026",
  rows: [
    {
      id: "I",
      dayOrder: "Day Order I",
      slots: [
        { period: 1, startTime: "11:00 AM", endTime: "12:00 PM", subject: "ADVANCE LEARNER", details: "PROJECT WORK", staff: "Faculty Team", type: "lab" },
        { period: 2, startTime: "12:00 PM", endTime: "01:00 PM", subject: "R Programming", details: "III BCA", staff: "Mrs. Seethalakshmi", type: "lecture" },
        { period: 3, startTime: "01:00 PM", endTime: "02:00 PM", subject: "JAVA", details: "II BCA", staff: "Mrs. Deepa S", type: "lecture" },
        { period: 4, startTime: "02:30 PM", endTime: "03:30 PM", subject: "Office Auto", details: "I BCA", staff: "Mrs. Seethalakshmi", type: "lecture" },
        { period: 5, startTime: "03:30 PM", endTime: "04:30 PM", subject: "AN PRACTICAL", details: "III BCA", staff: "Dr. Suresh", type: "lab" },
      ]
    },
    {
      id: "II",
      dayOrder: "Day Order II",
      slots: [
        { period: 1, startTime: "11:00 AM", endTime: "12:00 PM", subject: "R Programming", details: "III BCA", staff: "Mrs. Seethalakshmi", type: "lecture" },
        { period: 2, startTime: "12:00 PM", endTime: "01:00 PM", subject: "FREE", details: "Relax", staff: "-", type: "free", isEmpty: true },
        { period: 3, startTime: "01:00 PM", endTime: "02:00 PM", subject: "C++", details: "I BCA", staff: "Mrs. Jayashree", type: "lecture" },
        { period: 4, startTime: "02:30 PM", endTime: "03:30 PM", subject: "Office Auto", details: "I BCA", staff: "Mrs. Seethalakshmi", type: "lecture" },
        { period: 5, startTime: "03:30 PM", endTime: "04:30 PM", subject: "JAVA", details: "II BCA", staff: "Mrs. Deepa S", type: "lecture" },
      ]
    },
    {
      id: "III",
      dayOrder: "Day Order III",
      slots: [
        { period: 1, startTime: "11:00 AM", endTime: "12:00 PM", subject: "C++", details: "I BCA", staff: "Mrs. Jayashree", type: "lecture" },
        { period: 2, startTime: "12:00 PM", endTime: "01:00 PM", subject: "JAVA", details: "II BCA", staff: "Mrs. Deepa S", type: "lecture" },
        { period: 3, startTime: "01:00 PM", endTime: "02:00 PM", subject: "ADVANCE LEARNER", details: "PROJECT WORK", staff: "Faculty Team", type: "lab" },
        { period: 4, startTime: "02:30 PM", endTime: "03:30 PM", subject: "DM PRACTICAL", details: "SLAB", staff: "Dr. Padmanaban (HOD)", type: "lab" },
        { period: 5, startTime: "03:30 PM", endTime: "04:30 PM", subject: "R Programming", details: "III BCA", staff: "Mrs. Seethalakshmi", type: "lecture" },
      ]
    },
    {
      id: "IV",
      dayOrder: "Day Order IV",
      slots: [
        { period: 1, startTime: "11:00 AM", endTime: "12:00 PM", subject: "C++", details: "I BCA", staff: "Mrs. Jayashree", type: "lecture" },
        { period: 2, startTime: "12:00 PM", endTime: "01:00 PM", subject: "FREE", details: "-", staff: "-", type: "free", isEmpty: true },
        { period: 3, startTime: "01:00 PM", endTime: "02:00 PM", subject: "NS / PRACTICAL", details: "III BCA", staff: "Mrs. Jayashree", type: "lab" },
        { period: 4, startTime: "02:30 PM", endTime: "03:30 PM", subject: "R Programming", details: "III BCA", staff: "Mrs. Seethalakshmi", type: "lecture" },
        { period: 5, startTime: "03:30 PM", endTime: "04:30 PM", subject: "JAVA", details: "II BCA", staff: "Mrs. Deepa S", type: "lecture" },
      ]
    },
    {
      id: "V",
      dayOrder: "Day Order V",
      slots: [
        { period: 1, startTime: "11:00 AM", endTime: "12:00 PM", subject: "C++", details: "I BCA", staff: "Mrs. Jayashree", type: "lecture" },
        { period: 2, startTime: "12:00 PM", endTime: "01:00 PM", subject: "Naan Mudhalvan", details: "II BCA", staff: "Mrs. Deepa S", type: "lecture" },
        { period: 3, startTime: "01:00 PM", endTime: "02:00 PM", subject: "Naan Mudhalvan", details: "III BCA", staff: "Mrs. Seethalakshmi", type: "lecture" },
        { period: 4, startTime: "02:30 PM", endTime: "03:30 PM", subject: "VALUE / PROJ", details: "II BCA", staff: "Dr. Suresh", type: "lab" },
        { period: 5, startTime: "03:30 PM", endTime: "04:30 PM", subject: "R Programming", details: "III BCA", staff: "Mrs. Seethalakshmi", type: "lecture" },
      ]
    },
    {
      id: "VI",
      dayOrder: "Day Order VI",
      slots: [
        { period: 1, startTime: "11:00 AM", endTime: "12:00 PM", subject: "Naan Mudhalvan", details: "II BCA", staff: "Mrs. Deepa S", type: "lecture" },
        { period: 2, startTime: "12:00 PM", endTime: "01:00 PM", subject: "R Programming", details: "III BCA", staff: "Mrs. Seethalakshmi", type: "lecture" },
        { period: 3, startTime: "01:00 PM", endTime: "02:00 PM", subject: "Naan Mudhalvan", details: "III BCA", staff: "Mrs. Seethalakshmi", type: "lecture" },
        { period: 4, startTime: "02:30 PM", endTime: "03:30 PM", subject: "JAVA", details: "II BCA", staff: "Mrs. Seethalakshmi", type: "lecture" },
        { period: 5, startTime: "03:30 PM", endTime: "04:30 PM", subject: "C++", details: "SLAB", staff: "Mrs. Deepa S", type: "lab" },
      ]
    },
  ]
};

// --- HELPERS ---

const getMinutes = (timeStr) => {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (modifier === 'PM' && hours !== 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;
  return hours * 60 + minutes;
};

const getYearInfo = (details) => {
  if (!details) return null;
  const upperDetails = details.toUpperCase();
  if (upperDetails.includes('III BCA')) return { label: '3rd Year', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', strength: CLASS_STRENGTHS["III BCA"] };
  if (upperDetails.includes('II BCA')) return { label: '2nd Year', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', strength: CLASS_STRENGTHS["II BCA"] };
  if (upperDetails.includes('I BCA')) return { label: '1st Year', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', strength: CLASS_STRENGTHS["I BCA"] };
  return null;
};

const getSessionKey = (dayId, targetIndex, slots) => {
  let groupIndex = 0;
  let lastSubject = null;
  let lastDetails = null;
  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    const isSame = i > 0 && slot.subject === lastSubject && slot.details === lastDetails && !slot.isEmpty;
    if (!isSame) {
      groupIndex++;
      lastSubject = slot.subject;
      lastDetails = slot.details;
    }
    if (i === targetIndex) return `${dayId}-S${groupIndex}`;
  }
  return `${dayId}-${targetIndex}`;
};

// --- COMPONENTS ---

const Header = ({ currentDate, onSearch }) => (
  <header className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4 flex items-center justify-between">
    <div>
      <h1 className="text-lg font-bold text-white tracking-tight">{timetableData.title}</h1>
      <p className="text-xs text-zinc-400 font-medium">{timetableData.department}</p>
    </div>
    <div className="flex items-center gap-3">
      <button onClick={onSearch} className="p-2 rounded-full hover:bg-white/5 text-zinc-400 hover:text-white transition-colors">
        <Search size={20} />
      </button>
      <div className="flex flex-col items-end">
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{currentDate.dayName.substring(0, 3)}</span>
        <div className="flex items-center justify-center bg-indigo-500/10 border border-indigo-500/20 rounded-md px-2 py-1">
          <span className="text-xs font-bold text-indigo-400">{currentDate.dateStr}</span>
        </div>
      </div>
    </div>
  </header>
);

const TabBar = ({ tabs, activeTab, onTabClick }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      const activeEl = scrollRef.current.querySelector(`[data-active="true"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [activeTab]);

  return (
    <div className="fixed top-[76px] left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-sm border-b border-white/5 py-2">
      <div ref={scrollRef} className="flex overflow-x-auto px-4 gap-3 no-scrollbar snap-x">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            data-active={activeTab === tab.id}
            onClick={() => onTabClick(tab.id)}
            className={`
              snap-center flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${activeTab === tab.id
                ? 'bg-white text-zinc-950 shadow-lg shadow-white/10 scale-105'
                : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-white/5'}
            `}
          >
            {tab.dayOrder}
          </button>
        ))}
      </div>
    </div>
  );
};

const HeroCountdown = ({ timeLeft, label }) => (
  <div className="mx-4 mt-6 mb-8 p-6 rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-2xl shadow-indigo-900/20 relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:translate-x-1/3 transition-transform duration-1000" />
    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="flex items-center gap-2 mb-3 opacity-80">
        <Clock size={16} />
        <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-6xl font-black tracking-tighter font-mono mb-4 drop-shadow-lg">
        {timeLeft}
      </div>
      <div className="flex items-center gap-2 text-xs font-bold bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
        LIVE SCHEDULE
      </div>
    </div>
  </div>
);

const ClassCard = ({ slot, isActive, onClick, attendance }) => {
  const yearInfo = getYearInfo(slot.details);
  const isLab = slot.type === 'lab';
  const isFree = slot.isEmpty;

  return (
    <div
      onClick={() => onClick(slot)}
      className={`
        relative mx-4 mb-4 p-5 rounded-2xl transition-all duration-300 cursor-pointer group
        ${isActive
          ? 'bg-zinc-800 border-l-4 border-l-green-500 shadow-xl shadow-black/20 scale-[1.02]'
          : 'bg-zinc-900/50 border border-white/5 hover:bg-zinc-800/80'}
      `}
    >
      <div className="flex gap-4">
        {/* Time Column */}
        <div className="flex flex-col items-center justify-center w-14 border-r border-white/5 pr-4">
          <span className="text-xs font-bold text-zinc-400">{slot.startTime.split(' ')[0]}</span>
          <div className="h-6 w-0.5 bg-white/10 my-1 rounded-full" />
          <span className="text-xs font-bold text-zinc-500">{slot.endTime.split(' ')[0]}</span>
        </div>

        {/* Content Column */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <h3 className={`text-lg font-bold truncate pr-2 ${isActive ? 'text-white' : 'text-zinc-200'}`}>
              {slot.subject}
            </h3>
            {yearInfo && (
              <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide ${yearInfo.bg} ${yearInfo.color} border ${yearInfo.border}`}>
                {yearInfo.label}
              </span>
            )}
          </div>

          {!isFree ? (
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2 text-zinc-400">
                <User size={14} />
                <span className="text-sm font-medium">{slot.staff}</span>
              </div>

              <div className="flex items-center gap-2">
                {attendance && (attendance.present || attendance.absent) && (
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-zinc-950 border border-white/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-xs font-mono text-zinc-300">{attendance.present}</span>
                    <span className="text-zinc-600">/</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span className="text-xs font-mono text-zinc-300">{attendance.absent}</span>
                  </div>
                )}
                <div className={`p-2 rounded-full ${isLab ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                  {isLab ? <Layers size={16} /> : <BookOpen size={16} />}
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-2 text-sm text-zinc-500 font-medium italic">Free Period • Relax</div>
          )}
        </div>
      </div>
    </div>
  );
};

const LunchCard = ({ isActive }) => (
  <div className={`mx-4 mb-4 p-4 rounded-xl border border-dashed border-zinc-700 flex items-center justify-center gap-3 ${isActive ? 'bg-orange-500/10 border-orange-500/30' : 'bg-transparent'}`}>
    <Utensils size={18} className={isActive ? 'text-orange-500' : 'text-zinc-600'} />
    <span className={`text-sm font-bold uppercase tracking-widest ${isActive ? 'text-orange-500' : 'text-zinc-600'}`}>
      Lunch Break {isActive && '• Live'}
    </span>
    <span className="text-xs font-mono text-zinc-600">02:00 - 02:30</span>
  </div>
);

const AttendanceSheet = ({ slot, isOpen, onClose, data, onSave }) => {
  if (!isOpen || !slot) return null;

  const yearInfo = getYearInfo(slot.details);
  const total = yearInfo ? yearInfo.strength : 0;
  const [absent, setAbsent] = useState(data?.absent || '');

  const present = total && absent !== '' ? Math.max(0, total - parseInt(absent || 0)) : (data?.present || '-');

  const handleSave = () => {
    onSave({ absent, present: present === '-' ? 0 : present });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-zinc-900 sm:rounded-3xl rounded-t-3xl border border-white/10 shadow-2xl transform transition-transform animate-slideUp overflow-hidden">
        {/* Handle for mobile */}
        <div className="w-full flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-12 h-1.5 rounded-full bg-zinc-700" />
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Mark Attendance</span>
              <h2 className="text-2xl font-bold text-white mt-1">{slot.subject}</h2>
              <p className="text-sm text-zinc-400 mt-1">{slot.staff}</p>
            </div>
            <button onClick={onClose} className="p-2 bg-zinc-800 rounded-full text-zinc-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <div className="bg-zinc-800/50 rounded-2xl p-4 border border-white/5 mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-zinc-400">Total Strength</span>
              <span className="text-lg font-bold text-white">{total}</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-red-400 uppercase mb-2">Absentees</label>
                <input
                  type="number"
                  autoFocus
                  value={absent}
                  onChange={(e) => setAbsent(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-xl font-mono text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  placeholder="0"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-sm font-medium text-green-400">Present</span>
                <span className="text-2xl font-bold text-white">{present}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full py-4 bg-white text-zinc-950 rounded-xl font-bold text-lg hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
          >
            <Save size={20} />
            Save Record
          </button>
        </div>
      </div>
    </div>
  );
};

const BottomNav = ({ activeView, onViewChange }) => {
  const items = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'stats', icon: BarChart2, label: 'Stats' },
    { id: 'faculty', icon: Briefcase, label: 'Faculty' },
    { id: 'about', icon: Info, label: 'About' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-950/90 backdrop-blur-xl border-t border-white/5 pb-safe pt-2 px-6 z-40">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {items.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-300 ${isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <div className={`p-1.5 rounded-full transition-all ${isActive ? 'bg-white/10' : 'bg-transparent'}`}>
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-medium ${isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [view, setView] = useState('home');
  const [activeTab, setActiveTab] = useState("I");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [now, setNow] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState(() => {
    const saved = localStorage.getItem('attendanceData');
    return saved ? JSON.parse(saved) : {};
  });

  // Timer Logic
  const [timerState, setTimerState] = useState({ label: 'Loading', time: '--:--' });

  useEffect(() => {
    localStorage.setItem('attendanceData', JSON.stringify(attendanceData));
  }, [attendanceData]);

  useEffect(() => {
    const update = () => {
      const d = new Date();
      setNow(d);

      // Timer Logic
      const currentMins = d.getHours() * 60 + d.getMinutes();
      const day = d.getDay();

      if (day === 0) {
        setTimerState({ label: 'Holiday', time: 'No Class' });
        return;
      }

      let target = 0;
      let label = "";

      if (currentMins < 660) { label = "Starts In"; target = 660; }
      else if (currentMins < 720) { label = "Period 1 Ends"; target = 720; }
      else if (currentMins < 780) { label = "Period 2 Ends"; target = 780; }
      else if (currentMins < 840) { label = "Period 3 Ends"; target = 840; }
      else if (currentMins < 870) { label = "Lunch Ends"; target = 870; }
      else if (currentMins < 930) { label = "Period 4 Ends"; target = 930; }
      else if (currentMins < 990) { label = "Period 5 Ends"; target = 990; }
      else { label = "Classes Over"; target = -1; }

      if (target === -1) {
        setTimerState({ label: 'Done for Today', time: '00:00' });
      } else {
        const diff = (target * 60) - (currentMins * 60 + d.getSeconds());
        const h = Math.floor(diff / 3600);
        const m = Math.floor((diff % 3600) / 60);
        const s = diff % 60;
        setTimerState({
          label,
          time: `${h > 0 ? h + ':' : ''}${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`
        });
      }
    };
    const interval = setInterval(update, 1000);
    update();
    return () => clearInterval(interval);
  }, []);

  // Set active tab based on day
  useEffect(() => {
    const day = new Date().getDay();
    const map = ["", "I", "II", "III", "IV", "V", "VI"];
    if (day >= 1 && day <= 6) setActiveTab(map[day]);
  }, []);

  const activeData = timetableData.rows.find(r => r.id === activeTab);
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const isSlotLive = (slot) => {
    const day = now.getDay();
    const map = ["", "I", "II", "III", "IV", "V", "VI"];
    if (map[day] !== activeTab) return false;
    const start = getMinutes(slot.startTime);
    const end = getMinutes(slot.endTime);
    return currentMinutes >= start && currentMinutes < end;
  };

  const isLunchLive = () => {
    const day = now.getDay();
    const map = ["", "I", "II", "III", "IV", "V", "VI"];
    if (map[day] !== activeTab) return false;
    return currentMinutes >= 840 && currentMinutes < 870;
  };

  const getSlotKey = (idx) => getSessionKey(activeTab, idx, activeData.slots);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-24">
      <Header
        currentDate={{
          dayName: now.toLocaleDateString('en-US', { weekday: 'long' }),
          dateStr: now.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
        }}
        onSearch={() => {
          const day = prompt("Enter Day Order (1-6):");
          const map = ["", "I", "II", "III", "IV", "V", "VI"];
          if (day && map[day]) setActiveTab(map[day]);
        }}
      />

      {view === 'home' && (
        <>
          <TabBar
            tabs={timetableData.rows}
            activeTab={activeTab}
            onTabClick={setActiveTab}
          />

          <main className="pt-[140px] max-w-md mx-auto animate-fadeIn">
            <HeroCountdown timeLeft={timerState.time} label={timerState.label} />

            <div className="space-y-1">
              {activeData?.slots.slice(0, 3).map((slot, idx) => (
                <ClassCard
                  key={idx}
                  slot={slot}
                  isActive={isSlotLive(slot)}
                  onClick={() => setSelectedSlot({ ...slot, key: getSlotKey(idx) })}
                  attendance={attendanceData[getSlotKey(idx)]}
                />
              ))}

              <LunchCard isActive={isLunchLive()} />

              {activeData?.slots.slice(3).map((slot, idx) => (
                <ClassCard
                  key={idx + 3}
                  slot={slot}
                  isActive={isSlotLive(slot)}
                  onClick={() => setSelectedSlot({ ...slot, key: getSlotKey(idx + 3) })}
                  attendance={attendanceData[getSlotKey(idx + 3)]}
                />
              ))}
            </div>
          </main>
        </>
      )}

      {view === 'faculty' && (
        <main className="pt-24 px-4 max-w-md mx-auto animate-slideUp">
          <h2 className="text-2xl font-bold mb-6">Faculty Directory</h2>
          <div className="grid gap-4">
            {facultyData.map((fac, i) => (
              <div key={i} className="bg-zinc-900 border border-white/5 p-4 rounded-2xl flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${fac.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                  {fac.initials}
                </div>
                <div>
                  <h3 className="font-bold text-white">{fac.name}</h3>
                  <p className="text-xs text-zinc-400 uppercase tracking-wide font-medium">{fac.role}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {fac.subjects.map((sub, j) => (
                      <span key={j} className="text-[10px] px-2 py-1 bg-white/5 rounded text-zinc-300">{sub}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {view === 'stats' && (
        <main className="pt-24 px-4 max-w-md mx-auto animate-slideUp">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Attendance Stats</h2>
            <button
              onClick={() => { if (confirm('Reset all data?')) setAttendanceData({}); }}
              className="p-2 bg-red-500/10 text-red-400 rounded-full hover:bg-red-500/20"
            >
              <Trash2 size={20} />
            </button>
          </div>

          <div className="grid gap-3">
            {Object.entries(attendanceData).length === 0 ? (
              <div className="text-center py-12 text-zinc-500">No records found.</div>
            ) : (
              Object.entries(attendanceData).map(([key, val]) => (
                <div key={key} className="bg-zinc-900 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                  <span className="font-mono text-zinc-400 text-xs">{key}</span>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <div className="text-xs text-green-500 font-bold">P</div>
                      <div className="font-bold text-xl">{val.present}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-red-500 font-bold">A</div>
                      <div className="font-bold text-xl">{val.absent}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      )}

      {view === 'about' && (
        <main className="pt-24 px-6 max-w-md mx-auto text-center animate-slideUp flex flex-col items-center justify-center min-h-[80vh]">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-white/10 rotate-3">
            <Heart className="text-black fill-black" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Made with Love</h2>
          <p className="text-zinc-400 mb-8">For the Dept of Computer Applications</p>

          <div className="w-full bg-zinc-900 rounded-2xl p-6 border border-white/5 text-left space-y-4">
            <div>
              <p className="text-xs text-zinc-500 uppercase font-bold">Developer</p>
              <p className="text-lg font-medium text-white">Ashok. R</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase font-bold">Developer</p>
              <p className="text-lg font-medium text-white">Santhosh Raj V</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase font-bold">Design</p>
              <p className="text-lg font-medium text-white">Mrs. Deepa S</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase font-bold">Concept</p>
              <p className="text-lg font-medium text-white">Mrs. Seethalakshmi</p>
            </div>
          </div>
          <p className="mt-8 text-xs text-zinc-600 font-mono">v2.0.0 • Google Design Edition</p>
        </main>
      )}

      <AttendanceSheet
        slot={selectedSlot}
        isOpen={!!selectedSlot}
        onClose={() => setSelectedSlot(null)}
        data={selectedSlot ? attendanceData[selectedSlot.key] : null}
        onSave={(data) => {
          setAttendanceData(prev => ({ ...prev, [selectedSlot.key]: data }));
        }}
      />

      <BottomNav activeView={view} onViewChange={setView} />
    </div>
  );
}
