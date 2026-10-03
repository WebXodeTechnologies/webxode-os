"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

interface PasswordInputProps {
  id?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  showStrengthMeter?: boolean;
  autoComplete?: string;
}

export function PasswordInput({
  id = "password",
  value,
  onChange,
  placeholder = "••••••••",
  label = "Password",
  required = true,
  showStrengthMeter = false,
  autoComplete = "current-password",
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  // Strength score calculation (0 - 4)
  const getStrength = (pass: string) => {
    let score = 0;
    if (!pass) return score;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const strength = getStrength(value);

  const getStrengthInfo = (score: number) => {
    switch (score) {
      case 0:
        return { label: "Very Weak", color: "bg-rose-500", text: "text-rose-400" };
      case 1:
        return { label: "Weak", color: "bg-amber-500", text: "text-amber-400" };
      case 2:
        return { label: "Medium", color: "bg-yellow-400", text: "text-yellow-400" };
      case 3:
        return { label: "Strong", color: "bg-emerald-400", text: "text-emerald-400" };
      case 4:
        return { label: "Bulletproof", color: "bg-indigo-400", text: "text-indigo-400" };
      default:
        return { label: "", color: "bg-slate-800", text: "text-slate-500" };
    }
  };

  const strengthInfo = getStrengthInfo(strength);

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-bold tracking-wider text-slate-300 uppercase"
        >
          {label}
        </label>
      )}

      <div className="group relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500 transition-colors group-focus-within:text-indigo-400">
          <Lock className="h-4 w-4" />
        </div>
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-slate-800 bg-slate-950/90 py-3.5 pr-11 pl-10 text-sm text-white placeholder-slate-600 shadow-inner transition-all duration-200 focus:border-indigo-500 focus:bg-slate-900 focus:ring-4 focus:ring-indigo-500/20 focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1}
          className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 transition-all hover:text-white focus:outline-none"
          title={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-4.5 w-4.5 text-indigo-400 transition-transform duration-200 hover:scale-110" />
          ) : (
            <Eye className="h-4.5 w-4.5 text-slate-500 transition-transform duration-200 hover:scale-110" />
          )}
        </button>
      </div>

      {showStrengthMeter && value.length > 0 && (
        <div className="animate-in fade-in mt-2 space-y-2 rounded-2xl border border-slate-800/80 bg-slate-950/70 p-3.5 backdrop-blur-md duration-200">
          <div className="flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1 font-semibold text-slate-400">
              <Sparkles className="h-3 w-3 text-indigo-400" /> Security Evaluation:
            </span>
            <span className={`font-extrabold tracking-wider uppercase ${strengthInfo.text}`}>
              {strengthInfo.label}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`h-2 rounded-full transition-all duration-500 ${
                  strength >= step ? strengthInfo.color : "bg-slate-800/80"
                }`}
              />
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
            <span
              className={`flex items-center gap-1 rounded-md border px-2 py-0.5 font-medium ${
                value.length >= 6
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                  : "border-slate-800 bg-slate-900 text-slate-500"
              }`}
            >
              <CheckCircle2 className="h-3 w-3" /> Min 6 chars
            </span>

            <span
              className={`flex items-center gap-1 rounded-md border px-2 py-0.5 font-medium ${
                /[0-9]/.test(value) && /[^A-Za-z0-9]/.test(value)
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                  : "border-slate-800 bg-slate-900 text-slate-500"
              }`}
            >
              <ShieldCheck className="h-3 w-3" /> Numbers & Symbols
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
