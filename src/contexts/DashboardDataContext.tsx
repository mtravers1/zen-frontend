/**
 * DashboardDataContext
 *
 * Provides shared dashboard data (clients/accounts, invoices, tasks, documents)
 * to all dashboard pages. On mount it fetches live data from the Zentavos
 * backend API and falls back to the local dummy/seed data if the backend is
 * unavailable (e.g. during development without a running backend).
 */
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";

// ── Types ──────────────────────────────────────────────────────────────────────

export type Account = {
  id: number | string;
  name: string;
  type: string;
  assignee: string;
  email: string;
  phone: string;
  status: string;
  balance: string | number;
};

export type Invoice = {
  id: string;
  account: string;
  status: string;
  assignee: string;
  posted: string;
  total: number;
};

export type Task = {
  id: number | string;
  name: string;
  account: string;
  assignee: string;
  priority: string;
  status: string;
  dueDate: string;
};

export type DocItem = {
  id: number | string;
  name: string;
  type: "folder" | "document";
  docType?: string;
  date: string;
  fileUrl?: string;
  fileName?: string;
};

// ── Fallback seed data (used when backend is unreachable) ──────────────────────

const fallbackAccounts: Account[] = [
  { id: 1, name: "Smith Corporation",  type: "Business",   assignee: "John Doe",     email: "contact@smithcorp.com",   phone: "(555) 123-4567", status: "active",   balance: "$5,250.00" },
  { id: 2, name: "Johnson LLC",        type: "Business",   assignee: "Jane Smith",   email: "info@johnsonllc.com",     phone: "(555) 234-5678", status: "active",   balance: "$0.00" },
  { id: 3, name: "Brown & Associates", type: "Business",   assignee: "Mike Johnson", email: "hello@brownassoc.com",    phone: "(555) 345-6789", status: "active",   balance: "$1,200.00" },
  { id: 4, name: "Emily Davis",        type: "Individual", assignee: "Sarah Wilson", email: "emily@email.com",         phone: "(555) 456-7890", status: "inactive", balance: "$0.00" },
  { id: 5, name: "Wilson Group",       type: "Business",   assignee: "John Doe",     email: "contact@wilsongroup.com", phone: "(555) 567-8901", status: "active",   balance: "$3,500.00" },
];

const fallbackInvoices: Invoice[] = [
  { id: "INV-001", account: "Acme Corp",       status: "paid",    assignee: "John D.",  posted: "2024-01-15", total: 5000 },
  { id: "INV-002", account: "Tech Solutions",  status: "unpaid",  assignee: "Sarah M.", posted: "2024-01-18", total: 3500 },
  { id: "INV-003", account: "Global Industries",status: "overdue", assignee: "Mike R.",  posted: "2024-01-10", total: 8200 },
  { id: "INV-004", account: "StartUp Inc",     status: "paid",    assignee: "John D.",  posted: "2024-01-20", total: 2100 },
  { id: "INV-005", account: "Enterprise Ltd",  status: "unpaid",  assignee: "Sarah M.", posted: "2024-01-22", total: 6800 },
];

const fallbackTasks: Task[] = [
  { id: 1, name: "Review Q4 Tax Return",         account: "Smith Corporation", assignee: "John Doe",    priority: "high",   status: "in_progress", dueDate: "2024-01-20" },
  { id: 2, name: "Complete Audit Checklist",     account: "Johnson LLC",       assignee: "Jane Smith",  priority: "medium", status: "open",        dueDate: "2024-01-22" },
  { id: 3, name: "Send Invoice Reminder",        account: "Brown & Associates",assignee: "Mike Johnson",priority: "low",    status: "open",        dueDate: "2024-01-18" },
  { id: 4, name: "Prepare Financial Statements", account: "Davis Industries",  assignee: "Sarah Wilson",priority: "high",   status: "open",        dueDate: "2024-01-25" },
  { id: 5, name: "Client Meeting Follow-up",     account: "Wilson Group",      assignee: "John Doe",    priority: "medium", status: "completed",   dueDate: "2024-01-15" },
];

