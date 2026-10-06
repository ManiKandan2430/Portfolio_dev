import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Helper to reliably format names to URL safe slugs
const createSlug = (str: string) => {
  return str
    .toLowerCase()
    .replace(/\s&\s/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

const INDUSTRIES = [
  'Finance & Banking',
  'Healthcare & Pharma',
  'eCommerce & Retail',
  'Education & EdTech',
  'Logistics & Supply Chain',
  'Manufacturing',
  'Real Estate & PropTech',
  'Media & Entertainment',
  'Telecommunications',
  'Government & Public Sector'
];

type IndustryDetail = {
  heroDescription: string;
  howWeTransform: { title: string; description: string }[];
  keyUseCases: { title: string; description: string }[];
  whyChooseUs: string[];
};

const industryContentMap: Record<string, IndustryDetail> = {
  'finance-banking': {
    heroDescription: 'Secure, compliant, and innovative digital solutions to modernize banking operations, enhance security, and elevate customer financial experiences.',
    howWeTransform: [
      { title: 'Core Banking Modernization', description: 'Upgrading legacy financial systems to agile, cloud-native architectures.' },
      { title: 'FinTech Integrations', description: 'Seamlessly connecting payment gateways, open banking APIs, and third-party financial services.' },
      { title: 'Wealth Management', description: 'Building intuitive digital platforms for portfolio management and robo-advisory.' }
    ],
    keyUseCases: [
      { title: 'Mobile Banking Apps', description: 'Secure, user-friendly mobile applications for everyday financial transactions.' },
      { title: 'Fraud Detection Systems', description: 'AI-driven algorithms to monitor anomalies and prevent fraudulent activities in real-time.' },
      { title: 'Automated Loan Processing', description: 'Streamlining credit scoring and loan approvals using intelligent automation.' },
      { title: 'Blockchain Smart Contracts', description: 'Transparent and immutable contract execution for decentralized finance.' }
    ],
    whyChooseUs: ['PCI-DSS & SOC2 Compliance Expertise', 'Bank-grade Security Protocols', 'High-volume Transaction Handling', 'Deep Domain Knowledge']
  },
  'healthcare-pharma': {
    heroDescription: 'Empowering healthcare providers and pharmaceutical companies with HIPAA-compliant, patient-centric technology platforms.',
    howWeTransform: [
      { title: 'Digital Health Platforms', description: 'Creating cohesive ecosystems connecting physicians, patients, and insurers.' },
      { title: 'Clinical Trial Management', description: 'Digitizing the recruitment, tracking, and data analysis of medical trials.' },
      { title: 'Telemedicine Portals', description: 'High-quality video consultation platforms with integrated medical records.' }
    ],
    keyUseCases: [
      { title: 'Electronic Health Records (EHR)', description: 'Secure, interoperable systems for patient data management.' },
      { title: 'IoT Medical Devices', description: 'Connecting wearable monitors to centralized healthcare dashboards.' },
      { title: 'AI Diagnostics', description: 'Machine learning tools assisting radiologists and doctors in image analysis.' },
      { title: 'Pharmacy Inventory Management', description: 'Automated tracking of drug supplies and expiration dates.' }
    ],
    whyChooseUs: ['HIPAA & GDPR Compliance', 'Interoperability Standards (HL7/FHIR)', 'Patient Data Encryption', 'Focus on Care Quality']
  },
  'ecommerce-retail': {
    heroDescription: 'Omnichannel retail solutions that drive conversions, personalize shopping experiences, and optimize backend supply chains.',
    howWeTransform: [
      { title: 'Unified Commerce', description: 'Bridging the gap between physical stores and online storefronts.' },
      { title: 'Personalization Engines', description: 'Using behavioral data to serve hyper-relevant product recommendations.' },
      { title: 'Headless Architecture', description: 'Decoupling the frontend to deliver blazing-fast shopping experiences anywhere.' }
    ],
    keyUseCases: [
      { title: 'Custom Storefronts', description: 'High-converting online stores built on modern frameworks.' },
      { title: 'Order Management Systems (OMS)', description: 'Centralized tracking of inventory, orders, and returns.' },
      { title: 'AR Product Try-ons', description: 'Augmented reality tools allowing customers to visualize products before buying.' },
      { title: 'Dynamic Pricing', description: 'Algorithm-driven pricing strategies that adapt to market demand.' }
    ],
    whyChooseUs: ['Lightning Fast Load Times', 'Conversion Rate Optimization', 'Scalable for Peak Seasons (Black Friday)', 'Seamless ERP/CRM Integrations']
  },
  'education-edtech': {
    heroDescription: 'Transforming how the world learns through engaging, accessible, and scalable educational technology platforms.',
    howWeTransform: [
      { title: 'Interactive Learning', description: 'Building engaging platforms that utilize gamification and interactive media.' },
      { title: 'Administrative Automation', description: 'Streamlining enrollment, grading, and scheduling for institutions.' },
      { title: 'Adaptive Learning Systems', description: 'Creating pathways that adjust to the individual pace and style of each student.' }
    ],
    keyUseCases: [
      { title: 'Learning Management Systems (LMS)', description: 'Comprehensive portals for course delivery and student management.' },
      { title: 'Virtual Classrooms', description: 'Secure, feature-rich environments for remote live teaching.' },
      { title: 'Student Success Dashboards', description: 'Predictive analytics identifying students who may need additional support.' },
      { title: 'Alumni Engagement Portals', description: 'Platforms connecting graduates for networking and fundraising.' }
    ],
    whyChooseUs: ['WCAG Accessibility Compliance', 'FERPA Data Security Standards', 'Engaging UX Design', 'High Concurrent User Scalability']
  },
  'logistics-supply-chain': {
    heroDescription: 'End-to-end visibility and efficiency tools for modern logistics, fleet management, and complex supply networks.',
    howWeTransform: [
      { title: 'Supply Chain Visibility', description: 'Providing real-time tracking from warehouse to final delivery.' },
      { title: 'Warehouse Automation', description: 'Integrating digital twin software and robotic control systems.' },
      { title: 'Route Optimization', description: 'Applying complex algorithms to minimize fuel consumption and delivery times.' }
    ],
    keyUseCases: [
      { title: 'Fleet Management Software', description: 'Real-time telemetry and maintenance tracking for vehicles.' },
      { title: 'Inventory Predictive Analytics', description: 'AI models forecasting demand to prevent stockouts and overstock.' },
      { title: 'Transport Management Systems (TMS)', description: 'Comprehensive tools for freight routing and carrier relationships.' },
      { title: 'Last-Mile Delivery Apps', description: 'Mobile tools for drivers maximizing delivery success rates.' }
    ],
    whyChooseUs: ['Real-time Data Processing', 'IoT Device Integration', 'Geospatial Mapping Expertise', 'High-availability Systems']
  },
  'manufacturing': {
    heroDescription: 'Industry 4.0 software solutions bridging the gap between factory floor hardware and enterprise management systems.',
    howWeTransform: [
      { title: 'Smart Factories', description: 'Connecting machines, sensors, and personnel into a cohesive digital ecosystem.' },
      { title: 'Quality Control Automation', description: 'Implementing computer vision to detect defects on the assembly line.' },
      { title: 'Predictive Maintenance', description: 'Using sensor data to predict machine failures before they halt production.' }
    ],
    keyUseCases: [
      { title: 'Manufacturing Execution Systems (MES)', description: 'Tracking intermediate goods and raw materials through the production process.' },
      { title: 'Digital Twins', description: 'Virtual replicas of physical assets to simulate changes and optimizations.' },
      { title: 'Supply Chain Integration', description: 'Syncing production schedules directly with raw material suppliers.' },
      { title: 'Safety Monitoring', description: 'Wearable and camera integrations ensuring compliance with safety protocols.' }
    ],
    whyChooseUs: ['IoT Prototyping Capabilities', 'Legacy Machine Integration', 'Edge Computing Architectures', 'Industrial Cybersecurity']
  },
  'real-estate-proptech': {
    heroDescription: 'Digital tools that reinvent property management, real estate investment, and tenant experiences.',
    howWeTransform: [
      { title: 'Smart Buildings', description: 'Integrating building management systems for energy efficiency and security.' },
      { title: 'Digital Brokerage', description: 'Streamlining the buying, selling, and leasing processes online.' },
      { title: 'Tenant Experience Platforms', description: 'Mobile apps centralizing amenities, rent payments, and maintenance requests.' }
    ],
    keyUseCases: [
      { title: 'Property Management Software', description: 'End-to-end management of multi-family and commercial real estate portfolios.' },
      { title: 'Virtual Tours & 3D Modeling', description: 'Immersive property walkthroughs accessible from anywhere in the world.' },
      { title: 'Investment Analytics', description: 'Data-driven dashboards evaluating market trends and property valuations.' },
      { title: 'Automated Lease Management', description: 'Digitized contract generation and renewal tracking.' }
    ],
    whyChooseUs: ['Intuitive Consumer Interfaces', 'Complex Financial Data Handling', 'Proprietary Map/Location Integrations', 'Scalable Multi-tenant Architectures']
  },
  'media-entertainment': {
    heroDescription: 'High-performance streaming, content management, and digital engagement platforms for modern media empires.',
    howWeTransform: [
      { title: 'Content Delivery', description: 'Architecting globally distributed networks for zero-buffer video and audio.' },
      { title: 'Audience Engagement', description: 'Building interactive second-screen experiences and community platforms.' },
      { title: 'Digital Rights Management', description: 'Securing intellectual property against piracy and unauthorized distribution.' }
    ],
    keyUseCases: [
      { title: 'OTT Streaming Platforms', description: 'Custom video-on-demand architectures competing with industry giants.' },
      { title: 'Media Asset Management (MAM)', description: 'Centralized indexing, tagging, and retrieval of massive media libraries.' },
      { title: 'Fan Loyalty Apps', description: 'Gamified mobile applications driving engagement for sports teams and artists.' },
      { title: 'Targeted Ad Tech', description: 'Sophisticated ad-insertion algorithms balancing revenue and user experience.' }
    ],
    whyChooseUs: ['High-bandwidth Video Engineering', 'Global CDN Optimization', 'Spike-traffic Resiliency', 'Immersive UX/UI Design']
  },
  'telecommunications': {
    heroDescription: 'Scalable software architectures managing complex networks, billing systems, and customer self-service portals.',
    howWeTransform: [
      { title: 'BSS/OSS Modernization', description: 'Upgrading core operational systems for 5G readiness.' },
      { title: 'Omnichannel Customer Care', description: 'Unifying support across web, mobile, social, and physical retail.' },
      { title: 'Network Automation', description: 'Software-defined networking tools reducing manual provisioning errors.' }
    ],
    keyUseCases: [
      { title: 'Subscriber Self-care Portals', description: 'Empowering users to manage plans, usage, and payments autonomously.' },
      { title: 'Intelligent Ticketing Systems', description: 'AI-routed support workflows drastically reducing resolution times.' },
      { title: 'Data Monetization', description: 'Securely aggregating network data for actionable business insights.' },
      { title: 'Partner Integrations', description: 'API gateways allowing third-party services to bundle with telco offerings.' }
    ],
    whyChooseUs: ['Deep Telco Protocol Knowledge', 'Massive Scale Data Processing', 'Zero-downtime Deployments', 'Legacy System Interoperability']
  },
  'government-public-sector': {
    heroDescription: 'Secure, accessible, and transparent digital public services bridging the gap between citizens and government.',
    howWeTransform: [
      { title: 'Citizen Service Digitization', description: 'Moving paper-based queues to intuitive online portals.' },
      { title: 'Smart City Initiatives', description: 'Aggregating municipal data for better urban planning and resource allocation.' },
      { title: 'Inter-agency Data Sharing', description: 'Breaking down siloes with secure, compliant API integrations.' }
    ],
    keyUseCases: [
      { title: 'Civic Engagement Platforms', description: 'Portals for community feedback, voting information, and public town halls.' },
      { title: 'Permit & Licensing Systems', description: 'Automated workflows cutting bureaucratic delays.' },
      { title: 'Emergency Response Dashboards', description: 'Real-time incident mapping and resource deployment tools.' },
      { title: 'Tax & Revenue Portals', description: 'Secure systems for citizen and corporate tax filing.' }
    ],
    whyChooseUs: ['FedRAMP/StateRAMP Readiness', 'Strict Accessibility (Section 508)', 'Uncompromising Security Posture', 'Experience with Public Procurement']
  }
};

export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({
    slug: createSlug(industry),
  }));
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const industryName = INDUSTRIES.find(i => createSlug(i) === resolvedParams.slug);

  if (!industryName) {
    notFound();
  }
  
  const content = industryContentMap[resolvedParams.slug] || {
    heroDescription: `We provide state-of-the-art software solutions customized to the unique challenges of the ${industryName} industry. Accelerate your digital transformation and gain a competitive edge.`,
    howWeTransform: [
      { title: 'Digital Transformation', description: 'Comprehensive upgrading of legacy workflows to modern digital standards.' },
      { title: 'Operational Efficiency', description: 'Automating processes to reduce costs and increase output.' }
    ],
    keyUseCases: [
      { title: 'Custom Software', description: 'Bespoke tools designed exclusively for your operations.' },
      { title: 'Data Integrations', description: 'Connecting disparate systems into a unified source of truth.' }
    ],
    whyChooseUs: ['Deep Industry Expertise', 'Compliance Standard Adherence', 'Scalable Architecture', 'Dedicated Support']
  };

  return (
    <div className="section-light dark:section-dark min-h-[60vh] pt-32 pb-20">
      <div className="container-main">
        {/* Breadcrumb */}
        <div className="mb-10 flex items-center gap-2 text-sm text-surface-500 dark:text-white/50 font-medium">
          <Link href="/" className="hover:text-gold-500 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-surface-900 dark:text-white">Industries</span>
          <span>/</span>
          <span className="text-surface-900 dark:text-white">{industryName}</span>
        </div>

        <div className="max-w-4xl">
          <p className="text-eyebrow mb-6 text-gold-500">SearchFirst For Industries</p>
          <h1 className="text-display-lg text-surface-900 dark:text-white mb-8 leading-tight">
            {industryName}
          </h1>
          
          <p className="text-body-lg text-surface-600 dark:text-white/70 mb-16 border-l-4 border-gold-500 pl-6 text-xl">
            {content.heroDescription}
          </p>
          
          <div className="space-y-20">
            {/* How We Transform */}
            <section>
              <h2 className="text-heading-sm font-bold mt-12 mb-8 text-surface-900 dark:text-white">How We Transform {industryName}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.howWeTransform.map((item, idx) => (
                  <div key={idx} className="bg-surface-50 dark:bg-white/5 p-6 rounded-2xl border border-surface-200 dark:border-white/10 hover:border-gold-500/50 transition-colors">
                    <h3 className="font-bold text-lg mb-3 text-surface-900 dark:text-white">{item.title}</h3>
                    <p className="text-surface-600 dark:text-white/70 text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Key Use Cases */}
            <section>
              <h2 className="text-heading-sm font-bold mb-8 text-surface-900 dark:text-white">Key Use Cases</h2>
              <div className="space-y-6">
                {content.keyUseCases.map((useCase, idx) => (
                  <div key={idx} className="flex gap-6 items-start group">
                    <div className="shrink-0 w-14 h-14 rounded-full bg-gold-500/10 text-gold-500 flex items-center justify-center font-bold text-lg group-hover:bg-gold-500 group-hover:text-white transition-colors">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <div className="pt-2">
                      <h3 className="font-bold text-xl mb-2 text-surface-900 dark:text-white">{useCase.title}</h3>
                      <p className="text-surface-600 dark:text-white/70">{useCase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Why Choose Us */}
            <section>
              <h2 className="text-heading-sm font-bold mb-8 text-surface-900 dark:text-white">Why SearchFirst for {industryName}?</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none pl-0">
                {content.whyChooseUs.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-surface-50 dark:bg-white/5 p-4 rounded-xl border border-surface-200 dark:border-white/10">
                    <span className="text-gold-500 mt-1">✦</span>
                    <span className="font-medium text-surface-800 dark:text-white/90">{reason}</span>
                  </li>
                ))}
              </ul>
            </section>
            
            {/* CTA */}
            <div className="mt-20 bg-navy-900 text-white rounded-3xl p-10 md:p-14 relative overflow-hidden border border-gold-500/30 shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/20 blur-[100px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 blur-[100px] rounded-full" />
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">Ready to elevate your {industryName} business?</h3>
                <p className="text-white/70 mb-8 max-w-2xl text-lg">Connect with our specialized industry experts and get a free consultation along with a competitive quote to build exactly what you need.</p>
                <Link href="/#contact" className="inline-flex bg-gold-500 hover:bg-gold-400 text-white py-4 px-8 rounded-lg font-bold transition-all shadow-glow hover:shadow-gold hover:-translate-y-1">
                  Discuss Your Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}