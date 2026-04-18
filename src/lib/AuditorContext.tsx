import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type AuditState = {
  monthlyLeads: number;
  caseValue: number;
  responseMinutes: number;
  monthlyBleed: number;
  hasRun: boolean;
  updatedAt: number;
};

const DEFAULT: AuditState = {
  monthlyLeads: 40,
  caseValue: 5000,
  responseMinutes: 47,
  monthlyBleed: 14200,
  hasRun: false,
  updatedAt: 0,
};

const STORAGE_KEY = 'processa_audit_state_v1';

type Ctx = {
  state: AuditState;
  setState: (s: AuditState) => void;
};

const AuditorContext = createContext<Ctx | null>(null);

export function AuditorProvider({ children }: { children: ReactNode }) {
  const [state, setStateRaw] = useState<AuditState>(DEFAULT);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as AuditState;
        if (parsed && typeof parsed.monthlyBleed === 'number') {
          setStateRaw(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const setState = (s: AuditState) => {
    setStateRaw(s);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    } catch {
      // ignore
    }
  };

  return (
    <AuditorContext.Provider value={{ state, setState }}>
      {children}
    </AuditorContext.Provider>
  );
}

export function useAuditor() {
  const ctx = useContext(AuditorContext);
  if (!ctx) throw new Error('useAuditor must be used within AuditorProvider');
  return ctx;
}

export function formatGBP(n: number) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(n);
}
