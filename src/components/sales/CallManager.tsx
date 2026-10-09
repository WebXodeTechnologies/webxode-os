"use client";

import React, { useState } from "react";
import { Phone, PhoneCall, PhoneForwarded, Mic } from "lucide-react";
import { toast } from "react-hot-toast";

export function CallManager() {
  const [isCalling, setIsCalling] = useState(false);

  const toggleCall = () => {
    setIsCalling(!isCalling);
    if (!isCalling) {
      toast.success("Initiating secure VOIP call...");
    } else {
      toast("Call ended. Duration: 04:12", { icon: "📞" });
    }
  };

  return (
    <div className="space-y-4 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs">
      <div>
        <h3 className="text-sm font-black text-slate-900">Communication Hub</h3>
        <p className="text-xs font-semibold text-slate-500">Integrated Calling & Lead Nurturing</p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 p-6">
        <div
          className={`relative flex h-16 w-16 items-center justify-center rounded-full ${isCalling ? "animate-pulse bg-emerald-100 text-emerald-600" : "bg-indigo-100 text-indigo-600"}`}
        >
          {isCalling ? <PhoneForwarded className="h-6 w-6" /> : <Phone className="h-6 w-6" />}
          {isCalling && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white">
              <Mic className="h-2 w-2 text-white" />
            </span>
          )}
        </div>
        <p className="mt-3 text-sm font-black text-slate-900">
          {isCalling ? "Connected: 04:12" : "Ready to Call"}
        </p>
        <p className="text-xs font-bold text-slate-400">
          {isCalling ? "Recording Active" : "Click below to dial via Webxode VOIP"}
        </p>
      </div>

      <button
        type="button"
        onClick={toggleCall}
        className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-extrabold text-white shadow-md transition active:scale-95 ${
          isCalling ? "bg-rose-600 hover:bg-rose-700" : "bg-emerald-600 hover:bg-emerald-700"
        }`}
      >
        <PhoneCall className="h-4 w-4" />
        {isCalling ? "End Call & Save Recording" : "Start Call"}
      </button>
    </div>
  );
}
