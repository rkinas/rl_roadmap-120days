import React, { useState } from 'react';
import { 
  BookOpen, 
  Code, 
  Cpu, 
  FileText, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  GraduationCap,
  FlaskConical,
  Play,
  Clock,
  Github,
  Award,
  ExternalLink,
  Link as LinkIcon,
  Info,
  Terminal,
  Zap,
  Layers,
  Brain
} from 'lucide-react';
import { ROADMAP, CAPSTONES, STRATEGY_CONTENT } from '../constants';
import { WeekPlan } from '../types';

const WeekAccordionItem: React.FC<{ 
  plan: WeekPlan; 
  isOpen: boolean; 
  isCompleted: boolean;
  onToggle: () => void; 
  onMarkComplete: (e: React.MouseEvent) => void;
}> = ({ plan, isOpen, isCompleted, onToggle, onMarkComplete }) => {
  return (
    <div className={`group relative mb-6 transition-all duration-500 ${
      isOpen ? 'scale-[1.02] z-10' : 'hover:scale-[1.01] z-0'
    }`}>
      {/* Glass Card Background */}
      <div className={`absolute inset-0 rounded-2xl backdrop-blur-xl border transition-all duration-500 ${
        isOpen 
          ? 'bg-slate-900/80 border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)]' 
          : 'bg-slate-900/40 border-white/5 hover:border-white/10 hover:bg-slate-900/60'
      }`} />

      {/* Content Container */}
      <div className="relative overflow-hidden rounded-2xl">
        {/* Header */}
        <div 
          onClick={onToggle}
          className="p-6 flex items-center justify-between cursor-pointer select-none"
        >
          <div className="flex items-center gap-5">
            {/* Week Number Badge */}
            <div className={`relative w-14 h-14 rounded-xl flex items-center justify-center font-mono text-xl font-bold transition-all duration-500 ${
              isCompleted 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                : (isOpen 
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                    : 'bg-white/5 text-slate-400 border border-white/5 group-hover:border-white/10')
            }`}>
              {plan.week}
              {/* Connecting Line (Visual only) */}
              <div className={`absolute -bottom-10 w-0.5 h-10 transition-colors duration-500 ${
                isOpen ? 'bg-cyan-500/30' : 'bg-white/5'
              } ${plan.week === 17 ? 'hidden' : ''}`} />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${
                  isCompleted ? 'text-emerald-400' : 'text-slate-500'
                }`}>
                  {isCompleted ? 'MODULE COMPLETED' : `WEEK ${plan.week}`}
                </span>
                {isCompleted && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
              </div>
              <h3 className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
                isOpen ? 'text-white' : 'text-slate-300 group-hover:text-white'
              }`}>
                {plan.title}
              </h3>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onMarkComplete(e);
              }}
              className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
                isCompleted 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20' 
                  : 'bg-white/5 text-slate-400 border-white/10 hover:border-cyan-500/30 hover:text-cyan-400 hover:bg-cyan-500/5'
              }`}
            >
              {isCompleted ? 'Finished' : 'Mark Done'}
            </button>
            <div className={`p-2 rounded-full transition-all duration-300 ${
              isOpen ? 'bg-cyan-500/20 text-cyan-400 rotate-180' : 'text-slate-500 group-hover:text-slate-300'
            }`}>
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        <div className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}>
          <div className="overflow-hidden">
            <div className="px-6 pb-8 pt-2 border-t border-white/5">
              {/* Goal Quote */}
              <div className="mb-8 relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-purple-500 rounded-full" />
                <p className="pl-6 text-lg text-slate-300 italic font-light leading-relaxed">
                  "{plan.goal}"
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Theory Section */}
                  <section className="bg-blue-950/30 p-5 rounded-xl border border-blue-500/20 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="w-4 h-4 text-blue-400" />
                      <h4 className="font-bold text-blue-200 uppercase text-[10px] tracking-widest">Theory Backbone</h4>
                    </div>
                    <ul className="space-y-3">
                      {plan.theory.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-300 font-medium leading-relaxed">
                          <div className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* JAX Section */}
                  <section className="bg-purple-950/30 p-5 rounded-xl border border-purple-500/20 backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-10">
                      <Cpu className="w-24 h-24 text-purple-500" />
                    </div>
                    <div className="flex items-center gap-2 mb-4 relative z-10">
                      <Zap className="w-4 h-4 text-purple-400" />
                      <h4 className="font-bold text-purple-200 uppercase text-[10px] tracking-widest">JAX Immersion</h4>
                    </div>
                    <ul className="space-y-3 relative z-10">
                      {plan.jaxFocus.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-300 font-medium leading-relaxed">
                          <div className="mt-1.5 w-1.5 h-1.5 bg-purple-500 rounded-full shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                  
                  {/* Resources Section */}
                  <section className="bg-slate-800/30 p-5 rounded-xl border border-white/5 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <LinkIcon className="w-4 h-4 text-slate-400" />
                      <h4 className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">DeepMind Scholar Resources</h4>
                    </div>
                    <div className="space-y-2">
                      {plan.resources?.map((res, i) => (
                        <a 
                          key={i} 
                          href={res.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all group/res"
                        >
                          <span className="text-xs font-bold text-slate-300 group-hover/res:text-cyan-400">{res.title}</span>
                          <ExternalLink className="w-3 h-3 text-slate-500 group-hover/res:text-cyan-500" />
                        </a>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Implementation Section */}
                  <section className="bg-emerald-950/30 p-5 rounded-xl border border-emerald-500/20 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      <h4 className="font-bold text-emerald-200 uppercase text-[10px] tracking-widest">Implementation Lab</h4>
                    </div>
                    <ul className="space-y-3">
                      {plan.implementation.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-300 font-medium leading-relaxed">
                          <div className="mt-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                          <span className="font-mono text-xs">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Papers Section */}
                  <section className="bg-orange-950/30 p-5 rounded-xl border border-orange-500/20 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="w-4 h-4 text-orange-400" />
                      <h4 className="font-bold text-orange-200 uppercase text-[10px] tracking-widest">Primary Literature</h4>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[9px] font-black text-orange-500 uppercase mb-3 tracking-widest flex items-center gap-2">
                          <span className="w-1 h-1 bg-orange-500 rounded-full"></span> Must Read
                        </p>
                        <div className="space-y-3">
                          {plan.papers.must.map((paper, i) => (
                            <div key={i} className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20 hover:bg-orange-500/20 transition-colors">
                              <p className="text-sm font-bold text-orange-100 leading-snug mb-1">{paper.title}</p>
                              <p className="text-[10px] text-orange-400 font-mono">{paper.authors} — {paper.year}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      {plan.papers.optional.length > 0 && (
                        <div>
                          <p className="text-[9px] font-black text-slate-500 uppercase mb-2 tracking-widest flex items-center gap-2">
                            <span className="w-1 h-1 bg-slate-500 rounded-full"></span> Optional
                          </p>
                          <div className="space-y-2 pl-1">
                            {plan.papers.optional.map((paper, i) => (
                              <p key={i} className="text-[11px] text-slate-400 font-medium italic opacity-80 leading-tight hover:text-slate-300 transition-colors">
                                • {paper.title} ({paper.year})
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </section>

                  {/* Control Questions */}
                  <section className="bg-indigo-950/30 p-5 rounded-xl border border-indigo-500/20 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <FlaskConical className="w-4 h-4 text-indigo-400" />
                      <h4 className="font-bold text-indigo-200 uppercase text-[10px] tracking-widest">Control Questions</h4>
                    </div>
                    <div className="space-y-3">
                      {plan.controlQuestions.map((q, i) => (
                        <div key={i} className="flex gap-3 bg-indigo-500/5 p-3 rounded-lg border border-indigo-500/10">
                          <span className="text-[10px] font-black text-indigo-400 mt-0.5">{i+1}</span>
                          <p className="text-xs text-indigo-100 leading-relaxed font-medium opacity-90">{q}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [openWeek, setOpenWeek] = useState<number | null>(1);
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([]);

  const toggleWeek = (week: number) => {
    setOpenWeek(openWeek === week ? null : week);
  };

  const toggleComplete = (week: number) => {
    if (completedWeeks.includes(week)) {
      setCompletedWeeks(completedWeeks.filter(w => w !== week));
    } else {
      setCompletedWeeks([...completedWeeks, week]);
    }
  };

  const progress = Math.round((completedWeeks.length / ROADMAP.length) * 100);

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-16 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-cyan-400 mb-4 backdrop-blur-sm">
            <Brain className="w-3 h-3" />
            <span>DEEPMIND INSPIRED CURRICULUM</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-4">
            RL: From Zero to Hero
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
            A comprehensive <span className="text-white font-medium">120-day research roadmap</span> designed to take you from fundamentals to professional RL researcher level.
          </p>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mt-8 bg-slate-800/50 rounded-full h-2 overflow-hidden backdrop-blur-sm border border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(6,182,212,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs font-mono text-slate-500 mt-2 uppercase tracking-widest">
            {progress}% COMPLETE • {completedWeeks.length}/{ROADMAP.length} MODULES
          </p>
        </header>

        {/* Strategy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl backdrop-blur-sm hover:bg-slate-900/60 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 border border-blue-500/20">
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Daily Routine</h3>
            <ul className="space-y-2">
              {STRATEGY_CONTENT.daily.map((item, i) => (
                <li key={i} className="text-xs text-slate-400 flex justify-between border-b border-white/5 pb-1 last:border-0">
                  <span>{item.task.split(':')[0]}</span>
                  <span className="font-mono text-blue-400">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl backdrop-blur-sm hover:bg-slate-900/60 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 border border-purple-500/20">
              <Layers className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Repo Rules</h3>
            <ul className="space-y-2">
              {STRATEGY_CONTENT.repoRules.map((rule, i) => (
                <li key={i} className="text-xs text-slate-400 leading-relaxed flex gap-2">
                  <span className="text-purple-500">•</span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl backdrop-blur-sm hover:bg-slate-900/60 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 border border-emerald-500/20">
              <Terminal className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">JAX Strategy</h3>
            <ul className="space-y-2">
              {STRATEGY_CONTENT.jaxStrategy.slice(0, 4).map((item, i) => (
                <li key={i} className="text-xs text-slate-400 leading-relaxed flex gap-2">
                  <span className="text-emerald-500">➜</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Roadmap */}
        <div className="space-y-2">
          {ROADMAP.map((plan) => (
            <WeekAccordionItem
              key={plan.week}
              plan={plan}
              isOpen={openWeek === plan.week}
              isCompleted={completedWeeks.includes(plan.week)}
              onToggle={() => toggleWeek(plan.week)}
              onMarkComplete={() => toggleComplete(plan.week)}
            />
          ))}
        </div>

        {/* Capstones Section */}
        <div className="mt-24 mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
            <h2 className="text-2xl font-black uppercase tracking-widest text-white flex items-center gap-3">
              <Award className="w-6 h-6 text-yellow-500" />
              Capstone Projects
            </h2>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {CAPSTONES.map((capstone) => (
              <div key={capstone.id} className="group relative bg-slate-900/40 border border-white/5 p-6 rounded-2xl backdrop-blur-sm hover:bg-slate-900/60 hover:border-yellow-500/30 transition-all duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <GraduationCap className="w-24 h-24 text-yellow-500" />
                </div>
                
                <div className="relative z-10">
                  <div className="inline-block px-2 py-1 rounded bg-yellow-500/10 border border-yellow-500/20 text-[10px] font-bold text-yellow-500 uppercase tracking-wider mb-4">
                    Track {capstone.id}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight">{capstone.title}</h3>
                  <p className="text-xs text-slate-400 mb-4 italic">"{capstone.hypothesis}"</p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Baselines</p>
                      <div className="flex flex-wrap gap-1">
                        {capstone.baselines.map((b, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-slate-300 border border-white/5">
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">JAX Angle</p>
                      <p className="text-xs text-slate-300 leading-relaxed">{capstone.jaxAngle}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-slate-600 text-sm py-12 border-t border-white/5">
          <p className="mb-2">Designed for the next generation of RL Researchers.</p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <a href="#" className="hover:text-cyan-400 transition-colors"><Github className="w-5 h-5" /></a>
            <a href="#" className="hover:text-cyan-400 transition-colors"><ExternalLink className="w-5 h-5" /></a>
          </div>
        </footer>
      </div>
    </div>
  );
}
