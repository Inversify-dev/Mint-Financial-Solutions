import { ServiceDetail } from '../lib/cms';

export const mockServices: ServiceDetail[] = [
  {
    id: 'paraplanning',
    title: 'Financial Planning & Paraplanning Support',
    icon: 'FileText',
    shortDesc: 'End-to-end paraplanning, compliance documentation, and advice preparation services tailored for Australian Financial Advisers.',
    fullDesc: 'Our paraplanning services are designed to give Australian financial advisers their time back. We handle the complex compliance, research, and documentation requirements, ensuring your advice is structured perfectly and delivered on time. Our offshore paraplanners are thoroughly trained in Australian regulatory guidelines, AFSL requirements, and industry-standard software.',
    deliverables: [
      'Statement of Advice (SOA) preparation',
      'Record of Advice (ROA) creation',
      'Client scenario modeling & projections',
      'Product research & comparisons (superannuation, insurance, investments)',
      'Implementation paperwork and compliance checks',
      'Fee disclosure statements (FDS) & Opt-in tracking'
    ],
    technologies: ['Xplan', 'Midwinter', 'AdviserLogic', 'Coin', 'Netwealth', 'Hub24']
  },
  {
    id: 'mortgage-services',
    title: 'Mortgage & Loan Processing Services',
    icon: 'Percent',
    shortDesc: 'Comprehensive loan processing from submission to settlement, administrative broker support, and credit analysis.',
    fullDesc: 'Scale your mortgage brokerage without the overhead. Our mortgage support team manages your loan pipeline from initial application entry to final settlement. We handle communications with lenders, gather missing documentation from clients, perform credit policy checks, and ensure files progress quickly through the pipeline.',
    deliverables: [
      'Data entry into CRM platforms (ApplyOnline, Podium, etc.)',
      'Liaising with banks, credit departments, and solicitors',
      'Client document collection, verification, and formatting',
      'Valuation ordering and tracking',
      'Post-approval tracking and settlement coordination',
      'Trail commission auditing and compliance checks'
    ],
    technologies: ['ApplyOnline', 'Podium', 'Flex', 'Salestrekker', 'Equifax']
  },
  {
    id: 'accounting-bookkeeping',
    title: 'Accounting & Bookkeeping Outsourcing',
    icon: 'TrendingUp',
    shortDesc: 'Dedicated accounts preparation, tax compliance support, SMSF administration, and day-to-day bookkeeping.',
    fullDesc: 'Provide your accounting firm with the scalable support needed to manage compliance seasons with ease. Our offshore accounting specialists are trained in Australian tax standards, BAS requirements, and cloud accounting systems. We take care of routine compliance and accounts preparation, allowing your senior staff to focus on strategic client advice.',
    deliverables: [
      'Daily bookkeeping, bank reconciliation, and cash flow tracking',
      'Preparation of Business Activity Statements (BAS) & IAS',
      'Annual financial statements preparation (Companies, Trusts, Partnerships, Individuals)',
      'Self-Managed Super Fund (SMSF) compliance & audit prep',
      'Accounts Payable & Accounts Receivable management',
      'Payroll processing and Single Touch Payroll (STP) setup'
    ],
    technologies: ['Xero', 'MYOB', 'QuickBooks', 'BGL Simple Fund 360', 'Class Super', 'Receipt Bank']
  },
  {
    id: 'property-management',
    title: 'Property & Real Estate Back Office Support',
    icon: 'Home',
    shortDesc: 'Property administration, leasing assistance, maintenance coordination, and real estate bookkeeping services.',
    fullDesc: 'Free your property managers from administrative bottlenecks. We offer dedicated support for Australian real estate and property groups, handling lease agreements, maintenance coordination, tenant communication, utility bills, and rental bookkeeping. Keep your feet on the ground showing properties while we keep the back-office running smoothly.',
    deliverables: [
      'Tenancy application processing and reference checks',
      'Lease agreement preparation and renewal scheduling',
      'Maintenance request logging, dispatching, and vendor coordination',
      'Rental ledger reconciliation and billing updates',
      'Property listings creation across portals (Realestate.com.au, Domain)',
      'Outgoings and utility invoice processing'
    ],
    technologies: ['PropertyMe', 'Rest Professional', 'Console Cloud', 'InspectRealEstate', 'Console Gateway']
  },
  {
    id: 'administration-support',
    title: 'Business & Virtual Administration',
    icon: 'Briefcase',
    shortDesc: 'Calendar management, email triage, CRM maintenance, data entry, and executive virtual assistance.',
    fullDesc: 'Run a leaner, more productive office. Our administrative specialists serve as virtual assistants to manage your operational details. We handle communication sorting, appointment bookings, customer record updates, and other repetitive database tasks that drain your internal resources.',
    deliverables: [
      'Email inbox optimization and calendar management',
      'CRM database cleanup, maintenance, and audit',
      'Document formatting, report generation, and presentation prep',
      'Travel booking and expenses logging',
      'Customer support ticket handling',
      'Ad-hoc business research and spreadsheet management'
    ],
    technologies: ['Salesforce', 'HubSpot', 'Microsoft 365', 'Google Workspace', 'Monday.com', 'Trello', 'Slack']
  },
  {
    id: 'client-support',
    title: 'Client Service Coordination',
    icon: 'Users',
    shortDesc: 'Client onboarding assistance, meeting preparations, phone triage, and inbound response management.',
    fullDesc: 'Create a seamless journey for your clients. Our client service coordinators work side-by-side with your front office, handling client onboarding checklists, sending meeting reminders, verifying personal details, setting up client portals, and coordinating signatures on policy documents.',
    deliverables: [
      'Client onboarding setup and welcome pack delivery',
      'Meeting scheduling, agenda preparation, and post-meeting follow-ups',
      'Digital signature tracking (DocuSign, Adobe Sign)',
      'Client portal navigation support',
      'Data collection and KYC (Know Your Customer) validations',
      'Client review cycle tracking and scheduling'
    ],
    technologies: ['DocuSign', 'Adobe Sign', 'ActiveCampaign', 'HubSpot CRM', 'Xplan Portal']
  }
];
