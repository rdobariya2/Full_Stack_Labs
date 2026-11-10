import type { Role } from "../models/role.model";

/**
 * TEMPORARY DATA — Lab 4.1.
 * Roles are taken from Appendix B of the Pixell River Financial case
 * study. No database is used yet (that is Lab 5); this file is the
 * only place Role data lives, and only the RoleRepository reads it.
 */
export const roles: Role[] = [
  { id: "role-ceo", title: "CEO/Chair of Board", description: "Highest-ranking person in the company, ultimately responsible for making managerial decisions.", category: "Executive" },
  { id: "role-coo", title: "COO/VP Operations", description: "Responsible for executing and implementing the operational directives set by the CEO and the board.", category: "Executive" },
  { id: "role-cfo", title: "CFO/VP Administration", description: "Senior executive with responsibility for the financial affairs of the corporation and its administrative functions.", category: "Executive" },
  { id: "role-cio", title: "CIO", description: "Most senior executive responsible for the information technology and computer systems that support bank goals.", category: "Executive" },
  { id: "role-vp-client-services", title: "VP Client Services", description: "Responsible for the Consumer and Commercial Banking divisions, including lending, investing, risk management, marketing and technology.", category: "Executive" },
  { id: "role-vp-marketing", title: "VP Marketing", description: "Responsible for the overall strategic marketing plans for the organisation, to attract and retain customers.", category: "Executive" },
  { id: "role-director-hr", title: "Director Human Resources", description: "Responsible for organisational development, recruitment and staffing, employment law, performance management and compensation and benefits.", category: "Management" },
  { id: "role-director-financial-audit", title: "Director Financial and Audit Services", description: "Makes sure the company conducts its business in full compliance with all applicable laws, regulations and professional standards.", category: "Management" },
  { id: "role-director-legal", title: "Director Legal Services / General Counsel", description: "Senior executive managing legal affairs for the company.", category: "Management" },
  { id: "role-director-it", title: "Director Information Technology", description: "Manages the IT infrastructure, operations and services, and how they enable access to data and services.", category: "Management" },
  { id: "role-director-infosec", title: "Director Information Security and CISO", description: "Senior-level executive responsible for establishing and maintaining the bank security vision, strategy and program.", category: "Management" },
  { id: "role-director-accounting", title: "Director Accounting", description: "Responsible for analysis and reconciliation of accounts and for accounting policies, procedures and controls.", category: "Management" },
  { id: "role-manager-risk", title: "Manager, Risk Management", description: "Responsible for identifying, assessing and mitigating risks that could jeopardise the organisation's assets, profitability or existence.", category: "Management" },
  { id: "role-manager-internal-audit", title: "Manager, Internal Audit", description: "Performs full audits, including risk management, control management and assessing financial reliability.", category: "Management" },
  { id: "role-manager-operational-risk", title: "Manager, Operational Risk", description: "Responsible for monitoring, handling and measuring operational and economic risk exposures in order to minimise risk.", category: "Management" },
  { id: "role-manager-sales", title: "Manager of Sales", description: "Leads a sales team by providing guidance, training and mentorship, setting quotas and goals and creating sales plans.", category: "Management" },
  { id: "role-manager-customer-experience", title: "Manager, Customer Experience and Community Engagement", description: "Fosters customer loyalty through high-quality interactions at each step, improving the experiences customers have with the organisation.", category: "Management" },
  { id: "role-manager-marketing", title: "Manager, Marketing", description: "Responsible for developing, implementing and executing strategic marketing plans to attract potential customers and retain existing ones.", category: "Management" },
  { id: "role-manager-security-architecture", title: "Manager, Security Architecture", description: "Designs and oversees the implementation of security measures for the organisation's information systems.", category: "Management" },
  { id: "role-network-admin", title: "Network Administrator", description: "Maintains, troubleshoots and administers LANs, WANs, mainframe networks, workstations and peripheral equipment.", category: "ITS & Security" },
  { id: "role-service-desk-analyst", title: "Service Desk Analyst", description: "First point of contact for customers experiencing technical issues; troubleshoots ATMs, end-user software and hardware, mobile applications and the website.", category: "ITS & Security" },
  { id: "role-infosec-analyst", title: "Information Security Analyst / Specialist", description: "Protects IT infrastructure from intentional or unintentional breaches; detects threats and security events, then reports and resolves them.", category: "ITS & Security" },
];
