export type ReadinessStatus = 'EMPTY' | 'MISSING' | 'READY';

export interface CollectedInformation {
  customerName?: string;
  rfc?: string;
  curp?: string;
  residentialAddress?: string;
  monthlyIncome?: number;
  loanAmountRequested?: number;
  estimatedInterestRate?: number;
  creditBureauAuthorization?: boolean;
  documentsReceived?: DocumentItem[];
}

export interface DocumentItem {
  id: string;
  name: string;
  url?: string;
  thumbnail?: string;
}

export interface Conversation {
  id: string;
  wamid: string;
  phoneNumber: string;
  whatsappFullName: string;
  applicationReadiness: ReadinessStatus;
  lastUpdated: Date;
  collectedInfo: CollectedInformation;
}

export interface ConversationPreview {
  id: string;
  wamid: string;
  phoneNumber: string;
  whatsappFullName: string;
  applicationReadiness: ReadinessStatus;
  lastUpdated: Date;
}
