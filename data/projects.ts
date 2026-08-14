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
  problem: string;
  solution: string;
  challenges: string;
  result: string;
  process: string[];
  liveUrl: string;
  githubUrl: string;
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
    problem:
      "Local businesses struggled to stay connected with their customers. Existing communication tools were either too complex, built for large enterprises, or lacked the local integration needed for regional telecom providers. There was no simple way to manage customer records and send targeted SMS campaigns.",
    solution:
      "KEMI-FAIBA is a straightforward web platform for managing customer records and running bulk SMS campaigns. A fast Next.js frontend sits on a reliable backend, letting businesses import contacts, segment them, schedule messages and track delivery — all in one place.",
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
    problem:
      "Travellers and aviation enthusiasts lacked a simple, fast way to see live flight information and explore routes. Existing tools were slow, cluttered with ads, or buried key information behind complex interfaces.",
    solution:
      "SKYMAP is a simple flight tracking and travel information platform. An interactive map shows live flights, while search lets users find flights, routes and airport details quickly — on any device.",
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
    problem:
      "A local juice business wanted to move beyond phone and walk-in orders. Customers needed a simple way to place orders and set up recurring deliveries, while the business needed to confirm orders reliably — even for customers without smartphones.",
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
];
