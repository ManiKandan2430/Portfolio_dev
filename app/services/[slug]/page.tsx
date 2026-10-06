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

// Based on the dropdown menu
const SERVICES = [
  'Custom Software Development',
  'Web App Development',
  'Mobile App Development',
  'MVP Development',
  'Legacy Modernization',
  'UI/UX Design & Development',
  'IT Consulting & Advisory',
  'Business Process Automation',
  'DevOps & Cloud',
  'QA & Testing',
  'AI-Powered Solutions',
  'Machine Learning',
  'Data Analytics & BI',
  'IoT & Embedded Systems',
  'Robotic Process Automation'
];

type ServiceDetail = {
  heroDescription: string;
  whatWeDo: { title: string; description: string }[];
  process: { step: string; title: string; description: string }[];
  whyChooseUs: string[];
};

const defaultProcess = [
  { step: '01', title: 'Discovery & Planning', description: 'We start by thoroughly understanding your business needs, goals, and target audience to lay out a comprehensive strategy.' },
  { step: '02', title: 'Design & Prototyping', description: 'Our creative team designs intuitive interfaces and builds prototypes to visualize the end product before development begins.' },
  { step: '03', title: 'Agile Development', description: 'Using iterative sprints, our engineers build robust and scalable solutions while keeping you updated at every stage.' },
  { step: '04', title: 'Testing & QA', description: 'Rigorous automated and manual testing ensure that the final product is secure, bug-free, and performs beautifully.' },
  { step: '05', title: 'Deployment & Support', description: 'We handle smooth deployments and offer continued maintenance to keep your software running efficiently over time.' }
];

