"use client";

import { Phone, AlertTriangle, X } from "lucide-react";
import { useState } from "react";
import type { CrisisAlertInfo } from "@/types";

interface CrisisAlertProps {
  alert: CrisisAlertInfo;
}

export default function CrisisAlert({ alert }: CrisisAlertProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const isEmergency =
    alert.type === "immediate_danger" ||
    alert.type === "domestic_violence" ||
    alert.type === "self_harm";

  return (
    <div
      className={`rounded-xl border-2 p-4 mb-4 ${
        isEmergency
          ? "bg-red-50 border-red-300 dark:bg-red-950 dark:border-red-800"
          : "bg-amber-50 border-amber-300 dark:bg-amber-950 dark:border-amber-800"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <AlertTriangle
            className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
              isEmergency ? "text-red-600" : "text-amber-600"
            }`}
          />
          <div className="flex-1">
            <p
              className={`text-sm font-semibold mb-2 ${
                isEmergency ? "text-red-800 dark:text-red-200" : "text-amber-800 dark:text-amber-200"
              }`}
            >
              {alert.safetyWarning}
            </p>

            <div className="space-y-2">
              {alert.helplines.map((helpline) => (
                <a
                  key={helpline.number}
                  href={
                    helpline.number.match(/^[0-9-]+$/)
                      ? `tel:${helpline.number.replace(/-/g, "")}`
                      : `https://${helpline.number}`
                  }
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isEmergency
                      ? "bg-red-100 hover:bg-red-200 text-red-800 dark:bg-red-900 dark:hover:bg-red-800 dark:text-red-100"
                      : "bg-amber-100 hover:bg-amber-200 text-amber-800 dark:bg-amber-900 dark:hover:bg-amber-800 dark:text-amber-100"
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span className="font-bold">{helpline.name}: {helpline.number}</span>
                  <span className="text-xs opacity-75 ml-auto">{helpline.available}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="p-1 rounded hover:bg-black/10 flex-shrink-0"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
  );
}
