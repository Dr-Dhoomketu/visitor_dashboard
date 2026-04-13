import { createContext, useContext, useState, ReactNode } from "react";

export type VisitorStatus = "Pending" | "Approved" | "Rejected";

export interface Visitor {
  id: string;
  name: string;
  aadhaar: string;
  phone: string;
  email: string;
  purpose: string;
  meetWith: string;
  status: VisitorStatus;
  date: string;
  time: string;
  photo?: string; // base64 data URL captured from webcam
}

interface VisitorContextType {
  visitors: Visitor[];
  pendingVisitor: Omit<Visitor, "id" | "status" | "date" | "time" | "photo"> | null;
  addVisitor: (visitor: Omit<Visitor, "id" | "status" | "date" | "time" | "photo">) => void;
  confirmVisitorWithPhoto: (photo: string) => void;
  approveVisitor: (id: string) => void;
  rejectVisitor: (id: string) => void;
}

const mockVisitors: Visitor[] = [
  { id: "VIS-001", name: "Alice Johnson", aadhaar: "1234 5678 9012", phone: "555-0101", email: "alice@example.com", purpose: "Meeting", meetWith: "Bob Smith", status: "Approved", date: "2023-10-25", time: "09:00 AM" },
  { id: "VIS-002", name: "Charlie Davis", aadhaar: "9876 5432 1098", phone: "555-0102", email: "charlie@example.com", purpose: "Interview", meetWith: "Carol White", status: "Pending", date: "2023-10-25", time: "10:30 AM" },
  { id: "VIS-003", name: "Diana Prince", aadhaar: "4567 8901 2345", phone: "555-0103", email: "diana@example.com", purpose: "Delivery", meetWith: "Reception", status: "Rejected", date: "2023-10-25", time: "11:15 AM" },
  { id: "VIS-004", name: "Evan Wright", aadhaar: "5678 1234 9012", phone: "555-0104", email: "evan@example.com", purpose: "Meeting", meetWith: "Bob Smith", status: "Approved", date: "2023-10-25", time: "01:00 PM" },
  { id: "VIS-005", name: "Fiona Gallagher", aadhaar: "3456 7890 1234", phone: "555-0105", email: "fiona@example.com", purpose: "Personal", meetWith: "Alice Johnson", status: "Pending", date: "2023-10-25", time: "02:45 PM" },
  { id: "VIS-006", name: "George Bailey", aadhaar: "6789 0123 4567", phone: "555-0106", email: "george@example.com", purpose: "Other", meetWith: "Carol White", status: "Pending", date: "2023-10-25", time: "03:30 PM" },
  { id: "VIS-007", name: "Hannah Abbott", aadhaar: "8901 2345 6789", phone: "555-0107", email: "hannah@example.com", purpose: "Interview", meetWith: "Bob Smith", status: "Approved", date: "2023-10-25", time: "04:00 PM" },
  { id: "VIS-008", name: "Ian Malcolm", aadhaar: "0123 4567 8901", phone: "555-0108", email: "ian@example.com", purpose: "Delivery", meetWith: "Reception", status: "Rejected", date: "2023-10-25", time: "04:45 PM" },
];

const VisitorContext = createContext<VisitorContextType | undefined>(undefined);

export function VisitorProvider({ children }: { children: ReactNode }) {
  const [visitors, setVisitors] = useState<Visitor[]>(mockVisitors);
  const [pendingVisitor, setPendingVisitor] = useState<Omit<Visitor, "id" | "status" | "date" | "time" | "photo"> | null>(null);

  // Step 1: store form data, navigate to webcam
  const addVisitor = (visitorData: Omit<Visitor, "id" | "status" | "date" | "time" | "photo">) => {
    setPendingVisitor(visitorData);
  };

  // Step 2: called from webcam page with the captured photo
  const confirmVisitorWithPhoto = (photo: string) => {
    if (!pendingVisitor) return;
    const newVisitor: Visitor = {
      ...pendingVisitor,
      photo,
      id: `VIS-${String(visitors.length + 1).padStart(3, "0")}`,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setVisitors((prev) => [newVisitor, ...prev]);
    setPendingVisitor(null);
  };

  const approveVisitor = (id: string) => {
    setVisitors(prev => prev.map(v => v.id === id ? { ...v, status: "Approved" } : v));
  };

  const rejectVisitor = (id: string) => {
    setVisitors(prev => prev.map(v => v.id === id ? { ...v, status: "Rejected" } : v));
  };

  return (
    <VisitorContext.Provider value={{ visitors, pendingVisitor, addVisitor, confirmVisitorWithPhoto, approveVisitor, rejectVisitor }}>
      {children}
    </VisitorContext.Provider>
  );
}

export function useVisitors() {
  const context = useContext(VisitorContext);
  if (context === undefined) {
    throw new Error("useVisitors must be used within a VisitorProvider");
  }
  return context;
}
