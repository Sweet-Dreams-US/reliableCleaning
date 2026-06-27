export type ID = string;

export type CustomerStatus = "active" | "prospect" | "paused";
export type Frequency = "Daily" | "Weekly" | "Bi-weekly" | "Monthly" | "One-time";

export interface Customer {
  id: ID;
  name: string;
  contact: string;
  email: string;
  phone: string;
  type: "Commercial" | "Medical" | "Industrial" | "Residential";
  address: string;
  status: CustomerStatus;
  frequency: Frequency;
  monthlyValue: number;
  since: string; // ISO date
  rating: number; // 1-5 satisfaction
  notes?: string;
}

export type StaffRole = "Crew Lead" | "Cleaner" | "Floor Tech" | "Supervisor";
export type StaffStatus = "on-shift" | "off" | "en-route" | "pto";

export interface Staff {
  id: ID;
  name: string;
  role: StaffRole;
  status: StaffStatus;
  phone: string;
  hireDate: string;
  hourlyRate: number;
  rating: number;
  certifications: string[];
  assignedCustomerIds: ID[];
}

export type JobStatus = "scheduled" | "in-progress" | "completed" | "missed";

export interface Job {
  id: ID;
  customerId: ID;
  crewIds: ID[];
  date: string; // ISO date (yyyy-mm-dd)
  start: string; // HH:mm
  end: string; // HH:mm
  service: string;
  status: JobStatus;
  checklistTotal: number;
  checklistDone: number;
}

export type InvoiceStatus = "paid" | "sent" | "overdue" | "draft";

export interface Invoice {
  id: ID;
  number: string;
  customerId: ID;
  amount: number;
  issued: string;
  due: string;
  status: InvoiceStatus;
}

export interface Lead {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  service: string;
  message?: string;
  at: string;
}

export interface AdminState {
  customers: Customer[];
  staff: Staff[];
  jobs: Job[];
  invoices: Invoice[];
}
