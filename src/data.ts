import { Conversation } from './types';

export const mockConversations: Conversation[] = [
  {
    id: '1',
    wamid: '521234567890',
    phoneNumber: '+52 (123) 456-7890',
    whatsappFullName: 'Juan García López',
    applicationReadiness: 'READY',
    lastUpdated: new Date('2026-06-19T14:30:00'),
    collectedInfo: {
      customerName: 'Juan Carlos García López',
      rfc: 'GARL900101ABC',
      curp: 'GARL900101HDFNNN09',
      residentialAddress: '123 Avenida Paseo, Apt 456, Mexico City, CDMX 06500',
      monthlyIncome: 45000,
      loanAmountRequested: 250000,
      estimatedInterestRate: 8.5,
      creditBureauAuthorization: true,
      documentsReceived: [
        {
          id: 'doc1',
          name: 'ID Front',
          url: 'https://via.placeholder.com/150',
          thumbnail: 'https://via.placeholder.com/100'
        },
        {
          id: 'doc2',
          name: 'Proof of Income',
          url: 'https://via.placeholder.com/150',
          thumbnail: 'https://via.placeholder.com/100'
        }
      ]
    }
  },
  {
    id: '2',
    wamid: '521234567891',
    phoneNumber: '+52 (123) 456-7891',
    whatsappFullName: 'María Rodríguez Sánchez',
    applicationReadiness: 'MISSING',
    lastUpdated: new Date('2026-06-19T13:15:00'),
    collectedInfo: {
      customerName: 'María Rodríguez Sánchez',
      rfc: 'ROSM850515XYZ',
      residentialAddress: '456 Calle Principal, Mexico City, CDMX 06300',
      monthlyIncome: 32000,
      documentsReceived: []
    }
  },
  {
    id: '3',
    wamid: '521234567892',
    phoneNumber: '+52 (123) 456-7892',
    whatsappFullName: 'Carlos Hernández Pérez',
    applicationReadiness: 'EMPTY',
    lastUpdated: new Date('2026-06-19T10:45:00'),
    collectedInfo: {}
  },
  {
    id: '4',
    wamid: '521234567893',
    phoneNumber: '+52 (123) 456-7893',
    whatsappFullName: 'Ana López Martínez',
    applicationReadiness: 'READY',
    lastUpdated: new Date('2026-06-18T16:20:00'),
    collectedInfo: {
      customerName: 'Ana María López Martínez',
      rfc: 'LOMA760823DEF',
      curp: 'LOMA760823MDFRNN07',
      residentialAddress: '789 Boulevard Reforma, Mexico City, CDMX 06500',
      monthlyIncome: 55000,
      loanAmountRequested: 500000,
      estimatedInterestRate: 7.2,
      creditBureauAuthorization: true,
      documentsReceived: [
        {
          id: 'doc3',
          name: 'Passport',
          url: 'https://via.placeholder.com/150'
        },
        {
          id: 'doc4',
          name: 'Bank Statement',
          url: 'https://via.placeholder.com/150'
        }
      ]
    }
  },
  {
    id: '5',
    wamid: '521234567894',
    phoneNumber: '+52 (123) 456-7894',
    whatsappFullName: 'Roberto Díaz González',
    applicationReadiness: 'MISSING',
    lastUpdated: new Date('2026-06-19T11:30:00'),
    collectedInfo: {
      customerName: 'Roberto Díaz González',
      rfc: 'DIAGR920310GHI',
      creditBureauAuthorization: false,
      documentsReceived: []
    }
  }
];
