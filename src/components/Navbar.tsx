import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu as MenuIcon, 
  X as XIcon
} from 'lucide-react';
import Switch from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

type View = 'hero' | 'about' | 'strengths' | 'contact';

export interface NavServiceItem {
  title: string;
  href: string;
}

export const startBusinessServices: NavServiceItem[] = [
  { title: "Partnership", href: "#contact" },
  { title: "Private Limited Company", href: "#contact" },
  { title: "One Person Company", href: "#contact" },
  { title: "Indian Subsidiary", href: "#contact" },
  { title: "Section 8 Company", href: "#contact" },
  { title: "Trust Registration", href: "#contact" },
  { title: "Limited Liability Partnership Company-LLP", href: "#contact" },
  { title: "Public Limited Company", href: "#contact" },
  { title: "Proprietorship", href: "#contact" },
];

export const registrationsServices: NavServiceItem[] = [
  { title: "PF Registration", href: "#contact" },
  { title: "ESI Registration", href: "#contact" },
  { title: "Professional Tax Registration", href: "#contact" },
  { title: "GST Registration", href: "#contact" },
  { title: "Import Export Code Registration", href: "#contact" },
  { title: "ICEGATE Registration", href: "#contact" },
  { title: "Digital Signature Certificate", href: "#contact" },
  { title: "Trade License Registration", href: "#contact" },
  { title: "Trademark Registration", href: "#contact" },
  { title: "Shops and Establishment Registration-Labour lic", href: "#contact" },
  { title: "CLRA License -Contract Labour License", href: "#contact" },
  { title: "BOCW Registration", href: "#contact" },
  { title: "Udyam-MSME Registration", href: "#contact" },
];

export const taxationServices: NavServiceItem[] = [
  { title: "Income Tax Filings-ITR-1 to 7", href: "#contact" },
  { title: "ROC Filings for PVT-LLP", href: "#contact" },
  { title: "GST Returns and Filings", href: "#contact" },
  { title: "Payroll", href: "#contact" },
  { title: "EPF-ESI and Professional Tax Returns", href: "#contact" },
  { title: "TDS Return Filing", href: "#contact" },
  { title: "E-Way Bill and E-Invoicing", href: "#contact" },
];

export const corporateServices: NavServiceItem[] = [
  { title: "Change of Registration Office", href: "#contact" },
  { title: "Increasing Authorized - Paid Up Capital", href: "#contact" },
  { title: "MoA and AoA Amendments", href: "#contact" },
  { title: "Winding Up of a Company or an LLP", href: "#contact" },
  { title: "Cancellation and Clearance Notices", href: "#contact" },
  { title: "Adding Directors or Promoters", href: "#contact" },
  { title: "Removal of Directors or Promoters", href: "#contact" },
];

const categories = [
  { id: 'start-business', name: 'Start Business', list: startBusinessServices },
  { id: 'registrations', name: 'Registrations', list: registrationsServices },
  { id: 'taxation', name: 'Taxation and Filing', list: taxationServices },
  { id: 'corporate', name: 'Corporate Requirements', list: corporateServices },
];

