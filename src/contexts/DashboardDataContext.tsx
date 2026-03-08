import { createContext, useContext, useState, ReactNode } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────

export type Account = {
  id: number; name: string; type: string; assignee: string;
  email: string; phone: string; status: string; balance: string;
};

export type Invoice = {
  id: string; account: string; status: string; assignee: string;
  posted: string; total: number;
};

export type Task = {
  id: number; name: string; account: string; assignee: string;
  priority: string; status: string; dueDate: string;
};

export type DocItem = {
  id: number; name: string; type: "folder" | "document";
  docType?: string; date: string; fileUrl?: string; fileName?: string;
};

// ── Initial seed data (mirrors the mock data in each page) ─────────────────────

const initialAccounts: Account[] = [
  { id: 1, name: "Smith Corporation", type: "Business", assignee: "John Doe", email: "contact@smithcorp.com", phone: "(555) 123-4567", status: "active", balance: "$5,250.00" },
  { id: 2, name: "Johnson LLC", type: "Business", assignee: "Jane Smith", email: "info@johnsonllc.com", phone: "(555) 234-5678", status: "active", balance: "$0.00" },
  { id: 3, name: "Brown & Associates", type: "Business", assignee: "Mike Johnson", email: "hello@brownassoc.com", phone: "(555) 345-6789", status: "active", balance: "$1,200.00" },
  { id: 4, name: "Emily Davis", type: "Individual", assignee: "Sarah Wilson", email: "emily@email.com", phone: "(555) 456-7890", status: "inactive", balance: "$0.00" },
  { id: 5, name: "Wilson Group", type: "Business", assignee: "John Doe", email: "contact@wilsongroup.com", phone: "(555) 567-8901", status: "active", balance: "$3,500.00" },
];

const initialInvoices: Invoice[] = [
  { id: "INV-001", account: "Acme Corp", status: "paid", assignee: "John D.", posted: "2024-01-15", total: 5000 },
  { id: "INV-002", account: "Tech Solutions", status: "unpaid", assignee: "Sarah M.", posted: "2024-01-18", total: 3500 },
  { id: "INV-003", account: "Global Industries", status: "overdue", assignee: "Mike R.", posted: "2024-01-10", total: 8200 },
  { id: "INV-004", account: "StartUp Inc", status: "paid", assignee: "John D.", posted: "2024-01-20", total: 2100 },
  { id: "INV-005", account: "Enterprise Ltd", status: "unpaid", assignee: "Sarah M.", posted: "2024-01-22", total: 6800 },
];

const initialTasks: Task[] = [
  { id: 1, name: "Review Q4 Tax Return", account: "Smith Corporation", assignee: "John Doe", priority: "high", status: "in_progress", dueDate: "2024-01-20" },
  { id: 2, name: "Complete Audit Checklist", account: "Johnson LLC", assignee: "Jane Smith", priority: "medium", status: "open", dueDate: "2024-01-22" },
  { id: 3, name: "Send Invoice Reminder", account: "Brown & Associates", assignee: "Mike Johnson", priority: "low", status: "open", dueDate: "2024-01-18" },
  { id: 4, name: "Prepare Financial Statements", account: "Davis Industries", assignee: "Sarah Wilson", priority: "high", status: "open", dueDate: "2024-01-25" },
  { id: 5, name: "Client Meeting Follow-up", account: "Wilson Group", assignee: "John Doe", priority: "medium", status: "completed", dueDate: "2024-01-15" },
];

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
}

const DashboardDataContext = createContext<DashboardDataContextValue | null>(null);

export const DashboardDataProvider = ({ children }: { children: ReactNode }) => {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [documents, setDocuments] = useState<DocItem[]>([]);

  const addAccount = (a: Omit<Account, "id" | "status" | "balance">) => {
    setAccounts(prev => [...prev, { ...a, id: Date.now(), status: "active", balance: "$0.00" }]);
  };

  const addInvoice = (i: { account: string; amount: number; dueDate: string; assignee: string }) => {
    const nextNum = invoices.length + 1;
    const id = `INV-${String(nextNum).padStart(3, "0")}`;
    setInvoices(prev => [...prev, { id, account: i.account, status: "unpaid", assignee: i.assignee, posted: new Date().toISOString().split("T")[0], total: i.amount }]);
  };

  const addTask = (t: Omit<Task, "id" | "status">) => {
    setTasks(prev => [...prev, { ...t, id: Date.now(), status: "open" }]);
  };

  const addDocument = (d: { name: string; account: string; type: string; file?: File }) => {
    const fileUrl = d.file ? URL.createObjectURL(d.file) : undefined;
    setDocuments(prev => [...prev, {
      id: Date.now(), name: d.name, type: "document", docType: d.type,
      date: new Date().toLocaleDateString(), fileUrl, fileName: d.file?.name,
    }]);
  };

  const addFolder = (name: string) => {
    setDocuments(prev => [...prev, { id: Date.now(), name, type: "folder", date: new Date().toLocaleDateString() }]);
  };

  return (
    <DashboardDataContext.Provider value={{ accounts, addAccount, setAccounts, invoices, addInvoice, setInvoices, tasks, addTask, setTasks, documents, addDocument, addFolder, setDocuments }}>
      {children}
    </DashboardDataContext.Provider>
  );
};

export const useDashboardData = () => {
  const ctx = useContext(DashboardDataContext);
  if (!ctx) throw new Error("useDashboardData must be used inside DashboardDataProvider");
  return ctx;
};
