export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  year: string;
  role: string;
  technologies: string[];
  image: string;
  features: string[];
  highlights: string[];
  problem: string;
  solution: string;
  challenges: string;
  result: string;
  process: string[];
  liveUrl: string;
  githubUrl: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "01",
    slug: "kemi-faiba",
    title: "KEMI-FAIBA",
    description: "Business & SMS Management Platform",
    category: "Web Application",
    year: "2026",
    role: "Full-Stack Developer",
    technologies: ["Next.js", "TypeScript", "Prisma", "TiDB", "SMS API"],
    image: "/images/kemi-faiba.jpg",
    features: [
      "Customer management",
      "SMS campaign builder",
      "Contact segmentation",
      "Delivery analytics",
      "Subscription management",
    ],
    highlights: [
      "Direct integration with local Tanzanian SMS gateways, with automatic retry on failed deliveries",
      "Contacts can be segmented into groups and targeted with scheduled bulk campaigns",
      "Delivery reports are tracked per campaign so businesses know exactly which messages arrived",
    ],
    problem:
      "Local businesses struggled to stay connected with their customers. Existing communication tools were either too complex, built for large enterprises, or lacked the local integration needed for regional telecom providers. There was no simple way to manage customer records and send targeted SMS campaigns.",
    solution:
      "KEMI-FAIBA is a straightforward web platform for managing customer records and running bulk SMS campaigns. A fast Next.js frontend sits on a reliable backend, letting businesses import contacts, segment them, schedule messages and track delivery, all in one place.",
    challenges:
      "Integrating with local SMS gateways meant handling inconsistent delivery reports and building retry logic that worked reliably. Storing and querying large contact lists also needed careful data modelling with proper indexing and pagination.",
    result:
      "A working platform that gives small businesses the communication tools they need, without the cost or complexity of enterprise software.",
    process: [
      "Requirement gathering and workflow mapping",
      "Designing the data model with Prisma and TiDB",
      "Building the REST API layer",
      "Integrating the SMS gateway and webhooks",
      "Developing the admin interface in Next.js",
      "Testing, deployment and training",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/azamasoud",
  },
  {
    id: "02",
    slug: "skymap",
    title: "SKYMAP",
    description: "Live Flight Tracking & Travel Information Platform",
    category: "Web Application",
    year: "2026",
    role: "Full-Stack Developer",
    technologies: ["Next.js", "TypeScript", "Leaflet", "REST APIs"],
    image: "/images/afya-lead.jpg",
    features: [
      "Live flight tracking on an interactive map",
      "Search flights by route, airline or airport",
      "Flight status and schedule information",
      "Airport details and route search",
      "Mobile-friendly responsive interface",
    ],
    highlights: [
      "Aircraft positions refresh continuously on an interactive Leaflet map without freezing the page",
      "Data from multiple aviation sources is normalised into one fast, unified search",
      "Works smoothly on phones and slow networks, not just desktop browsers",
    ],
    problem:
      "Travellers and aviation enthusiasts lacked a simple, fast way to see live flight information and explore routes. Existing tools were slow, cluttered with ads, or buried key information behind complex interfaces.",
    solution:
      "SKYMAP is a simple flight tracking and travel information platform. An interactive map shows live flights, while search lets users find flights, routes and airport details quickly on any device.",
    challenges:
      "Handling high-frequency live updates without jank required efficient client-side state management and careful map rendering. Normalising data from multiple aviation sources into one fast search index was also demanding.",
    result:
      "A fast, easy-to-use platform that makes live flight information genuinely useful for travellers and enthusiasts.",
    process: [
      "Researching aviation data sources and APIs",
      "Designing the map and search experience",
      "Building the live tracking engine",
      "Optimising map rendering for smooth updates",
      "Testing across devices and networks",
      "Deployment and monitoring",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/azamasoud",
  },
  {
    id: "03",
    slug: "salasjuice",
    title: "SALASJUICE",
    description: "Juice Ordering & Recurring Delivery Platform",
    category: "Web Platform",
    year: "2024",
    role: "Full-Stack Developer",
    technologies: ["Next.js", "TypeScript", "Prisma", "SMS Integration"],
    image: "/images/salas.jpg",
    features: [
      "Product catalogue",
      "Order management",
      "Recurring delivery plans",
      "SMS order confirmations",
      "Customer accounts",
    ],
    highlights: [
      "Customers can set up weekly or monthly recurring juice deliveries that renew automatically",
      "Every order is confirmed over SMS, so customers without smartphones are never left out",
      "The business owner manages the catalogue and sees incoming orders from one simple dashboard",
    ],
    problem:
      "A local juice business wanted to move beyond phone and walk-in orders. Customers needed a simple way to place orders and set up recurring deliveries, while the business needed a reliable way to confirm orders, even for customers without smartphones.",
    solution:
      "SALASJUICE is an ordering platform with a clean product catalogue, recurring delivery plans and SMS order confirmations. Orders are confirmed over SMS, so every customer is reached wherever they are.",
    challenges:
      "Making the whole ordering flow work over SMS meant handling confirmation replies and keeping the recurring delivery schedule reliable, all without complicating the interface.",
    result:
      "A platform that brings ordering up to date while keeping the business approachable for every customer, tech-savvy or not.",
    process: [
      "Understanding the ordering and delivery flow",
      "Designing the catalogue and order model",
      "Building the web storefront",
      "Integrating SMS confirmations",
      "Implementing recurring delivery logic",
      "Testing and deployment",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/azamasoud",
  },
  {
    id: "04",
    slug: "doctor-portal",
    title: "DOCTOR PORTAL",
    description: "Health Clinic Management & Appointment Booking Portal",
    category: "Web Platform",
    year: "2025",
    role: "Full-Stack Developer",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    image: "/images/childcare.jpg",
    features: [
      "Online appointment booking",
      "Doctor and clinic profiles",
      "Patient records and history",
      "Appointment reminders",
      "Clinic dashboard for staff",
    ],
    highlights: [
      "Patients can find a doctor, book a slot and manage their records without calling the clinic",
      "Automatic appointment reminders help clinics cut down on missed visits and long queues",
      "Staff get a private dashboard with role-based access, keeping patient data protected",
    ],
    problem:
      "Clinics relied on walk-ins, phone calls and paper records, making it hard for patients to book appointments and for staff to manage daily schedules. Long queues and missed appointments were common.",
    solution:
      "DOCTOR PORTAL is an online booking and clinic management platform. Patients can find a doctor, book an appointment and manage their records online, while clinic staff get a dashboard that keeps the whole schedule organised.",
    challenges:
      "Balancing patient privacy with an easy booking flow meant designing careful access control and data handling. Keeping appointment availability up to date across multiple doctors was also challenging.",
    result:
      "A portal that reduces queues, cuts missed appointments and gives clinics a clear, organized way to run their daily operations.",
    process: [
      "Interviewing clinic staff and patients",
      "Designing the booking and scheduling model",
      "Building patient-facing booking flows",
      "Developing the clinic staff dashboard",
      "Implementing reminders and notifications",
      "Deployment and staff training",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/azamasoud",
  },
  {
    id: "05",
    slug: "department-management",
    title: "DEPARTMENT MANAGEMENT",
    description: "Academic Department & Faculty Administration System",
    category: "Web Application",
    year: "2025",
    role: "Full-Stack Developer",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    image: "/images/projects/department-management.svg",
    featured: true,
    features: [
      "Department and faculty directory",
      "Programme and course allocation",
      "Staff assignment and workload tracking",
      "Cohort and enrolment listings",
      "Reporting and data export",
    ],
    highlights: [
      "The whole faculty is organised as one clear hierarchy, so administrators can see every department, programme and unit in a single place",
      "Staff assignments and teaching workloads are recorded against each academic unit, removing manual tracking spreadsheets",
      "Reports can be filtered and exported so department heads get the numbers they need without asking IT",
    ],
    problem:
      "Academic administration was spread across spreadsheets, printed registers and informal messages. Departments had no shared, dependable record of their programmes, staff assignments or cohorts, so reporting took days and information was often out of date.",
    solution:
      "A centralised web platform that models the faculty as a hierarchy. Departments, programmes, courses, staff and cohorts are managed in one place, with role-based access so each administrative level only sees and edits what it should.",
    challenges:
      "Modelling a deeply nested academic structure without duplicating records meant careful relational design. Different user levels needed different views of the same data, which required thorough permission handling and validation on every write.",
    result:
      "One dependable source of truth for academic administration, cutting manual record keeping and making department reporting a matter of minutes.",
    process: [
      "Studying the faculty structure and admin workflow",
      "Designing the relational data model",
      "Building authentication and role-based access",
      "Developing department and programme management",
      "Adding reporting and export",
      "Deployment, migration and staff training",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/azamasoud",
  },
  {
    id: "06",
    slug: "udom-sms-reminder",
    title: "UDOM REMINDER",
    description: "Automated SMS Reminder Service for University Students",
    category: "Web Application",
    year: "2025",
    role: "Full-Stack Developer",
    technologies: ["Node.js", "TypeScript", "SMS API", "PostgreSQL"],
    image: "/images/projects/udom-sms-reminder.svg",
    featured: true,
    features: [
      "Scheduled reminder campaigns",
      "Personalised message templates",
      "Delivery status and webhook tracking",
      "Automatic retry on failure",
      "Contact list management",
      "Campaign history and audit log",
    ],
    highlights: [
      "Reminders are scheduled once and sent automatically, so important dates are never announced late or forgotten",
      "Delivery reports come back from the gateway, and failed messages are retried instead of silently lost",
      "Messages can be personalised per recipient, which makes communication feel direct rather than automated",
    ],
    problem:
      "Announcements were sent manually, one by one, whenever fees, examinations or registration deadlines approached. Messages were forgotten, replies were hard to track, and there was no record of who had actually received what.",
    solution:
      "A scheduling service where an administrator uploads or selects a contact list, writes a message with optional personal details, and sets a send window. The service handles delivery, retries and reporting automatically.",
    challenges:
      "Local SMS gateways deliver reports inconsistently, so the reconciliation logic had to be defensive and idempotent. Rate limits and network timeouts also meant sends had to be queued rather than fired in one burst.",
    result:
      "Reminders go out on time, every time, with a clear record of what was sent and whether it arrived.",
    process: [
      "Mapping the reminder schedule and message templates",
      "Designing contact lists and campaign records",
      "Building the scheduling and queue layer",
      "Integrating the SMS gateway and delivery webhooks",
      "Implementing retry and reporting",
      "Testing, deployment and handover",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/azamasoud",
  },
  {
    id: "07",
    slug: "student-management",
    title: "STUDENT MANAGEMENT",
    description: "Student Records, Enrollment & Results Management System",
    category: "Web Application",
    year: "2025",
    role: "Full-Stack Developer",
    technologies: ["Next.js", "TypeScript", "Prisma", "MySQL"],
    image: "/images/projects/student-management.svg",
    featured: true,
    features: [
      "Student registration and profiles",
      "Course registration and enrollment",
      "Grading and transcript generation",
      "Attendance tracking",
      "Student ID card generation",
      "Search and filtering across records",
    ],
    highlights: [
      "A student's full academic history lives in one record, from registration through to final results and transcript",
      "Course registration is validated against programme rules, so students cannot register into modules they do not qualify for",
      "Search and filtering make any student or record findable in seconds instead of digging through registers",
    ],
    problem:
      "Student information lived in separate files and paper registers. Registration, results and attendance were handled separately, which made it slow to produce a transcript, confirm a student's status or answer a simple enquiry.",
    solution:
      "A single student records platform covering registration, course enrollment, attendance and results. Staff work from one interface, and each student's full record is always current and easy to retrieve.",
    challenges:
      "Academic records are rarely simple. Handling programme rules, prerequisite courses and credit totals correctly meant validating data at several levels. Printing and exporting transcripts also required careful layout work.",
    result:
      "Registration, results and transcripts are produced from one reliable record, saving staff hours every term.",
    process: [
      "Reviewing existing registration and records process",
      "Designing the student, course and result models",
      "Building registration with programme validation",
      "Adding attendance and grading",
      "Implementing transcript and ID card generation",
      "Migration, testing and deployment",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/azamasoud",
  },
  {
    id: "08",
    slug: "beba-chap",
    title: "BEBA CHAP",
    description: "Group Savings, Contribution & Payout Tracking Platform",
    category: "Web Application",
    year: "2024",
    role: "Full-Stack Developer",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    image: "/images/projects/beba-chap.svg",
    featured: true,
    features: [
      "Group and member management",
      "Contribution schedule tracking",
      "Balance and payout history",
      "Receipt and statement generation",
      "Role-based access for group admins",
      "Summary dashboard",
    ],
    highlights: [
      "Every contribution is recorded against the member and the period it belongs to, so balances are always explainable",
      "Statements and receipts can be produced for any member or period without reconstructing the group's paper records",
      "Group admins see totals, outstanding contributions and payout history at a glance",
    ],
    problem:
      "Savings groups ran on handwritten ledgers and memory. It was hard to tell who had contributed, what the group held, and when a member was due to be paid out, which led to arguments and mistrust.",
    solution:
      "A digital platform for running a savings group. Members are registered, contributions are logged against set periods, and balances, statements and payouts are calculated automatically instead of by hand.",
    challenges:
      "Money records must be exact and auditable, so every transaction was stored as an immutable entry with a running balance. Designing the schedule so that contribution periods and payouts stay consistent across many members took careful modelling.",
    result:
      "The group's records are clear, verifiable and available to every member, which keeps trust high and disputes rare.",
    process: [
      "Interpreting the group savings workflow",
      "Designing members, periods and transactions",
      "Building the contribution and payout logic",
      "Developing statements and receipts",
      "Adding admin roles and summaries",
      "Testing, onboarding and deployment",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/azamasoud",
  },
  {
    id: "09",
    slug: "trackmauzo",
    title: "TRACKMAUZO",
    description: "Payment Tracking & Records System for Daily Operations",
    category: "Mobile Application",
    year: "2025",
    role: "Full-Stack Developer",
    technologies: ["Android", "Java", "Firebase", "REST API"],
    image: "/images/projects/trackmauzo.svg",
    featured: true,
    features: [
      "Payment entry with instant confirmation",
      "Customer and account records",
      "Balance and history per account",
      "Search and filtering of transactions",
      "Offline-friendly data capture",
      "Summary reporting",
    ],
    highlights: [
      "Payments are recorded on the spot and immediately reflected in the customer's balance, so nothing is left to remember later",
      "Each account keeps a full payment history that can be searched, removing the need to dig through notebooks",
      "The app is designed to stay usable on unstable mobile networks, so records still get captured in the field",
    ],
    problem:
      "Payments were written in notebooks and reconciled at the end of the day or week. Balances were often wrong, and there was no quick way to answer a customer asking what they had paid.",
    solution:
      "A mobile-first payment tracking application. Each payment is recorded against a customer account with a date and amount, and balances and full histories are calculated instantly on the device.",
    challenges:
      "Field staff use the app on cheap phones and unreliable networks, so local caching, conflict handling and a clean sync strategy were essential. Performance also had to hold up with years of transaction history on a single device.",
    result:
      "Records are accurate the same day, customers get answers immediately, and end-of-day reconciliation is no longer a manual chore.",
    process: [
      "Studying the daily payment workflow",
      "Designing customers, accounts and transactions",
      "Building the Android interface",
      "Implementing local storage and sync",
      "Adding search, balances and reports",
      "Field testing and rollout",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/azamasoud",
  },
  {
    id: "10",
    slug: "afyalink",
    title: "AFYALINK",
    description: "Health Records Linking & Patient Follow-up Platform",
    category: "Web Application",
    year: "2026",
    role: "Full-Stack Developer",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "REST API"],
    image: "/images/projects/afyalink.svg",
    featured: true,
    features: [
      "Central patient record and history",
      "Visit and follow-up tracking",
      "Results and notes linked to the record",
      "Appointment and follow-up reminders",
      "Searchable patient directory",
      "Role-based access for clinical staff",
    ],
    highlights: [
      "Every visit, result and note is linked to one patient record, so a clinician can see the full history without chasing other departments",
      "Follow-ups are tracked and reminded automatically, reducing missed appointments and lost test results",
      "Access is role-based and auditable, so sensitive health information stays with the staff who need it",
    ],
    problem:
      "Patient information was fragmented across reception notes, laboratory records and personal files. Follow-ups were remembered rather than tracked, so patients were missed and results were difficult to trace back to the right person.",
    solution:
      "A platform that links a patient's visits, results and follow-ups into a single record. Staff get a searchable directory and a clear timeline, and reminders keep follow-ups from falling through.",
    challenges:
      "Health data demands strict access control and careful handling, so authorisation, audit trails and data separation were designed in from the start rather than added later. Linking records reliably across departments also required clean identity handling.",
    result:
      "A dependable patient history, timely follow-ups and clearer, faster care decisions from the information already being collected.",
    process: [
      "Mapping the patient journey and record flow",
      "Designing the patient, visit and results model",
      "Building role-based access and audit logging",
      "Developing the record timeline and search",
      "Adding reminders and follow-up tracking",
      "Testing, deployment and staff training",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/azamasoud",
  },
];