const serviceDescriptions: Record<string, { desc: string; highlights?: string[] }> = {
  // Start Business
  "Partnership": {
    desc: "A business structure owned by two or more individuals. Ideal for small co-owned businesses.",
    highlights: ["Easy setup", "Low compliance costs", "Shared responsibility"]
  },
  "Private Limited Company": {
    desc: "The most popular corporate structure in India, offering limited liability and high credibility for startups.",
    highlights: ["Limited liability protection", "Separate legal entity", "Easy to raise capital"]
  },
  "One Person Company": {
    desc: "A corporate structure that allows a single entrepreneur to operate a corporate entity with limited liability.",
    highlights: ["Single owner control", "Limited liability", "Fewer compliance requirements"]
  },
  "Indian Subsidiary": {
    desc: "A company setup for foreign parent businesses to establish their presence and operations in India.",
    highlights: ["100% foreign FDI allowed", "Separate Indian entity status", "Strategic local market access"]
  },
  "Section 8 Company": {
    desc: "A non-profit company established to promote commerce, art, science, sports, education, and charity.",
    highlights: ["Exempt from stamp duty", "High credibility/trust", "Eligible for tax exemptions"]
  },
  "Trust Registration": {
    desc: "Establish a charitable trust to perform social, educational, and philanthropic activities.",
    highlights: ["Simple legal structure", "Long-term social impact", "Tax benefits for donations"]
  },
  "Limited Liability Partnership Company-LLP": {
    desc: "Combines the benefits of a partnership with the limited liability features of a company.",
    highlights: ["No partner liability for others", "Flexible internal structure", "No minimum capital limit"]
  },
  "Public Limited Company": {
    desc: "A corporate structure for large organizations planning to offer shares to the general public.",
    highlights: ["Unlimited shareholders", "High capital capability", "Easily transferable shares"]
  },
  "Proprietorship": {
    desc: "The simplest business structure owned and operated by a single person. Perfect for solo freelancers and shops.",
    highlights: ["Super fast registration", "Direct owner control", "Minimal corporate compliance"]
  },

  // Registrations
  "PF Registration": {
    desc: "Register for the Provident Fund scheme to secure retirement benefits for your employees.",
    highlights: ["Mandatory for 20+ employees", "Social security support", "Tax-deductible contributions"]
  },
  "ESI Registration": {
    desc: "Employee State Insurance provides medical and cash benefits to employees for sickness and maternity.",
    highlights: ["Health insurance coverage", "Maternity & disability support", "Mandatory for 10+ employees"]
  },
  "Professional Tax Registration": {
    desc: "State-level tax registration required for businesses employing staff or practicing professionals.",
    highlights: ["Mandatory state compliance", "Employee salary deduction", "Avoid penalty charges"]
  },
  "GST Registration": {
    desc: "Get registered under the Goods and Services Tax to legally sell products/services and claim input tax credits.",
    highlights: ["Mandatory for threshold limits", "Claim input tax credits", "Legally sell interstate"]
  },
  "Import Export Code Registration": {
    desc: "Required by the DGFT for businesses importing goods into or exporting goods out of India.",
    highlights: ["Lifetime validity", "No renewal needed", "Essential for global trade"]
  },
  "ICEGATE Registration": {
    desc: "Registration on the Indian Customs Electronic Gateway for handling customs documents and e-filings.",
    highlights: ["Fast customs clearance", "Online document tracking", "Direct duty payments"]
  },
  "Digital Signature Certificate": {
    desc: "Get a secure e-signature certificate for filing corporate taxes, e-tenders, and legal documents.",
    highlights: ["Class 3 secure level", "Paperless validation", "2-year or 3-year validity"]
  },
  "Trade License Registration": {
    desc: "Local municipality license authorizing a business to conduct commercial activities in a specific area.",
    highlights: ["Locality compliance", "Public safety validation", "Avoid municipal fines"]
  },
  "Trademark Registration": {
    desc: "Protect your brand name, logo, or slogan from being copied or misused by competitors.",
    highlights: ["Exclusive brand ownership", "Legal asset creation", "Use the ® symbol"]
  },
  "Shops and Establishment Registration-Labour lic": {
    desc: "Mandatory license for commercial shops, offices, and establishments operating within state limits.",
    highlights: ["Proof of business premises", "Labour welfare compliance", "Opens business bank accounts"]
  },
  "CLRA License -Contract Labour License": {
    desc: "License under the Contract Labour Act for employers hiring contract labour through agencies.",
    highlights: ["Mandatory for 20+ contract staff", "Ensures labour welfare", "Protects main employer"]
  },
  "BOCW Registration": {
    desc: "Building and Other Construction Workers registration to protect worker safety and welfare.",
    highlights: ["Safety compliance", "Eligible for worker welfare fund", "Avoid construction halts"]
  },
  "Udyam-MSME Registration": {
    desc: "Register under MSME to qualify for government schemes, subsidies, and lower interest loans.",
    highlights: ["Collateral-free bank loans", "Protection against late payments", "Lower patent/trademark fees"]
  },

  // Taxation
  "Income Tax Filings-ITR-1 to 7": {
    desc: "Accurate filing of annual income tax returns for individuals, partnerships, companies, and trusts.",
    highlights: ["Avoid late filing penalties", "Crucial for visa/loan approval", "Optimize tax liability deductions"]
  },
  "ROC Filings for PVT-LLP": {
    desc: "Mandatory annual filing of financial statements and returns with the Registrar of Companies.",
    highlights: ["Maintain active company status", "Avoid high daily penalties", "Build corporate transparency"]
  },
  "GST Returns and Filings": {
    desc: "Monthly, quarterly, and annual return filings (GSTR-1, GSTR-3B) to keep your GST status active.",
    highlights: ["Clean compliance record", "Pass tax credits to clients", "Timely interest savings"]
  },
  "Payroll": {
    desc: "Complete employee payroll processing including payslips, deductions, and tax compliance.",
    highlights: ["Accurate salary calculation", "Automated payslip delivery", "PF/ESI compliance integration"]
  },
  "EPF-ESI and Professional Tax Returns": {
    desc: "Periodic filing of employee provident fund, state insurance, and professional tax dues.",
    highlights: ["Mandatory monthly filing", "Avoid employee disputes", "Legal compliance security"]
  },
  "TDS Return Filing": {
    desc: "Quarterly filing of Tax Deducted at Source returns for payments like salaries, rent, and contracts.",
    highlights: ["Form 16/16A generation", "Avoid interest on delayed TDS", "Clean audit compliance"]
  },
  "E-Way Bill and E-Invoicing": {
    desc: "Setup and automated generation of transport e-way bills and e-invoices for compliant sales.",
    highlights: ["Smooth logistics/transport", "Real-time portal reporting", "GST portal synchronization"]
  },

  // Corporate
  "Change of Registration Office": {
    desc: "Legal process to change the company's registered address within or outside state boundaries.",
    highlights: ["Official address updates", "ROC filings approval", "Legal jurisdiction changes"]
  },
  "Increasing Authorized - Paid Up Capital": {
    desc: "Process to raise your company's share capital limits to issue new shares or raise capital.",
    highlights: ["Accommodate new investors", "Issue equity shares", "Formal ROC approval"]
  },
  "MoA and AoA Amendments": {
    desc: "Process to modify the Memorandum and Articles of Association to alter company objectives or bylaws.",
    highlights: ["Adapt to new business lines", "Update company regulations", "Legal compliance filing"]
  },
  "Winding Up of a Company or an LLP": {
    desc: "Official legal closure of a company or LLP to strike off its name from the ROC register.",
    highlights: ["Eliminate annual compliances", "Settle assets and liabilities", "Official legal dissolution"]
  },
  "Cancellation and Clearance Notices": {
    desc: "Responding to and managing government cancellation notices, tax audits, or clearance certificates.",
    highlights: ["Expert legal drafting", "Resolve registration issues", "Avoid department penalties"]
  },
  "Adding Directors or Promoters": {
    desc: "Appoint new directors or promoters to your company board with updated corporate documents.",
    highlights: ["Board expansion/growth", "ROC DIN activations", "Update company structure"]
  },
  "Removal of Directors or Promoters": {
    desc: "Remove or accept resignation of existing board members and file relevant forms with the ROC.",
    highlights: ["Update board structure", "Filing Form DIR-12", "Clean transition corporate records"]
  }
};

