import { useState, useEffect, useMemo } from "react";
import { DotGlobeHero } from "@/components/ui/globe-hero";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Zap, 
  Search, 
  BookOpen, 
  ChevronDown, 
  ChevronRight, 
  Check, 
  Home, 
  FileText, 
  HelpCircle, 
  Layers, 
  ChevronLeft
} from "lucide-react";

// Dataset for categories and services
const CATEGORIES_DATA = [
  {
    id: "start-business",
    name: "Business Startup Setup",
    services: [
      {
        title: "Partnership",
        duration: "3 days",
        tag: "POPULAR" as const,
        desc: "A business structure owned by two or more individuals. Ideal for small co-owned businesses.",
        highlights: ["Easy setup", "Low compliance costs", "Shared responsibility"],
        steps: [
          "Consultation & Partner Details Collection",
          "Partnership Deed Drafting & Review",
          "Notary and Stamp Duty Payment",
          "PAN Card & Registration Application",
          "Bank Account Opening Support"
        ],
        documents: [
          { name: "PAN of all partners", desc: "For tax identity validation" },
          { name: "Aadhaar / ID proof", desc: "For address & identity verification" },
          { name: "Address proof of business", desc: "Utility bill or rent agreement" },
          { name: "Partnership Deed", desc: "Notarized contract between partners" }
        ],
        price: "1,999"
      },
      {
        title: "Private Limited Company",
        duration: "10 days",
        tag: "RECOMMENDED" as const,
        desc: "The most popular corporate structure in India, offering limited liability and high credibility for startups.",
        highlights: ["Limited liability protection", "Separate legal entity", "Easy to raise capital"],
        steps: [
          "DSC (Digital Signature Certificate) creation",
          "Name approval application (RUN)",
          "SPICe+ Incorporation filing",
          "PAN/TAN issuance",
          "Bank account opening support"
        ],
        documents: [
          { name: "PAN of directors", desc: "Mandatory tax identity" },
          { name: "Aadhaar / Passport", desc: "Identity & address verification" },
          { name: "Proof of registered office", desc: "Electricity bill or gas bill" },
          { name: "NOC from property owner", desc: "No objection certificate" }
        ],
        price: "5,999"
      },
      {
        title: "One Person Company",
        duration: "7 days",
        tag: "STANDARD" as const,
        desc: "A corporate structure that allows a single entrepreneur to operate a corporate entity with limited liability.",
        highlights: ["Single owner control", "Limited liability", "Fewer compliance requirements"],
        steps: [
          "DSC of director & nominee",
          "Name reservation",
          "MoA & AoA drafting",
          "Incorporation form submission",
          "PAN & TAN creation"
        ],
        documents: [
          { name: "PAN card of owner & nominee", desc: "Mandatory tax registration" },
          { name: "Aadhaar card of owner & nominee", desc: "For physical identity confirmation" },
          { name: "Office address proof", desc: "Utility bill not older than 2 months" },
          { name: "Nominee consent form", desc: "Form INC-3" }
        ],
        price: "4,999"
      },
      {
        title: "Indian Subsidiary",
        duration: "15 days",
        tag: "FAST TRACK" as const,
        desc: "A company setup for foreign parent businesses to establish their presence and operations in India.",
        highlights: ["100% foreign FDI allowed", "Separate Indian entity status", "Strategic local market access"],
        steps: [
          "DSC of foreign directors",
          "FDI compliance check",
          "Name approval (RUN)",
          "SPICe+ incorporation forms",
          "RBI filings (FC-GPR)"
        ],
        documents: [
          { name: "Passport of foreign directors", desc: "Apostilled in home country" },
          { name: "Parent company board resolution", desc: "Authorizing the Indian setup" },
          { name: "COI of parent company", desc: "Apostilled incorporation proof" },
          { name: "Registered office address proof", desc: "NOC and utility bill" }
        ],
        price: "19,999"
      },
      {
        title: "Section 8 Company",
        duration: "12 days",
        tag: "STANDARD" as const,
        desc: "A non-profit company established to promote commerce, art, science, sports, education, and charity.",
        highlights: ["Exempt from stamp duty", "High credibility/trust", "Eligible for tax exemptions"],
        steps: [
          "DSC setup",
          "Name approval (RUN NGO)",
          "License application under Section 8",
          "Incorporation documents filing",
          "PAN/TAN allocation"
        ],
        documents: [
          { name: "PAN and ID of directors", desc: "For tax records validation" },
          { name: "Estimated 3-year future income", desc: "Projected budget statements" },
          { name: "Declaration by professionals", desc: "Form INC-14/15" },
          { name: "MoA & AoA of Section 8", desc: "Customized for charity goals" }
        ],
        price: "8,999"
      },
      {
        title: "Trust Registration",
        duration: "10 days",
        tag: "STANDARD" as const,
        desc: "Establish a charitable trust to perform social, educational, and philanthropic activities.",
        highlights: ["Simple legal structure", "Long-term social impact", "Tax benefits for donations"],
        steps: [
          "Trust deed drafting",
          "Determining trustees & objects",
          "Appointment with Sub-Registrar",
          "Physical registration at office",
          "PAN/TAN registration"
        ],
        documents: [
          { name: "Trustees ID and Aadhaar", desc: "All board members" },
          { name: "Draft Trust Deed", desc: "On required value stamp paper" },
          { name: "Rent agreement of trust office", desc: "With NOC from landlord" },
          { name: "Two witnesses with ID proof", desc: "Required for registration" }
        ],
        price: "6,999"
      },
      {
        title: "Limited Liability Partnership Company-LLP",
        duration: "8 days",
        tag: "RECOMMENDED" as const,
        desc: "Combines the benefits of a partnership with the limited liability features of a company.",
        highlights: ["No partner liability for others", "Flexible internal structure", "No minimum capital limit"],
        steps: [
          "DSC of partners",
          "RUN-LLP name reservation",
          "FiLLiP incorporation form",
          "LLP agreement drafting",
          "LLP agreement filing (Form 3)"
        ],
        documents: [
          { name: "PAN & Aadhaar of partners", desc: "For identity checks" },
          { name: "Rent agreement of office", desc: "Address registration" },
          { name: "Utility bill & NOC", desc: "Electricity/Gas bill" },
          { name: "Drafted LLP Agreement", desc: "Filing after incorporation" }
        ],
        price: "4,499"
      },
      {
        title: "Public Limited Company",
        duration: "15 days",
        tag: "STANDARD" as const,
        desc: "A corporate structure for large organizations planning to offer shares to the general public.",
        highlights: ["Unlimited shareholders", "High capital capability", "Easily transferable shares"],
        steps: [
          "DSC of 3 directors",
          "DIN application",
          "Name approval",
          "SPICe+ incorporation forms",
          "Certificate of commencement of business"
        ],
        documents: [
          { name: "ID & Address proof of 3 directors", desc: "Minimum requirement" },
          { name: "Office address proof & NOC", desc: "For business seat verification" },
          { name: "MoA & AoA drafts", desc: "Charter documents" },
          { name: "Consent of directors (DIR-2)", desc: "Form declaration" }
        ],
        price: "14,999"
      },
      {
        title: "Proprietorship",
        duration: "2 days",
        tag: "POPULAR" as const,
        desc: "The simplest business structure owned and operated by a single person. Perfect for solo freelancers and shops.",
        highlights: ["Super fast registration", "Direct owner control", "Minimal corporate compliance"],
        steps: [
          "Business name selection",
          "GST or MSME application",
          "Bank account verification",
          "Tax profile setup"
        ],
        documents: [
          { name: "PAN Card of owner", desc: "Mandatory tax record" },
          { name: "Aadhaar Card of owner", desc: "Identity proof" },
          { name: "Office address proof / Rent deed", desc: "If running from home, home bill is fine" },
          { name: "NOC / Utility bill", desc: "Verification of place" }
        ],
        price: "999"
      }
    ]
  },
  {
    id: "registrations",
    name: "Basic Registrations & License",
    services: [
      {
        title: "PF Registration",
        duration: "3 days",
        tag: "MANDATORY" as const,
        desc: "Register for the Provident Fund scheme to secure retirement benefits for your employees.",
        highlights: ["Mandatory for 20+ employees", "Social security support", "Tax-deductible contributions"],
        steps: [
          "Employer profile creation on EPFO portal",
          "Details submission of business and PAN",
          "Digital Signature attachment",
          "PF Code allocation"
        ],
        documents: [
          { name: "PAN of the business", desc: "Company or firm PAN" },
          { name: "COI / Partnership Deed", desc: "Entity establishment proof" },
          { name: "Cancelled cheque of bank", desc: "Bank details validation" },
          { name: "List of employees", desc: "With joining dates" }
        ],
        price: "1,499"
      },
      {
        title: "ESI Registration",
        duration: "3 days",
        tag: "MANDATORY" as const,
        desc: "Employee State Insurance provides medical and cash benefits to employees for sickness and maternity.",
        highlights: ["Health insurance coverage", "Maternity & disability support", "Mandatory for 10+ employees"],
        steps: [
          "Employer registration on ESIC portal",
          "Form 1 submission with details",
          "DSC registration",
          "ESI registration certificate"
        ],
        documents: [
          { name: "Registration certificate of business", desc: "Incorporation or license" },
          { name: "PAN of company & directors", desc: "Tax details check" },
          { name: "Employee list with salaries", desc: "Earnings details" },
          { name: "Bank details of company", desc: "Cancelled cheque leaf" }
        ],
        price: "1,499"
      },
      {
        title: "Professional Tax Registration",
        duration: "2 days",
        tag: "MANDATORY" as const,
        desc: "State-level tax registration required for businesses employing staff or practicing professionals.",
        highlights: ["Mandatory state compliance", "Employee salary deduction", "Avoid penalty charges"],
        steps: [
          "State commercial tax department application",
          "Entity type declaration",
          "Officer review & approval",
          "PT certificate issuance"
        ],
        documents: [
          { name: "Business establishment proof", desc: "GST or shops registration" },
          { name: "PAN of business/directors", desc: "Tax identity records" },
          { name: "Bank account statement", desc: "Financial proof" },
          { name: "Proof of address of office", desc: "Rent deed / electricity bill" }
        ],
        price: "1,299"
      },
      {
        title: "GST Registration",
        duration: "3 days",
        tag: "POPULAR" as const,
        desc: "Get registered under the Goods and Services Tax to legally sell products/services and claim input tax credits.",
        highlights: ["Mandatory for threshold limits", "Claim input tax credits", "Legally sell interstate"],
        steps: [
          "TRN (Temporary Reference Number) generation",
          "GST Part-B application submission",
          "Aadhaar authentication",
          "Officer verification & approval",
          "GSTIN allocation"
        ],
        documents: [
          { name: "PAN & Aadhaar of promoter", desc: "Proprietor/partners/directors" },
          { name: "Business address proof", desc: "Electricity bill / property tax bill" },
          { name: "Consent / Rent Agreement", desc: "Permission to use property" },
          { name: "Cancelled cheque", desc: "Verification of bank account" }
        ],
        price: "999"
      },
      {
        title: "Import Export Code Registration",
        duration: "1 day",
        tag: "FAST TRACK" as const,
        desc: "Required by the DGFT for businesses importing goods into or exporting goods out of India.",
        highlights: ["Lifetime validity", "No renewal needed", "Essential for global trade"],
        steps: [
          "DGFT portal registration",
          "ANF 2A application filing",
          "Application fee payment",
          "Instant certificate generation"
        ],
        documents: [
          { name: "PAN card of business/individual", desc: "Tax record validation" },
          { name: "Aadhaar Card", desc: "Identity confirmation" },
          { name: "Bank certificate / Cancelled cheque", desc: "Active current account proof" },
          { name: "Address proof of entity", desc: "Ownership doc or rent deed" }
        ],
        price: "1,499"
      },
      {
        title: "ICEGATE Registration",
        duration: "4 days",
        tag: "STANDARD" as const,
        desc: "Registration on the Indian Customs Electronic Gateway for handling customs documents and e-filings.",
        highlights: ["Fast customs clearance", "Online document tracking", "Direct duty payments"],
        steps: [
          "ICEGATE portal registration",
          "Role declaration (Importer/Exporter)",
          "Verification of IEC details",
          "Customs approval & credentials setup"
        ],
        documents: [
          { name: "IEC Certificate", desc: "Import Export Code" },
          { name: "Aadhaar / Passport of owner", desc: "ID confirmation" },
          { name: "Digital Signature Certificate", desc: "For signing declarations" },
          { name: "Authorization letter", desc: "Signed by board/promoter" }
        ],
        price: "2,999"
      },
      {
        title: "Digital Signature Certificate",
        duration: "1 day",
        tag: "FAST TRACK" as const,
        desc: "Get a secure e-signature certificate for filing corporate taxes, e-tenders, and legal documents.",
        highlights: ["Class 3 secure level", "Paperless validation", "2-year or 3-year validity"],
        steps: [
          "Application submission with profile details",
          "Video verification by applicant",
          "Aadhaar OTP approval",
          "USB token dispatch or cloud activation"
        ],
        documents: [
          { name: "Aadhaar card copy", desc: "Linked with mobile number" },
          { name: "PAN Card copy", desc: "For direct identification" },
          { name: "Applicant video recording", desc: "30-second verification clip" }
        ],
        price: "799"
      },
      {
        title: "Trade License Registration",
        duration: "7 days",
        tag: "STANDARD" as const,
        desc: "Local municipality license authorizing a business to conduct commercial activities in a specific area.",
        highlights: ["Locality compliance", "Public safety validation", "Avoid municipal fines"],
        steps: [
          "Municipal corporation online application",
          "Category selection (Trade/Commerce)",
          "Verification of address & property tax",
          "Physical inspection by municipal inspector",
          "License fee payment & issuance"
        ],
        documents: [
          { name: "Property tax receipt", desc: "Latest cleared municipal tax" },
          { name: "Rent deed / Lease contract", desc: "Proof of occupation" },
          { name: "NOC from neighbors", desc: "Depending on trade activity" },
          { name: "Consent of partners/directors", desc: "Authorized signature" }
        ],
        price: "2,499"
      },
      {
        title: "Trademark Registration",
        duration: "2 days",
        tag: "RECOMMENDED" as const,
        desc: "Protect your brand name, logo, or slogan from being copied or misused by competitors.",
        highlights: ["Exclusive brand ownership", "Legal asset creation", "Use the ® symbol"],
        steps: [
          "Trademark search (uniqueness check)",
          "Class selection (under Nice Classification)",
          "Application filing (TM-A)",
          "Generation of trademark application receipt",
          "Monitoring representation during examination"
        ],
        documents: [
          { name: "Logo or Brand artwork", desc: "High quality JPEG/PNG file" },
          { name: "User affidavit", desc: "If using brand before filing date" },
          { name: "MSME / Udyam certificate", desc: "For 50% government fee discount" },
          { name: "Authorization form (TM-48)", desc: "Empowering our lawyers to file" }
        ],
        price: "1,999"
      },
      {
        title: "Shops and Establishment Registration-Labour lic",
        duration: "3 days",
        tag: "MANDATORY" as const,
        desc: "Mandatory license for commercial shops, offices, and establishments operating within state limits.",
        highlights: ["Proof of business premises", "Labour welfare compliance", "Opens business bank accounts"],
        steps: [
          "State labour department online filing",
          "Number of employees declaration",
          "Fee payment based on staff count",
          "Instant certificate generation in most states"
        ],
        documents: [
          { name: "PAN of owner/business", desc: "Tax registry check" },
          { name: "Aadhaar Card of owner", desc: "Personal identity" },
          { name: "Shop / Office photo", desc: "Showing name board clearly" },
          { name: "Utility bill of premises", desc: "Electricity or telephone bill" }
        ],
        price: "1,499"
      },
      {
        title: "CLRA License -Contract Labour License",
        duration: "10 days",
        tag: "STANDARD" as const,
        desc: "License under the Contract Labour Act for employers hiring contract labour through agencies.",
        highlights: ["Mandatory for 20+ contract staff", "Ensures labour welfare", "Protects main employer"],
        steps: [
          "Form V registration from principal employer",
          "Contractor application on Shram Suvidha portal",
          "Security deposit payment",
          "Licensing officer approval"
        ],
        documents: [
          { name: "Form V (Certificate of Principal Employer)", desc: "Issued by client entity" },
          { name: "Contractor PAN & GST", desc: "Business registration details" },
          { name: "Security deposit challan", desc: "Government fee payment proof" },
          { name: "Details of contract work", desc: "Nature of work & timeline" }
        ],
        price: "4,999"
      },
      {
        title: "BOCW Registration",
        duration: "12 days",
        tag: "STANDARD" as const,
        desc: "Building and Other Construction Workers registration to protect worker safety and welfare.",
        highlights: ["Safety compliance", "Eligible for worker welfare fund", "Avoid construction halts"],
        steps: [
          "State BOCW board application",
          "Details of project estimate",
          "Labour count declaration",
          "Approval by registration officer"
        ],
        documents: [
          { name: "Project plan approval", desc: "By local development authority" },
          { name: "PAN & COI of constructor", desc: "Entity documents" },
          { name: "Construction project cost estimate", desc: "Calculation of cess payable" },
          { name: "Safety measures affidavit", desc: "Declaration of safe work conditions" }
        ],
        price: "7,999"
      },
      {
        title: "Udyam-MSME Registration",
        duration: "1 day",
        tag: "POPULAR" as const,
        desc: "Register under MSME to qualify for government schemes, subsidies, and lower interest loans.",
        highlights: ["Collateral-free bank loans", "Protection against late payments", "Lower patent/trademark fees"],
        steps: [
          "Udyam registration portal filing",
          "Aadhaar OTP authorization",
          "NIC code selection for activities",
          "Instant certificate generation"
        ],
        documents: [
          { name: "Aadhaar Card of promoter", desc: "Must be linked to mobile" },
          { name: "PAN of owner/company", desc: "Verified via portal integration" },
          { name: "Bank Account details", desc: "Account number & IFSC code" },
          { name: "Investment & turnover values", desc: "Self-declaration" }
        ],
        price: "499"
      }
    ]
  },
  {
    id: "taxation",
    name: "Income Tax & GST Filings",
    services: [
      {
        title: "Income Tax Filings-ITR-1 to 7",
        duration: "3 days",
        tag: "POPULAR" as const,
        desc: "Accurate filing of annual income tax returns for individuals, partnerships, companies, and trusts.",
        highlights: ["Avoid late filing penalties", "Crucial for visa/loan approval", "Optimize tax liability deductions"],
        steps: [
          "Document verification & income calculation",
          "Selection of appropriate ITR form",
          "Tax computation and optimization review",
          "E-filing on IT portal",
          "E-verification by OTP authentication"
        ],
        documents: [
          { name: "Form 16 / 16A", desc: "Salary tax certificates" },
          { name: "Form 26AS / AIS", desc: "Annual information statement" },
          { name: "Bank Statements", desc: "All active accounts for financial year" },
          { name: "Investment proofs", desc: "LIC, ELSS, PPF receipts (80C/D)" }
        ],
        price: "999"
      },
      {
        title: "ROC Filings for PVT-LLP",
        duration: "5 days",
        tag: "MANDATORY" as const,
        desc: "Mandatory annual filing of financial statements and returns with the Registrar of Companies.",
        highlights: ["Maintain active company status", "Avoid high daily penalties", "Build corporate transparency"],
        steps: [
          "Audit of financial statements",
          "Drafting director report and resolutions",
          "Filing AOC-4 (Financial statements)",
          "Filing MGT-7 (Annual return)",
          "Filing Form 11 / Form 8 for LLPs"
        ],
        documents: [
          { name: "Audited Balance Sheet", desc: "Signed by CA & Directors" },
          { name: "Profit & Loss Account", desc: "For filing financial year" },
          { name: "Director's Report", desc: "Annual activities report" },
          { name: "DSC of 2 directors", desc: "For digital signing verification" }
        ],
        price: "3,499"
      },
      {
        title: "GST Returns and Filings",
        duration: "3 days",
        tag: "MANDATORY" as const,
        desc: "Monthly, quarterly, and annual return filings (GSTR-1, GSTR-3B) to keep your GST status active.",
        highlights: ["Clean compliance record", "Pass tax credits to clients", "Timely interest savings"],
        steps: [
          "Reconciliation of purchase & sales invoices",
          "GSTR-1 data upload (Outward supplies)",
          "GSTR-2B Input Tax Credit reconciliation",
          "GSTR-3B compilation & tax payment",
          "E-filing confirmation receipt"
        ],
        documents: [
          { name: "Sales register / invoices", desc: "Total invoices issued" },
          { name: "Purchase invoices", desc: "For claiming ITC credits" },
          { name: "GST portal credentials", desc: "For secure account login" }
        ],
        price: "799"
      },
      {
        title: "Payroll",
        duration: "Ongoing",
        tag: "RECOMMENDED" as const,
        desc: "Complete employee payroll processing including payslips, deductions, and tax compliance.",
        highlights: ["Accurate salary calculation", "Automated payslip delivery", "PF/ESI compliance integration"],
        steps: [
          "Attendance & leave collection",
          "Salary calculation with allowances/deductions",
          "TDS/PF/ESI deductions computation",
          "Payslip generation & email dispatch",
          "Salary bank transfer list preparation"
        ],
        documents: [
          { name: "Employee attendance data", desc: "Worked days & leaves" },
          { name: "Salary structures / CTC", desc: "Details of allowances" },
          { name: "New joinee details", desc: "Bank accounts & PAN/Aadhaar" }
        ],
        price: "2,499/mo"
      },
      {
        title: "EPF-ESI and Professional Tax Returns",
        duration: "Monthly",
        tag: "MANDATORY" as const,
        desc: "Periodic filing of employee provident fund, state insurance, and professional tax dues.",
        highlights: ["Mandatory monthly filing", "Avoid employee disputes", "Legal compliance security"],
        steps: [
          "ECR file generation for PF portal",
          "Challan generation for ESI payment",
          "PT deduction aggregation by state",
          "Portal uploads & payment clearance",
          "Filing acknowledgement receipt save"
        ],
        documents: [
          { name: "PF / ESI contribution sheet", desc: "Salary deductions table" },
          { name: "PT employee list", desc: "State specific employee count" },
          { name: "Employer portal logins", desc: "EPFO, ESIC & PT credentials" }
        ],
        price: "1,999/mo"
      },
      {
        title: "TDS Return Filing",
        duration: "Quarterly",
        tag: "MANDATORY" as const,
        desc: "Quarterly filing of Tax Deducted at Source returns for payments like salaries, rent, and contracts.",
        highlights: ["Form 16/16A generation", "Avoid interest on delayed TDS", "Clean audit compliance"],
        steps: [
          "Challan reconciliation with NSDL database",
          "Form 24Q (Salary) or 26Q (Non-salary) drafting",
          "Validation of PANs of deductees",
          "FVU file creation & validation via NSDL utility",
          "Upload of return & generation of Form 16/16A"
        ],
        documents: [
          { name: "TDS Challan receipts", desc: "Tax paid certificates" },
          { name: "Deductee details & PAN", desc: "Correct numbers are mandatory" },
          { name: "Payment details matrix", desc: "Amount paid & date" }
        ],
        price: "1,499"
      },
      {
        title: "E-Way Bill and E-Invoicing",
        duration: "Instant",
        tag: "FAST TRACK" as const,
        desc: "Setup and automated generation of transport e-way bills and e-invoices for compliant sales.",
        highlights: ["Smooth logistics/transport", "Real-time portal reporting", "GST portal synchronization"],
        steps: [
          "API registration on NIC portal",
          "ERP integration or excel utility setup",
          "Invoice generation with IRN details",
          "QR code embedding on invoices",
          "E-Way bill generation linked to e-invoice"
        ],
        documents: [
          { name: "Tax Invoice details", desc: "Standard sales invoice copy" },
          { name: "Transporter ID & Vehicle number", desc: "For transport documentation" },
          { name: "GSTIN of both parties", desc: "Seller and buyer" }
        ],
        price: "499"
      }
    ]
  },
  {
    id: "corporate",
    name: "Company/LLP Compliance",
    services: [
      {
        title: "Change of Registration Office",
        duration: "7 days",
        tag: "STANDARD" as const,
        desc: "Legal process to change the company's registered address within or outside state boundaries.",
        highlights: ["Official address updates", "ROC filings approval", "Legal jurisdiction changes"],
        steps: [
          "Board meeting & resolution approval",
          "Drafting of advertisement (if shifting state)",
          "Filing Form INC-22 (registered office notice)",
          "Filing Form MGT-14 (special resolution)",
          "ROC approval of address change"
        ],
        documents: [
          { name: "Board Resolution copy", desc: "Authorizing the shift" },
          { name: "New address proof", desc: "Rent agreement & gas/electric bill" },
          { name: "NOC from property owner", desc: "Authorization to use office" },
          { name: "Special Resolution copy", desc: "Approved by shareholders" }
        ],
        price: "2,999"
      },
      {
        title: "Increasing Authorized - Paid Up Capital",
        duration: "5 days",
        tag: "STANDARD" as const,
        desc: "Process to raise your company's share capital limits to issue new shares or raise capital.",
        highlights: ["Accommodate new investors", "Issue equity shares", "Formal ROC approval"],
        steps: [
          "Board meeting and EGM calling",
          "Shareholder approval of MoA amendment",
          "Filing Form SH-7 (authorized capital increase)",
          "Payment of stamp duty on government portal",
          "Filing Form PAS-3 for allotment of shares"
        ],
        documents: [
          { name: "EGM Special Resolution", desc: "Shareholder approval certificate" },
          { name: "Amended MoA & AoA", desc: "With updated capital clause" },
          { name: "Board Resolution for allotment", desc: "Authorizing new issuance" },
          { name: "PAS-3 details matrix", desc: "Allotment list & values" }
        ],
        price: "3,999"
      },
      {
        title: "MoA and AoA Amendments",
        duration: "6 days",
        tag: "STANDARD" as const,
        desc: "Process to modify the Memorandum and Articles of Association to alter company objectives or bylaws.",
        highlights: ["Adapt to new business lines", "Update company regulations", "Legal compliance filing"],
        steps: [
          "Board resolution of MoA/AoA alterations",
          "EGM notice distribution to shareholders",
          "Shareholder special resolution execution",
          "Filing Form MGT-14 with ROC",
          "Receipt of ROC approval certificate"
        ],
        documents: [
          { name: "Copy of EGM Special Resolution", desc: "Shareholder consent proof" },
          { name: "Draft of altered MoA & AoA", desc: "Clearly highlighting changes" },
          { name: "Board resolution details", desc: "Board approval certificate" }
        ],
        price: "2,499"
      },
      {
        title: "Winding Up of a Company or an LLP",
        duration: "30 days",
        tag: "STANDARD" as const,
        desc: "Official legal closure of a company or LLP to strike off its name from the ROC register.",
        highlights: ["Eliminate annual compliances", "Settle assets and liabilities", "Official legal dissolution"],
        steps: [
          "Closure of active bank accounts",
          "Statement of assets and liabilities preparation",
          "Filing Form STK-2 (Strike off application)",
          "Verification by ROC and publishing public notice",
          "Dissolution certificate issued by registrar"
        ],
        documents: [
          { name: "Indemnity Bond", desc: "Form STK-3 signed by directors" },
          { name: "Affidavit of closure", desc: "Form STK-4 signed by board" },
          { name: "Statement of accounts", desc: "Certified by Chartered Accountant" },
          { name: "NOC from income tax department", desc: "Tax clearance proof" }
        ],
        price: "9,999"
      },
      {
        title: "Cancellation and Clearance Notices",
        duration: "15 days",
        tag: "STANDARD" as const,
        desc: "Responding to and managing government cancellation notices, tax audits, or clearance certificates.",
        highlights: ["Expert legal drafting", "Resolve registration issues", "Avoid department penalties"],
        steps: [
          "Notice analysis & department verification",
          "Gathering of supportive tax filings/invoices",
          "Drafting official legal representation",
          "Filing response on government portal",
          "Hearing representation before officer (if needed)"
        ],
        documents: [
          { name: "Original government notice copy", desc: "Showing DIN or Reference number" },
          { name: "Past filing details & invoices", desc: "Relevant to notice period" },
          { name: "Power of Attorney (PoA)", desc: "Empowering our advisor" }
        ],
        price: "3,499"
      },
      {
        title: "Adding Directors or Promoters",
        duration: "3 days",
        tag: "RECOMMENDED" as const,
        desc: "Appoint new directors or promoters to your company board with updated corporate documents.",
        highlights: ["Board expansion/growth", "ROC DIN activations", "Update company structure"],
        steps: [
          "Board meeting & resolution passing",
          "DIN application for proposed director (DIR-3)",
          "Consent and declaration from director (DIR-2/DIR-8)",
          "Filing Form DIR-12 with ROC",
          "ROC update confirmation approval"
        ],
        documents: [
          { name: "PAN & Aadhaar of new director", desc: "Identity confirmation" },
          { name: "Consent Form DIR-2", desc: "Consent to act as director" },
          { name: "Intimation Form DIR-8", desc: "Non-disqualification certificate" },
          { name: "Board Resolution copy", desc: "Authorizing the appointment" }
        ],
        price: "1,999"
      },
      {
        title: "Removal of Directors or Promoters",
        duration: "3 days",
        tag: "STANDARD" as const,
        desc: "Remove or accept resignation of existing board members and file relevant forms with the ROC.",
        highlights: ["Update board structure", "Filing Form DIR-12", "Clean transition corporate records"],
        steps: [
          "Resignation letter collection or board notice",
          "Board meeting & resolution approval",
          "Filing Form DIR-12 with ROC within 30 days",
          "Updating registers of directors & members",
          "ROC notification receipt save"
        ],
        documents: [
          { name: "Resignation letter copy", desc: "With formal resignation reasons" },
          { name: "Board Resolution copy", desc: "Accepting the resignation" },
          { name: "DIR-12 details sheet", desc: "Filing parameters document" }
        ],
        price: "1,999"
      }
    ]
  }
];