// ── Helper: convert backend record → frontend shape ────────────────────────────

function clientToAccount(c: Record<string, unknown>): Account {
  const balanceCents = typeof c.balance === "number" ? c.balance : 0;
  const balanceDollars = balanceCents / 100;
  return {
    id: String(c._id ?? c.id),
    name: String(c.name ?? ""),
    type: String(c.type ?? "Business"),
    assignee: String(c.assignee ?? ""),
    email: String(c.email ?? ""),
    phone: String(c.phone ?? ""),
    status: String(c.status ?? "active"),
    balance: `$${balanceDollars.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
  };
}

function invoiceToLocal(i: Record<string, unknown>): Invoice {
  return {
    id: String(i.invoiceNumber ?? i._id ?? ""),
    account: String(i.clientName ?? ""),
    status: String(i.status ?? "unpaid"),
    assignee: String(i.assignee ?? ""),
    posted: i.postedDate ? new Date(String(i.postedDate)).toISOString().split("T")[0] : "",
    total: typeof i.total === "number" ? i.total : 0,
  };
}

function taskToLocal(t: Record<string, unknown>): Task {
  return {
    id: String(t._id ?? t.id),
    name: String(t.name ?? ""),
    account: String(t.clientName ?? ""),
    assignee: String(t.assignee ?? ""),
    priority: String(t.priority ?? "medium"),
    status: String(t.status ?? "open"),
    dueDate: t.dueDate ? new Date(String(t.dueDate)).toISOString().split("T")[0] : "",
  };
}

// ── Context ────────────────────────────────────────────────────────────────────

interface DashboardDataContextValue {
  accounts: Account[];
  addAccount: (a: Omit<Account, "id" | "status" | "balance">) => void;
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;

  invoices: Invoice[];
  addInvoice: (i: { account: string; amount: number; dueDate: string; assignee: string }) => void;
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;

  tasks: Task[];
  addTask: (t: Omit<Task, "id" | "status">) => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;

  documents: DocItem[];
  addDocument: (d: { name: string; account: string; type: string; file?: File }) => void;
  addFolder: (name: string) => void;
  setDocuments: React.Dispatch<React.SetStateAction<DocItem[]>>;

  loading: boolean;
}

const DashboardDataContext = createContext<DashboardDataContextValue | null>(null);

// ── Provider ───────────────────────────────────────────────────────────────────

export const DashboardDataProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [accounts, setAccounts] = useState<Account[]>(fallbackAccounts);
  const [invoices, setInvoices] = useState<Invoice[]>(fallbackInvoices);
  const [tasks, setTasks] = useState<Task[]>(fallbackTasks);
  const [documents, setDocuments] = useState<DocItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Helper to make authenticated requests to the backend via Next.js rewrite
  const backendGet = async (path: string) => {
    const token = (session?.user as { backendToken?: string })?.backendToken;
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`/api/backend${path}`, { headers });
    if (!res.ok) throw new Error(`Backend ${res.status}`);
    return res.json();
  };

  // Fetch live data from the backend on mount / when session changes
  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      setLoading(true);
      try {
        const [clientsRes, invoicesRes, tasksRes] = await Promise.allSettled([
          backendGet("/clients?limit=100"),
          backendGet("/invoices?limit=100"),
          backendGet("/tasks-dashboard?limit=100"),
        ]);

        if (cancelled) return;

        if (clientsRes.status === "fulfilled") {
          const data = clientsRes.value;
          const items: Account[] = (data.clients ?? data).map(clientToAccount);
          if (items.length > 0) setAccounts(items);
        }

        if (invoicesRes.status === "fulfilled") {
          const data = invoicesRes.value;
          const items: Invoice[] = (data.invoices ?? data).map(invoiceToLocal);
          if (items.length > 0) setInvoices(items);
        }

        if (tasksRes.status === "fulfilled") {
          const data = tasksRes.value;
          const items: Task[] = (data.tasks ?? data).map(taskToLocal);
          if (items.length > 0) setTasks(items);
        }
      } catch {
        // Backend unavailable → keep fallback data
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    // Only fetch when we have a session (avoids unauthenticated calls)
    if (session) {
      loadData();
    }

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user]);

  // ── Mutation helpers ───────────────────────────────────────────────────────

  const addAccount = async (a: Omit<Account, "id" | "status" | "balance">) => {
    const token = (session?.user as { backendToken?: string })?.backendToken;
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    try {
      const res = await fetch("/api/backend/clients", {
        method: "POST",
        headers,
        body: JSON.stringify({ ...a, balance: 0 }),
      });
      if (res.ok) {
        const created = await res.json();
        setAccounts((prev) => [...prev, clientToAccount(created)]);
        return;
      }
    } catch {
      // fall through
    }
    // Optimistic fallback
    setAccounts((prev) => [
      ...prev,
      { ...a, id: Date.now(), status: "active", balance: "$0.00" },
    ]);
  };

  const addInvoice = async (i: {
    account: string;
    amount: number;
    dueDate: string;
    assignee: string;
  }) => {
    const token = (session?.user as { backendToken?: string })?.backendToken;
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    try {
      const res = await fetch("/api/backend/invoices", {
        method: "POST",
        headers,
        body: JSON.stringify({
          clientName: i.account,
          total: i.amount,
          dueDate: i.dueDate,
          assignee: i.assignee,
          status: "unpaid",
          postedDate: new Date().toISOString(),
        }),
      });
      if (res.ok) {
        const created = await res.json();
        setInvoices((prev) => [invoiceToLocal(created), ...prev]);
        return;
      }
    } catch {
      // fall through
    }
    // Optimistic fallback
    const nextNum = invoices.length + 1;
    const id = `INV-${String(nextNum).padStart(3, "0")}`;
    setInvoices((prev) => [
      ...prev,
      {
        id,
        account: i.account,
        status: "unpaid",
        assignee: i.assignee,
        posted: new Date().toISOString().split("T")[0],
        total: i.amount,
      },
    ]);
  };

  const addTask = async (t: Omit<Task, "id" | "status">) => {
    const token = (session?.user as { backendToken?: string })?.backendToken;
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    try {
      const res = await fetch("/api/backend/tasks-dashboard", {
        method: "POST",
        headers,
        body: JSON.stringify({
          name: t.name,
          clientName: t.account,
          assignee: t.assignee,
          priority: t.priority,
          dueDate: t.dueDate,
          status: "open",
        }),
      });
      if (res.ok) {
        const created = await res.json();
        setTasks((prev) => [...prev, taskToLocal(created)]);
        return;
      }
    } catch {
      // fall through
    }
    // Optimistic fallback
    setTasks((prev) => [...prev, { ...t, id: Date.now(), status: "open" }]);
  };

  const addDocument = (d: {
    name: string;
    account: string;
    type: string;
    file?: File;
  }) => {
    const fileUrl = d.file ? URL.createObjectURL(d.file) : undefined;
    setDocuments((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: d.name,
        type: "document",
        docType: d.type,
        date: new Date().toLocaleDateString(),
        fileUrl,
        fileName: d.file?.name,
      },
    ]);
  };

  const addFolder = (name: string) => {
    setDocuments((prev) => [
      ...prev,
      { id: Date.now(), name, type: "folder", date: new Date().toLocaleDateString() },
    ]);
  };

  return (
    <DashboardDataContext.Provider
      value={{
        accounts,
        addAccount,
        setAccounts,
        invoices,
        addInvoice,
        setInvoices,
        tasks,
        addTask,
        setTasks,
        documents,
        addDocument,
        addFolder,
        setDocuments,
        loading,
      }}
    >
      {children}
    </DashboardDataContext.Provider>
  );
};

export const useDashboardData = () => {
  const ctx = useContext(DashboardDataContext);
  if (!ctx) throw new Error("useDashboardData must be used inside DashboardDataProvider");
  return ctx;
};