const categoryDescriptions: Record<string, { title: string; desc: string; highlights?: string[] }> = {
  "start-business": {
    title: "Start Business",
    desc: "Establish your business entity legally in India. We help you choose and setup the ideal structure—from Partnerships to Private Limited Companies.",
    highlights: ["Limited Liability options", "100% online registration", "Startup India recognition support"]
  },
  "registrations": {
    title: "Registrations & Licensing",
    desc: "Obtain mandatory government registrations, licenses, and intellectual property protections required to operate legally.",
    highlights: ["GST, PF & ESI registrations", "Trademark & brand protection", "Local municipality trade licenses"]
  },
  "taxation": {
    title: "Taxation and Filing",
    desc: "Ensure seamless compliance with tax laws. We manage periodic filings, GST returns, income tax filings, and company ROC compliance.",
    highlights: ["Income Tax ITR-1 to 7", "ROC annual filings", "EPF, ESI & TDS return filings"]
  },
  "corporate": {
    title: "Corporate Requirements",
    desc: "Manage structural changes, corporate governance updates, and the official legal closure of your business entity.",
    highlights: ["Director addition/removal", "Share capital increases", "Official company/LLP winding up"]
  }
};

interface NavbarProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  scrollToSection: (id: View) => void;
}

export function Navbar({ theme, setTheme, scrollToSection }: NavbarProps) {
  const [activeMenuValue, setActiveMenuValue] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<'start-business' | 'registrations' | 'taxation' | 'corporate'>('start-business');
  const [hoveredSubService, setHoveredSubService] = useState<string | null>(null);

  useEffect(() => {
    setHoveredSubService(null);
  }, [activeCategory]);

  const Logo = () => (
    <img
      src="/logo.png"
      alt="TRIOTAX Logo"
      className="h-8 w-8 object-contain cursor-pointer shrink-0 transition-transform duration-300 hover:scale-105"
      onClick={() => scrollToSection('hero')}
    />
  );

  return (
    <>
      <AnimatePresence>
        {activeMenuValue && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/15 dark:bg-black/40 backdrop-blur-[6px] z-40 pointer-events-none"
          />
        )}
      </AnimatePresence>
      <div className="fixed top-4 left-4 right-4 z-50 max-w-6xl mx-auto w-[calc(100%-2rem)]">
        <NavigationMenu 
          className="w-full max-w-none" 
          viewport={true}
          value={activeMenuValue}
          onValueChange={(val) => {
            setActiveMenuValue(val);
            if (val === 'services') {
              setActiveCategory('start-business');
            }
          }}
        >
        <div 
          className={cn(
            "bg-black/35 dark:bg-white/[0.05] backdrop-blur-md border border-black/15 dark:border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]",
            "h-14 w-full px-6 rounded-full flex items-center justify-between gap-4 transition-all duration-300 relative"
          )}
        >
          <div className="flex items-center gap-3">
            <Logo />
            <span className="font-sans text-sm font-extrabold tracking-wider text-neutral-800 dark:text-neutral-200 hidden sm:inline-block uppercase">
              TRIOTAX
            </span>
          </div>

          {/* Desktop Menu links directly here as part of the same root */}
          <NavigationMenuList className="hidden lg:flex flex-1 items-center justify-center gap-1">
            <NavigationMenuItem>
              <NavigationMenuLink 
                className="cursor-pointer text-[#192837] dark:text-gray-300 hover:text-[#7342E2] font-semibold text-xs px-2.5 py-1.5 transition-colors"
                onClick={() => scrollToSection('hero')}
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink 
                className="cursor-pointer text-[#192837] dark:text-gray-300 hover:text-[#7342E2] font-semibold text-xs px-2.5 py-1.5 transition-colors"
                href="#about-us"
              >
                About Us
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink 
                className="cursor-pointer text-[#192837] dark:text-gray-300 hover:text-[#7342E2] font-semibold text-xs px-2.5 py-1.5 transition-colors"
                href="#services"
              >
                Explore
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Services Dropdown */}
            <NavigationMenuItem value="services">
              <NavigationMenuTrigger className="text-[#192837] dark:text-gray-300 font-semibold text-xs cursor-pointer hover:text-[#7342E2] dark:hover:text-[#a882fa] bg-transparent hover:bg-transparent">
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex w-[1100px] max-w-[calc(100vw-3rem)] bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-xl overflow-hidden">
                  {/* Left Column: Categories */}
                  <div className="w-[220px] p-3 flex flex-col gap-1 border-r border-neutral-100 dark:border-neutral-900 bg-neutral-50/30 dark:bg-neutral-950 shrink-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 px-3 mb-2">
                      Categories
                    </span>
                    {categories.map((cat) => {
                      const isActive = activeCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onMouseEnter={() => {
                            setActiveCategory(cat.id as any);
                            setHoveredSubService(null);
                          }}
                          className={cn(
                            "w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 flex items-center justify-between cursor-pointer",
                            isActive 
                              ? "bg-[#7342E2]/10 text-[#7342E2] dark:bg-[#7342E2]/20 dark:text-[#a882fa]" 
                              : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100/50 dark:hover:bg-neutral-900/50 hover:text-neutral-950 dark:hover:text-white"
                          )}
                        >
                          <span>{cat.name}</span>
                          {isActive && (
                            <div className="h-1.5 w-1.5 rounded-full bg-[#7342E2] dark:bg-[#a882fa]" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Middle Column: Sub-Services */}
                  <div className="w-[440px] p-4 bg-white dark:bg-neutral-950 overflow-y-auto max-h-[360px] border-r border-neutral-100 dark:border-neutral-900 shrink-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 px-2 block mb-3">
                      {categories.find(c => c.id === activeCategory)?.name} Offerings
                    </span>
                    <AnimatePresence mode="wait">
                      <motion.ul
                        key={activeCategory}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5"
                      >
                        {categories.find((c) => c.id === activeCategory)?.list.map((item) => (
                          <li key={item.title}>
                            <a
                              href={`#services?service=${encodeURIComponent(item.title)}`}
                              onMouseEnter={() => setHoveredSubService(item.title)}
                              className="block select-none rounded-xl p-2 text-xs font-semibold leading-normal no-underline outline-none transition-all duration-150 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:text-[#7342E2] dark:hover:text-[#a882fa] text-neutral-700 dark:text-neutral-355 border border-transparent hover:border-neutral-100 dark:hover:border-neutral-800"
                            >
                              {item.title}
                            </a>
                          </li>
                        ))}
                      </motion.ul>
                    </AnimatePresence>
                  </div>

                  {/* Right Column: Description Pane */}
                  <div className="flex-1 p-5 bg-neutral-50/20 dark:bg-neutral-950/20 flex flex-col justify-start min-h-[320px]">
                    <AnimatePresence mode="wait">
                      {hoveredSubService && serviceDescriptions[hoveredSubService] ? (
                        <motion.div
                          key={hoveredSubService}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
                          className="flex flex-col h-full"
                        >
                          <span className="text-[9px] font-bold uppercase tracking-wider text-[#7342E2] dark:text-[#a882fa] mb-1">
                            Service Details
                          </span>
                          <h4 className="text-sm font-bold text-neutral-900 dark:text-white mb-2 leading-tight">
                            {hoveredSubService}
                          </h4>
                          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                            {serviceDescriptions[hoveredSubService].desc}
                          </p>
                          {serviceDescriptions[hoveredSubService].highlights && (
                            <div className="mt-auto pt-3 border-t border-neutral-100 dark:border-neutral-900/60">
                              <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-450 dark:text-neutral-500 block mb-2">
                                Key Highlights
                              </span>
                              <ul className="space-y-1.5">
                                {serviceDescriptions[hoveredSubService].highlights.map((highlight, idx) => (
                                  <li key={idx} className="flex items-center gap-2 text-[11px] text-neutral-655 dark:text-neutral-450">
                                    <div className="h-1.5 w-1.5 rounded-full bg-[#7342E2] dark:bg-[#a882fa] shrink-0" />
                                    <span>{highlight}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </motion.div>
                      ) : (
                        <motion.div
                          key={activeCategory}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
                          className="flex flex-col h-full"
                        >
                          <span className="text-[9px] font-bold uppercase tracking-wider text-[#7342E2] dark:text-[#a882fa] mb-1">
                            Category Overview
                          </span>
                          <h4 className="text-sm font-bold text-neutral-900 dark:text-white mb-2 leading-tight">
                            {categoryDescriptions[activeCategory]?.title}
                          </h4>
                          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                            {categoryDescriptions[activeCategory]?.desc}
                          </p>
                          {categoryDescriptions[activeCategory]?.highlights && (
                            <div className="mt-auto pt-3 border-t border-neutral-100 dark:border-neutral-900/60">
                              <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-450 dark:text-neutral-500 block mb-2">
                                Category Features
                              </span>
                              <ul className="space-y-1.5">
                                {categoryDescriptions[activeCategory].highlights.map((highlight, idx) => (
                                  <li key={idx} className="flex items-center gap-2 text-[11px] text-neutral-655 dark:text-neutral-450">
                                    <div className="h-1.5 w-1.5 rounded-full bg-[#7342E2] dark:bg-[#a882fa] shrink-0" />
                                    <span>{highlight}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink 
                className="cursor-pointer text-[#192837] dark:text-gray-300 hover:text-[#7342E2] font-semibold text-xs px-2.5 py-1.5 transition-colors"
                href="#calculator"
              >
                Calculator
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>

          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center">
              <Switch checked={theme === 'light'} onCheckedChange={(isLight) => setTheme(isLight ? 'light' : 'dark')} />
            </div>
            
            {/* Mobile Menu */}
            <MobileNav scrollToSection={scrollToSection} />
          </div>
        </div>
      </NavigationMenu>
    </div>
  </>
  );
}

function MobileNav({ 
  scrollToSection, 
}: { 
  scrollToSection: (id: View) => void; 
}) {
  const sections = [
    {
      id: 'start-business',
      name: 'Start Business',
      list: startBusinessServices,
    },
    {
      id: 'registrations',
      name: 'Registrations',
      list: registrationsServices,
    },
    {
      id: 'taxation',
      name: 'Taxation and Filing',
      list: taxationServices,
    },
    {
      id: 'corporate',
      name: 'Corporate Requirements',
      list: corporateServices,
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="rounded-full lg:hidden text-[#192837] dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer h-9 w-9">
          <MenuIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="bg-white/95 dark:bg-neutral-950/95 border-l border-neutral-200 dark:border-neutral-800 w-full max-w-sm gap-0 backdrop-blur-lg flex flex-col p-0 transition-colors duration-300"
        showClose={false}
        side="right"
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-neutral-100 dark:border-neutral-800">
          <span className="font-semibold text-neutral-900 dark:text-white">TRIOTAX Menu</span>
          <SheetClose asChild>
            <Button size="icon" variant="ghost" className="rounded-full text-[#192837] dark:text-white cursor-pointer h-9 w-9">
              <XIcon className="size-5" />
              <span className="sr-only">Close</span>
            </Button>
          </SheetClose>
        </div>
        
        <div className="flex-grow overflow-y-auto px-6 py-4">
          <Accordion type="single" collapsible className="w-full">
            {sections.map((section) => (
              <AccordionItem key={section.id} value={section.id} className="border-neutral-200 dark:border-neutral-800">
                <AccordionTrigger className="capitalize text-neutral-900 dark:text-white hover:no-underline font-medium py-3 text-sm">
                  {section.name}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="grid gap-1 pt-1">
                    {section.list.map((link) => {
                      return (
                        <li key={link.title}>
                          <SheetClose asChild>
                            <a
                              href={`#services?service=${encodeURIComponent(link.title)}`}
                              className="block py-2 px-3 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 rounded-lg transition-colors leading-normal"
                            >
                              {link.title}
                            </a>
                          </SheetClose>
                        </li>
                      );
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-6 space-y-3 flex flex-col">
            <SheetClose asChild>
              <button
                onClick={() => {
                  scrollToSection('hero');
                }}
                className="w-full text-left py-3 px-1 border-b border-neutral-200 dark:border-neutral-800 text-sm font-medium text-neutral-950 dark:text-white hover:text-[#7342E2] cursor-pointer"
              >
                Home
              </button>
            </SheetClose>

            <SheetClose asChild>
              <a
                href="#about-us"
                className="w-full text-left py-3 px-1 border-b border-neutral-200 dark:border-neutral-800 text-sm font-medium text-neutral-950 dark:text-white hover:text-[#7342E2]"
              >
                About Us
              </a>
            </SheetClose>

            <SheetClose asChild>
              <a
                href="#services"
                className="w-full text-left py-3 px-1 border-b border-neutral-200 dark:border-neutral-800 text-sm font-medium text-neutral-950 dark:text-white hover:text-[#7342E2]"
              >
                Explore
              </a>
            </SheetClose>

            <SheetClose asChild>
              <a
                href="#calculator"
                className="w-full text-left py-3 px-1 border-b border-neutral-200 dark:border-neutral-800 text-sm font-medium text-neutral-950 dark:text-white hover:text-[#7342E2]"
              >
                Calculator
              </a>
            </SheetClose>
          </div>
        </div>

        <div className="p-6 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50 flex flex-col gap-3">
          <button className="w-full py-3 rounded-full bg-[#7342E2] text-white font-medium shadow-md cursor-pointer hover:bg-[#6232d1] transition-all text-sm">
            Start For Free
          </button>
          <button className="w-full py-3 rounded-full border border-neutral-300 dark:border-neutral-700 text-[#192837] dark:text-white font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer text-sm">
            Sign In
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
