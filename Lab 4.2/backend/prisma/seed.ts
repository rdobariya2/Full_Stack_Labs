import { PrismaClient, type RoleCategory } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Lab 4.2 — seed.
 * Run with: npm run db:seed   (or: npx prisma db seed)
 *
 * Seeds the database with ALL the data previously stored locally:
 * - the 5 departments and 16 employees from employees_dept.json
 *   (Labs 1.1-4.1, previously in-memory in the back-end), and
 * - the 22 roles from Appendix B of the Pixell River case study
 *   (previously in-memory in the back-end).
 *
 * Role assignments are the same mapping as Lab 4.1 — by department,
 * since the case study does not give a role for these 16 names.
 * The seed is idempotent: running it twice does not duplicate rows.
 */

const departments: { id: string; name: string }[] = [
  { id: "dept-executive", name: "Executive & Administration" },
  { id: "dept-it", name: "Information Technology" },
  { id: "dept-banking", name: "Personal & Business Banking" },
  { id: "dept-wealth", name: "Wealth Management & Mortgages" },
  { id: "dept-risk", name: "Risk & Compliance" },
];

const roles: { id: string; title: string; description: string; category: RoleCategory }[] = [
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
  { id: "role-network-admin", title: "Network Administrator", description: "Maintains, troubleshoots and administers LANs, WANs, mainframe networks, workstations and peripheral equipment.", category: "ITS_Security" },
  { id: "role-service-desk-analyst", title: "Service Desk Analyst", description: "First point of contact for customers experiencing technical issues; troubleshoots ATMs, end-user software and hardware, mobile applications and the website.", category: "ITS_Security" },
  { id: "role-infosec-analyst", title: "Information Security Analyst / Specialist", description: "Protects IT infrastructure from intentional or unintentional breaches; detects threats and security events, then reports and resolves them.", category: "ITS_Security" },
];

const employees: { id: string; firstName: string; lastName: string; departmentId: string; roleId: string }[] = [
  { id: "emp-01", firstName: "Eleanor", lastName: "Vance", departmentId: "dept-executive", roleId: "role-ceo" },
  { id: "emp-02", firstName: "Thomas", lastName: "Wright", departmentId: "dept-executive", roleId: "role-coo" },
  { id: "emp-03", firstName: "Gemma", lastName: "Aria", departmentId: "dept-executive", roleId: "role-cfo" },
  { id: "emp-04", firstName: "Sarah", lastName: "Jenkins", departmentId: "dept-it", roleId: "role-director-it" },
  { id: "emp-05", firstName: "Marcus", lastName: "Brody", departmentId: "dept-it", roleId: "role-network-admin" },
  { id: "emp-06", firstName: "David", lastName: "Chen", departmentId: "dept-it", roleId: "role-service-desk-analyst" },
  { id: "emp-07", firstName: "Amina", lastName: "Kaur", departmentId: "dept-it", roleId: "role-infosec-analyst" },
  { id: "emp-08", firstName: "Maria", lastName: "Gonzalez", departmentId: "dept-banking", roleId: "role-vp-client-services" },
  { id: "emp-09", firstName: "James", lastName: "Wilson", departmentId: "dept-banking", roleId: "role-manager-sales" },
  { id: "emp-10", firstName: "Aisha", lastName: "Patel", departmentId: "dept-banking", roleId: "role-manager-customer-experience" },
  { id: "emp-11", firstName: "Lucas", lastName: "Moreau", departmentId: "dept-banking", roleId: "role-manager-marketing" },
  { id: "emp-12", firstName: "Robert", lastName: "Taylor", departmentId: "dept-wealth", roleId: "role-director-financial-audit" },
  { id: "emp-13", firstName: "Linda", lastName: "Martinez", departmentId: "dept-wealth", roleId: "role-manager-internal-audit" },
  { id: "emp-14", firstName: "Sophia", lastName: "Rossi", departmentId: "dept-wealth", roleId: "role-manager-operational-risk" },
  { id: "emp-15", firstName: "Anika", lastName: "Sharma", departmentId: "dept-risk", roleId: "role-manager-risk" },
  { id: "emp-16", firstName: "Alan", lastName: "Turing", departmentId: "dept-risk", roleId: "role-manager-security-architecture" },
];

async function main(): Promise<void> {
  for (const d of departments) {
    await prisma.department.upsert({ where: { id: d.id }, update: { name: d.name }, create: d });
  }
  for (const r of roles) {
    await prisma.role.upsert({ where: { id: r.id }, update: { title: r.title, description: r.description, category: r.category }, create: r });
  }
  for (const e of employees) {
    await prisma.employee.upsert({ where: { id: e.id }, update: { firstName: e.firstName, lastName: e.lastName, departmentId: e.departmentId, roleId: e.roleId }, create: e });
  }
  console.log(`Seeded ${departments.length} departments, ${roles.length} roles, ${employees.length} employees.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