const serviceContentMap: Record<string, ServiceDetail> = {
  'custom-software-development': {
    heroDescription: 'Empower your business with bespoke software solutions tailored perfectly to your unique operational needs.',
    whatWeDo: [
      { title: 'Enterprise Solutions', description: 'Scalable internal systems to manage complex business processes.' },
      { title: 'SaaS Platforms', description: 'End-to-end development of subscription-based software products.' },
      { title: 'API Integration', description: 'Connecting dispararate systems for seamless data flow.' }
    ],
    process: defaultProcess,
    whyChooseUs: ['Deep technical expertise', 'Focus on ROI', 'Scalable architecture', 'Full-cycle development']
  },
  'web-app-development': {
    heroDescription: 'High-performance, secure, and responsive web applications built with cutting-edge modern frameworks.',
    whatWeDo: [
      { title: 'Single Page Apps (SPA)', description: 'Fast, seamless interfaces using React, Vue, or Angular.' },
      { title: 'Progressive Web Apps (PWA)', description: 'App-like experiences directly in the browser with offline capabilities.' },
      { title: 'E-commerce Portals', description: 'Secure, high-converting digital storefronts tailored to your brand.' }
    ],
    process: defaultProcess,
    whyChooseUs: ['Modern Tech Stack (Next.js, React)', 'SEO Optimized', 'Accessibility Compliant', 'Lightning Fast Performance']
  },
  'mobile-app-development': {
    heroDescription: 'Engaging native and cross-platform mobile experiences that captivate users and drive growth.',
    whatWeDo: [
      { title: 'iOS Development', description: 'Premium Swift-based applications for the Apple ecosystem.' },
      { title: 'Android Development', description: 'Robust Kotlin-based apps for the global Android market.' },
      { title: 'Cross-Platform', description: 'Efficient development using React Native or Flutter.' }
    ],
    process: defaultProcess,
    whyChooseUs: ['User-centric design', 'App store optimization', 'High engagement rates', 'Hardware integration expertise']
  },
  'mvp-development': {
    heroDescription: 'Launch your idea fast. We build robust Minimum Viable Products to help you validate your market efficiently.',
    whatWeDo: [
      { title: 'Rapid Prototyping', description: 'Quickly transforming ideas into clickable models.' },
      { title: 'Core Feature Build', description: 'Focusing development on essential features that prove value.' },
      { title: 'Market Testing Readiness', description: 'Analytics and feedback loops built directly into the MVP.' }
    ],
    process: defaultProcess,
    whyChooseUs: ['Speed to market', 'Cost-effective approach', 'Investor-ready deliverables', 'Scalable foundation']
  },
  'legacy-modernization': {
    heroDescription: 'Transform outdated systems into agile, cloud-ready applications without interrupting your business flow.',
    whatWeDo: [
      { title: 'Code Refactoring', description: 'Cleaning and optimizing old codebases for better maintainability.' },
      { title: 'Cloud Migration', description: 'Moving on-premise systems to secure cloud infrastructure.' },
      { title: 'UI/UX Refresh', description: 'Modernizing the user interface of aging applications.' }
    ],
    process: defaultProcess,
    whyChooseUs: ['Zero downtime transitions', 'Improved security posture', 'Lower maintenance costs', 'Enhanced system performance']
  },
  'ui-ux-design-development': {
    heroDescription: 'Stunning, intuitive digital interfaces crafted to deliver unforgettable user journeys and maximize conversions.',
    whatWeDo: [
      { title: 'User Research', description: 'In-depth analysis of your target audience and core user behaviors.' },
      { title: 'Wireframing & Prototyping', description: 'Blueprint creation covering every user interaction.' },
      { title: 'Visual Design', description: 'Aesthetic, brand-aligned interfaces that delight users.' }
    ],
    process: defaultProcess,
    whyChooseUs: ['Data-driven design decisions', 'Accessibility first', 'Brand consistency', 'Interactive fluid animations']
  },
  'it-consulting-advisory': {
    heroDescription: 'Strategic technology guidance to align your IT infrastructure with your long-term business objectives.',
    whatWeDo: [
      { title: 'Tech Audits', description: 'Comprehensive review of your current tech stack.' },
      { title: 'Digital Transformation', description: 'Roadmapping your transition to modern digital workflows.' },
      { title: 'Vendor Selection', description: 'Expert advice on choosing the right tools and platforms.' }
    ],
    process: defaultProcess,
    whyChooseUs: ['Industry veteran consultants', 'Unbiased recommendations', 'Actionable roadmaps', 'Risk mitigation strategies']
  },
  'business-process-automation': {
    heroDescription: 'Streamline workflows, reduce manual errors, and reclaim hours of productivity through intelligent automation.',
    whatWeDo: [
      { title: 'Workflow Analysis', description: 'Identifying bottlenecks and repetitive tasks in your operations.' },
      { title: 'Custom Scripts & Bots', description: 'Developing tailored tools to automate mundane processes.' },
      { title: 'System Integrations', description: 'Ensuring your different software tools talk to each other seamlessly.' }
    ],
    process: defaultProcess,
    whyChooseUs: ['Measurable time savings', 'Reduced operational costs', 'High accuracy rates', 'Seamless tool integration']
  },
  'devops-cloud': {
    heroDescription: 'Accelerate delivery and ensure unparalleled uptime with our robust DevOps and Cloud engineering services.',
    whatWeDo: [
      { title: 'CI/CD Pipelines', description: 'Automated testing and deployment for faster, safer releases.' },
      { title: 'Infrastructure as Code', description: 'Managing cloud infrastructure predictably using Terraform/Ansible.' },
      { title: 'Cloud Architecture optimization', description: 'Designing cost-effective, scalable AWS/Azure/GCP environments.' }
    ],
    process: defaultProcess,
    whyChooseUs: ['24/7 reliability', 'Cost optimization', 'Enhanced security', 'Rapid scalable deployments']
  },
  'qa-testing': {
    heroDescription: 'Ensure flawless digital experiences with our comprehensive manual and automated quality assurance testing.',
    whatWeDo: [
      { title: 'Automated Testing', description: 'Custom test scripts predicting and catching regressions instantly.' },
      { title: 'Performance Testing', description: 'Stress testing applications to ensure stability under load.' },
      { title: 'Security Audits', description: 'Identifying and patching vulnerabilities before they become threats.' }
    ],
    process: defaultProcess,
    whyChooseUs: ['Zero-defect mindset', 'Extensive device labs', 'Continuous integration ready', 'Detailed reporting']
  },
  'ai-powered-solutions': {
    heroDescription: 'Leverage the latest in Artificial Intelligence to create smart, predictive, and innovative business tools.',
    whatWeDo: [
      { title: 'Custom LLM Integrations', description: 'Embedding state-of-the-art language models into your workflows.' },
      { title: 'AI Chatbots', description: 'Intelligent customer service agents that learn and adapt.' },
      { title: 'Generative AI Tools', description: 'Automating content creation and complex data synthesis.' }
    ],
    process: defaultProcess,
    whyChooseUs: ['Cutting-edge AI expertise', 'Ethical AI practices', 'Seamless integrations', 'Continuous model optimization']
  },
  'machine-learning': {
    heroDescription: 'Unlock the hidden value in your data with custom machine learning models that learn, adapt, and predict.',
    whatWeDo: [
      { title: 'Predictive Analytics', description: 'Forecasting trends and anticipating customer behavior.' },
      { title: 'Computer Vision', description: 'Automating visual classification and inspection tasks.' },
      { title: 'Recommendation Systems', description: 'Personalizing user experiences to drive engagement.' }
    ],
    process: defaultProcess,
    whyChooseUs: ['PhD-level data scientists', 'Scalable MLOps', 'High accuracy models', 'Domain-specific solutions']
  },
  'data-analytics-bi': {
    heroDescription: 'Transform raw data into actionable business intelligence with intuitive dashboards and deep analytics.',
    whatWeDo: [
      { title: 'Data Warehousing', description: 'Centralizing your data for a single source of truth.' },
      { title: 'Interactive Dashboards', description: 'Real-time visualizations using PowerBI, Tableau, or custom tools.' },
      { title: 'Data pipelines', description: 'Robust ETL pipelines to clean and structure data automatically.' }
    ],
    process: defaultProcess,
    whyChooseUs: ['Actionable insights', 'Data security compliance', 'Real-time reporting', 'Scalable data architecture']
  },
  'iot-embedded-systems': {
    heroDescription: 'Connect the physical and digital worlds with secure, scalable Internet of Things solutions.',
    whatWeDo: [
      { title: 'Firmware Development', description: 'Reliable low-level code for connected hardware devices.' },
      { title: 'IoT Dashboards', description: 'Centralized control panels to monitor and manage fleets of devices.' },
      { title: 'Edge Computing', description: 'Processing data locally for faster response times and lower bandwidth.' }
    ],
    process: defaultProcess,
    whyChooseUs: ['Hardware agnosticism', 'Low-latency focus', 'High device security', 'Scalable device management']
  },
  'robotic-process-automation': {
    heroDescription: 'Deploy digital workers to handle repetitive tasks, freeing your human team to focus on high-value strategy.',
    whatWeDo: [
      { title: 'RPA Strategy', description: 'Identifying the best candidate processes for automation.' },
      { title: 'Bot Development', description: 'Building resilient automation bots using UiPath or Automation Anywhere.' },
      { title: 'RPA Support', description: 'Monitoring and maintaining bots as your underlying systems change.' }
    ],
    process: defaultProcess,
    whyChooseUs: ['Rapid implementation', 'Significant cost reduction', 'High compliance adherence', '24/7 operations capability']
  }
};