export default function ServicesPage({ theme: _theme }: { theme?: "light" | "dark" }) {
  // Navigation handlers
  const handleConsult = () => {
    window.location.hash = "#contact";
  };

  const handleLiveDemo = () => {
    window.location.hash = "#calculator";
  };

  // State management
  const [selectedService, setSelectedService] = useState<string>("Partnership");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>("start-business");

  // Sync hash routing (e.g. #services?service=GST%20Registration)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#services")) {
        const urlParams = new URLSearchParams(hash.split("?")[1] || "");
        const serviceParam = urlParams.get("service");
        if (serviceParam) {
          // Find if this service exists in our data
          const exists = CATEGORIES_DATA.some(cat => 
            cat.services.some(serv => serv.title.toLowerCase() === serviceParam.toLowerCase())
          );
          if (exists) {
            // Find and set correct title casing
            let matchedTitle = serviceParam;
            CATEGORIES_DATA.forEach(cat => {
              const found = cat.services.find(serv => serv.title.toLowerCase() === serviceParam.toLowerCase());
              if (found) {
                matchedTitle = found.title;
                // Auto expand parent category (close others)
                setExpandedCategory(cat.id);
              }
            });
            setSelectedService(matchedTitle);
          }
        }
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Find currently active service object
  const activeService = useMemo(() => {
    for (const cat of CATEGORIES_DATA) {
      const serv = cat.services.find(s => s.title === selectedService);
      if (serv) return { ...serv, categoryId: cat.id, categoryName: cat.name };
    }
    // Fallback
    return {
      ...CATEGORIES_DATA[0].services[0],
      categoryId: CATEGORIES_DATA[0].id,
      categoryName: CATEGORIES_DATA[0].name
    };
  }, [selectedService]);

  // Toggle category expansion (accordion mode: open one, close others)
  const toggleCategory = (id: string) => {
    setExpandedCategory(prev => prev === id ? null : id);
  };

  // Filtered services based on search query
  const filteredCategoriesData = useMemo(() => {
    if (!searchQuery.trim()) return CATEGORIES_DATA;
    
    return CATEGORIES_DATA.map(cat => {
      const filteredServices = cat.services.filter(s => 
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.desc.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return {
        ...cat,
        services: filteredServices
      };
    }).filter(cat => cat.services.length > 0);
  }, [searchQuery]);

  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      {/* SECTION 1: Globe Hero Header */}
      <DotGlobeHero
        rotationSpeed={0.003}
        className="bg-gradient-to-br from-background via-background/95 to-[#7342E2]/5 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-background/30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7342E2]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#7342E2]/3 rounded-full blur-3xl animate-pulse" />

        <div className="relative z-10 text-center space-y-12 max-w-5xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#7342E2]/20 via-[#7342E2]/10 to-[#7342E2]/20 border border-[#7342E2]/30 backdrop-blur-xl shadow-2xl"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7342E2]/10 via-transparent to-[#7342E2]/10 animate-pulse" />
              <div className="w-2 h-2 bg-[#7342E2] rounded-full animate-ping" />
              <span className="relative z-10 text-sm font-bold text-[#7342E2] dark:text-[#a882fa] tracking-wider uppercase">GLOBAL NETWORK</span>
              <div className="w-2 h-2 bg-[#7342E2] rounded-full animate-ping animation-delay-500" />
            </motion.div>

            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-5xl md:text-7xl lg:text-8xl lg:leading-[0.85] font-black tracking-tighter select-none"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                <span className="block font-light text-foreground/70 mb-3 text-4xl md:text-6xl lg:text-7xl">
                  Connect
                </span>
                <span className="block relative">
                  <span className="bg-gradient-to-br from-[#7342E2] via-[#7342E2] to-[#a882fa] bg-clip-text text-transparent font-black relative z-10">
                    the World
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7342E2] via-[#7342E2] to-[#a882fa] bg-clip-text text-transparent font-black blur-2xl opacity-50 scale-105"
                       style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    the World
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
                    className="absolute -bottom-6 left-0 h-3 bg-gradient-to-r from-[#7342E2] via-[#7342E2]/80 to-transparent rounded-full shadow-lg shadow-[#7342E2]/50"
                  />
                </span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="max-w-3xl mx-auto space-y-4"
            >
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium"
                 style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Experience real-time global connectivity with our{" "}
                <span className="text-foreground font-semibold bg-gradient-to-r from-[#7342E2]/20 to-[#7342E2]/10 px-2 py-1 rounded-md">
                  distributed network infrastructure
                </span>
              </p>
              <p className="text-lg text-muted-foreground/80 leading-relaxed">
                Monitor data flows, track performance, and scale across continents with unprecedented reliability.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.2), 0 0 25px hsl(var(--primary) / 0.3)",
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
              onClick={handleConsult}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#7342E2] via-[#7342E2] to-[#a882fa]/90 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-[#7342E2]/30 transition-all duration-500 overflow-hidden border border-[#7342E2]/25 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8 }}
              />
              <span className="relative z-10 tracking-wide">Consult Expert</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(115, 66, 226, 0.1)",
                borderColor: "#7342E2",
                boxShadow: "0 15px 30px rgba(0,0,0,0.1), 0 0 15px rgba(115, 66, 226, 0.1)",
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLiveDemo}
              className="group relative inline-flex items-center gap-3 px-8 py-4 border-2 border-neutral-350 dark:border-neutral-900 rounded-xl font-semibold text-lg transition-all duration-500 backdrop-blur-xl bg-background/60 hover:bg-background/90 shadow-lg overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#7342E2]/5 via-transparent to-[#7342E2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Zap className="relative z-10 w-5 h-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 text-[#7342E2] dark:text-[#a882fa]" />
              <span className="relative z-10 tracking-wide">View Cost Calculator</span>
            </motion.button>
          </motion.div>
        </div>
      </DotGlobeHero>

      {/* SECTION 2: Full Width Services Dashboard */}
      <div className="w-full border-t border-neutral-200 dark:border-neutral-900 bg-[#fafafa] dark:bg-black">
        <div className="w-full flex flex-col lg:flex-row min-h-[700px]">
          
          {/* 1. LEFT SIDEBAR: SERVICES OUTLINE */}
          <div className="w-full lg:w-80 border-r border-neutral-200 dark:border-neutral-900 bg-neutral-50 dark:bg-black flex flex-col shrink-0">
            
            {/* Sidebar Header */}
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-900 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-neutral-800 dark:text-neutral-200 text-sm">
                <BookOpen className="w-4 h-4 text-[#7342E2]" />
                <span>Services Outline</span>
              </div>
              <div className="bg-[#7342E2]/15 text-[#7342E2] dark:text-[#a882fa] text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Live
              </div>
            </div>

            {/* Search Bar */}
            <div className="p-3 border-b border-neutral-200 dark:border-neutral-900">
              <div className="relative flex items-center">
                <Search className="absolute left-3 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search services outline..."
                  className="w-full pl-9 pr-4 py-2 bg-neutral-100 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-xl text-xs text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 focus:outline-none focus:border-[#7342E2] transition-colors"
                />
              </div>
            </div>

            {/* Service Outline Scroll Area */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1.5 custom-scrollbar max-h-[300px] lg:max-h-none">
              {filteredCategoriesData.map((cat) => {
                const isExpanded = expandedCategory === cat.id;
                
                return (
                  <div key={cat.id} className="rounded-xl border border-neutral-200 dark:border-zinc-900 bg-neutral-105/30 dark:bg-zinc-900/10 overflow-hidden">
                    {/* Category Header */}
                    <button
                      onClick={() => toggleCategory(cat.id)}
                      className="w-full p-3.5 flex items-center justify-between hover:bg-neutral-200/30 dark:hover:bg-zinc-900/30 text-left transition-colors cursor-pointer"
                    >
                      <span className="font-semibold text-neutral-850 dark:text-neutral-250 text-[12px] leading-tight pr-4">
                        {cat.name}
                      </span>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-neutral-400 shrink-0" />
                      )}
                    </button>

                    {/* Sub-services Accordion Content */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden border-t border-neutral-200 dark:border-zinc-900"
                        >
                          <ul className="py-1 bg-white dark:bg-black/50">
                            {cat.services.map((serv, index) => {
                              const isSelected = selectedService === serv.title;
                              const indexStr = `${cat.id === "start-business" ? 1 : cat.id === "registrations" ? 2 : cat.id === "taxation" ? 3 : 4}.${index + 1}`;
                              
                              return (
                                <li key={serv.title}>
                                  <button
                                    onClick={() => {
                                      setSelectedService(serv.title);
                                    }}
                                    className={`w-full text-left py-2.5 px-4 flex items-center justify-between text-xs transition-colors cursor-pointer border-l-2 ${
                                      isSelected 
                                        ? "bg-[#7342E2]/10 text-[#7342E2] dark:bg-[#7342E2]/20 dark:text-[#a882fa] border-l-[#7342E2] font-semibold" 
                                        : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-zinc-900/40 hover:text-neutral-900 dark:hover:text-white border-l-transparent"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 min-w-0 pr-2">
                                      <span className="text-neutral-400 shrink-0 font-mono text-[10px]">
                                        {indexStr}
                                      </span>
                                      <span className="truncate pr-1">{serv.title}</span>
                                    </div>
                                    
                                    <span className="text-[10px] text-neutral-400 dark:text-neutral-500 bg-neutral-200/50 dark:bg-zinc-900 px-1.5 py-0.5 rounded font-medium shrink-0">
                                      {serv.duration}
                                    </span>
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              {filteredCategoriesData.length === 0 && (
                <div className="py-8 text-center text-xs text-neutral-400">
                  No services found matching query
                </div>
              )}
            </div>
          </div>

          {/* 2. MIDDLE CONTENT AREA: VIEWER */}
          <div className="flex-1 bg-white dark:bg-black flex flex-col overflow-y-auto custom-scrollbar">
            
            {/* Top Navigation Header inside Content Area */}
            <div className="h-12 border-b border-neutral-200 dark:border-neutral-900 px-6 flex items-center justify-between shrink-0 bg-neutral-50/50 dark:bg-black/30">
              {/* Breadcrumbs */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                <span className="hover:text-neutral-700 dark:hover:text-neutral-250 cursor-pointer">Services</span>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="hover:text-neutral-700 dark:hover:text-neutral-255 cursor-pointer">{activeService.categoryName}</span>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-neutral-800 dark:text-neutral-200">{activeService.title}</span>
              </div>
              {/* Top Nav Action Tools */}
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1">
                  <button className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-850 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-255 cursor-pointer">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-855 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-255 cursor-pointer">
                    <Home className="w-4 h-4" />
                  </button>
                </div>
                <span className="h-4 w-px bg-neutral-200 dark:bg-zinc-800" />
                <div className="flex items-center gap-1 text-[11px] font-bold text-neutral-500">
                  <span className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-zinc-800 text-[#7342E2] dark:text-[#a882fa] text-[10px]">EN</span>
                </div>
              </div>
            </div>

            {/* Large Service Title Banner */}
            <div className="relative p-6 border-b border-neutral-200 dark:border-neutral-900 overflow-hidden bg-gradient-to-r from-neutral-100 via-neutral-100 to-neutral-200/50 dark:from-black dark:via-black dark:to-zinc-950/20 select-none">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(115,66,226,0.08),transparent_40%)]" />
              <div className="relative z-10 flex flex-col gap-3 max-w-2xl">
                {/* Badge */}
                <span className={`self-start text-[9px] font-extrabold px-2.5 py-1 rounded-md tracking-wider border uppercase shadow-sm ${
                  activeService.tag === "POPULAR" 
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                    : activeService.tag === "RECOMMENDED"
                    ? "bg-[#7342E2]/10 text-[#7342E2] dark:text-[#a882fa] border-[#7342E2]/20"
                    : activeService.tag === "MANDATORY"
                    ? "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
                    : activeService.tag === "FAST TRACK"
                    ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20"
                    : "bg-neutral-500/10 text-neutral-600 dark:text-neutral-400 border-neutral-500/20"
                }`}>
                  {activeService.tag}
                </span>
                
                <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-855 dark:text-white leading-tight">
                  {activeService.title}
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-450 leading-relaxed font-medium">
                  {activeService.desc}
                </p>
                
                {/* Clean Professional Pricing Badge */}
                <div className="flex items-center gap-2 mt-1 text-xs text-neutral-600 dark:text-neutral-300 font-semibold">
                  <span className="text-neutral-400 font-normal">Filing Fee starts at:</span>
                  <span className="text-[#7342E2] dark:text-[#a882fa] text-sm font-bold bg-[#7342E2]/10 px-2 py-0.5 rounded-md">
                    ₹{activeService.price}
                  </span>
                </div>
              </div>
            </div>

            {/* Stacked details content stream (No tabs, all visible vertically) */}
            <div className="p-6 space-y-10">
              
              {/* SECTION 1: Key Service Strengths */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-100 dark:border-zinc-900">
                  <Zap className="w-5 h-5 text-[#7342E2]" />
                  <h3 className="text-sm font-bold text-neutral-850 dark:text-neutral-200 uppercase tracking-wider">
                    Key Strengths & Advantages
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {activeService.highlights.map((hl, i) => (
                    <div 
                      key={i} 
                      className="p-4 rounded-xl border border-neutral-200 dark:border-zinc-900 bg-neutral-50/50 dark:bg-zinc-950/30 flex items-start gap-3 shadow-sm hover:shadow transition-shadow"
                    >
                      <div className="w-6 h-6 rounded-lg bg-[#7342E2]/10 text-[#7342E2] dark:text-[#a882fa] flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <div className="space-y-0.5">
                        <h5 className="text-xs font-bold text-neutral-800 dark:text-neutral-250">
                          {hl}
                        </h5>
                        <p className="text-[10px] text-neutral-450 leading-relaxed">
                          Ensuring standard compliant operation.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 2: Required Documents */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-100 dark:border-zinc-900">
                  <FileText className="w-5 h-5 text-[#7342E2]" />
                  <h3 className="text-sm font-bold text-neutral-855 dark:text-neutral-200 uppercase tracking-wider">
                    Required Checklist Documents
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeService.documents.map((doc, idx) => (
                    <div 
                      key={idx}
                      className="p-4 rounded-xl border border-neutral-200 dark:border-zinc-900 bg-neutral-50/30 dark:bg-zinc-950/20 flex gap-3.5 hover:shadow-sm transition-shadow"
                    >
                      <div className="w-5 h-5 rounded border border-emerald-500 bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                          {doc.name}
                        </h4>
                        <p className="text-[10px] text-neutral-450 leading-normal">
                          {doc.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Important filing notice */}
                <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-400 text-xs leading-relaxed flex gap-3">
                  <HelpCircle className="w-5 h-5 shrink-0" />
                  <div>
                    <span className="font-bold">Important Notice:</span> Scanned copies or photographs are sufficient for the initial drafting. Physical documents are only required if state departments request physical affidavits in rare jurisdictions.
                  </div>
                </div>
              </div>

              {/* SECTION 3: Step-by-Step Filing Process */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-100 dark:border-zinc-900">
                  <Layers className="w-5 h-5 text-[#7342E2]" />
                  <h3 className="text-sm font-bold text-neutral-855 dark:text-neutral-200 uppercase tracking-wider">
                    Step-by-Step Registration & Filing Process
                  </h3>
                </div>
                
                {/* Vertical Timeline */}
                <div className="relative pl-6 space-y-6 border-l border-neutral-200 dark:border-neutral-900 ml-3 pt-1">
                  {activeService.steps.map((step, idx) => (
                    <div key={idx} className="relative group">
                      {/* Circle indicator node */}
                      <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 border-[#7342E2] bg-white dark:bg-black flex items-center justify-center shadow">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#7342E2] scale-100 group-hover:scale-125 transition-transform" />
                      </div>
                      
                      <div className="bg-neutral-50/50 dark:bg-zinc-950/30 p-4 rounded-xl border border-neutral-200 dark:border-zinc-900 hover:border-neutral-300 dark:hover:border-neutral-800 transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-extrabold text-[#7342E2] dark:text-[#a882fa] bg-[#7342E2]/10 px-2 py-0.5 rounded-full uppercase">
                            Step {idx + 1}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                          {step}
                        </h4>
                        <p className="text-[10px] text-neutral-450 mt-1 leading-relaxed">
                          This phase is managed entirely online by our experts. Updates are shared dynamically under your project profile.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