export function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: createSlug(service),
  }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const serviceName = SERVICES.find(s => createSlug(s) === resolvedParams.slug);

  if (!serviceName) {
    notFound();
  }
  
  const content = serviceContentMap[resolvedParams.slug] || {
    heroDescription: `We provide state-of-the-art ${serviceName.toLowerCase()} customized to your core business needs. Accelerate your digital transformation and gain an edge in your industry.`,
    whatWeDo: [
      { title: 'Custom Strategy', description: 'Tailored approaches designed specifically for your business goals.' },
      { title: 'Execution', description: 'Flawless execution driven by industry best practices.' }
    ],
    process: defaultProcess,
    whyChooseUs: ['Tailored strategy and dedicated execution', 'Scalable architecture', 'Transparent communication', 'Post-launch support']
  };

  return (
    <div className="section-light dark:section-dark min-h-[60vh] pt-32 pb-20">
      <div className="container-main">
        {/* Breadcrumb */}
        <div className="mb-10 flex items-center gap-2 text-sm text-surface-500 dark:text-white/50 font-medium">
          <Link href="/" className="hover:text-gold-500 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-surface-900 dark:text-white">{serviceName}</span>
        </div>

        <div className="max-w-4xl">
          <p className="text-eyebrow mb-6 text-gold-500">SearchFirst Services</p>
          <h1 className="text-display-lg text-surface-900 dark:text-white mb-8 leading-tight">
            {serviceName}
          </h1>
          
          <p className="text-body-lg text-surface-600 dark:text-white/70 mb-16 border-l-4 border-gold-500 pl-6 text-xl">
            {content.heroDescription}
          </p>
          
          <div className="space-y-20">
            {/* What We Do */}
            <section>
              <h2 className="text-heading-sm font-bold mt-12 mb-8 text-surface-900 dark:text-white">What We Do</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.whatWeDo.map((item, idx) => (
                  <div key={idx} className="bg-surface-50 dark:bg-white/5 p-6 rounded-2xl border border-surface-200 dark:border-white/10 hover:border-gold-500/50 transition-colors">
                    <h3 className="font-bold text-lg mb-3 text-surface-900 dark:text-white">{item.title}</h3>
                    <p className="text-surface-600 dark:text-white/70 text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Our Process */}
            <section>
              <h2 className="text-heading-sm font-bold mb-8 text-surface-900 dark:text-white">Our Process</h2>
              <div className="space-y-6">
                {content.process.map((step, idx) => (
                  <div key={idx} className="flex gap-6 items-start group">
                    <div className="shrink-0 w-14 h-14 rounded-full bg-gold-500/10 text-gold-500 flex items-center justify-center font-bold text-lg group-hover:bg-gold-500 group-hover:text-white transition-colors">
                      {step.step}
                    </div>
                    <div className="pt-2">
                      <h3 className="font-bold text-xl mb-2 text-surface-900 dark:text-white">{step.title}</h3>
                      <p className="text-surface-600 dark:text-white/70">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Why Choose Us */}
            <section>
              <h2 className="text-heading-sm font-bold mb-8 text-surface-900 dark:text-white">Why Choose Us?</h2>
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
                <h3 className="text-3xl font-bold mb-4">Ready to start your {serviceName.split(' ')[0]} transformation?</h3>
                <p className="text-white/70 mb-8 max-w-2xl text-lg">Connect with our industry experts and get a free consultation along with a competitive quote to build exactly what you need.</p>
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