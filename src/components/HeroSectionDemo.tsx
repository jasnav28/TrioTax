import { HeroSection } from '@/components/ui/hero-section-2';
import HyperTextParagraph from '@/components/ui/hyper-text-with-decryption';

export function HeroSectionDemo() {
  const triggers = [
    "TRIOTAX", "incorporation", "licensing", "taxation", "payroll", "compliance", "solutions", "growth",
    "expertise", "excellence", "innovation", "operations", "expansion", "Partner", "Governance", "technology",
    "confidence", "Single", "Regulatory", "Risk", "Mitigation", "Dedicated", "Experts", "Timely", "Filings",
    "Statutory", "Adherence", "Transparent", "Responsive", "Service", "Scalable", "Businesses"
  ];

  const subtitleContent = (
    <div className="space-y-6 text-neutral-600 dark:text-neutral-300">
      <div className="space-y-4">
        <HyperTextParagraph
          text="At TRIOTAX, we help businesses navigate the regulatory landscape with clarity and confidence. From company incorporation and licensing to taxation, payroll, labour law, and statutory compliance, we deliver integrated solutions that support sustainable business growth."
          highlightWords={triggers}
          className="text-base font-normal leading-relaxed text-left block"
        />
        <HyperTextParagraph
          text="Combining technical expertise with a client-centric approach, we ensure compliance excellence while allowing businesses to focus on innovation, operations, and expansion."
          highlightWords={triggers}
          className="text-base font-normal leading-relaxed text-left block"
        />
        <HyperTextParagraph
          text="Your Trusted Partner for Compliance, Governance & Business Growth."
          highlightWords={triggers}
          className="text-base font-bold text-[#7342E2] dark:text-[#a882fa] text-left block"
        />
      </div>

      <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-wider text-[#7342E2] text-left">
          Why TRIOTAX
        </h4>
        <HyperTextParagraph
          text="We deliver compliance excellence through expertise, technology, and a client-centric approach, enabling businesses to operate with confidence."
          highlightWords={triggers}
          className="text-base font-normal leading-relaxed text-left block"
        />
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {[
            "✓ Single Partner for All Compliance Needs",
            "✓ Regulatory Risk Mitigation & Governance",
            "✓ Dedicated Compliance Experts",
            "✓ Timely Filings & Statutory Adherence",
            "✓ Transparent & Responsive Service",
            "✓ Scalable Solutions for Growing Businesses"
          ].map((item, index) => (
            <li key={index} className="flex items-start text-sm">
              <HyperTextParagraph
                text={item}
                highlightWords={triggers}
                className="text-neutral-500 dark:text-neutral-400 font-mono leading-relaxed text-left block"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <HeroSection
      className="min-h-[80vh]"
      title={
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="TRIOTAX Logo" className="h-10 w-10 md:h-12 md:w-12 object-contain shrink-0" />
          <span className="text-[#7342E2]">About Us</span>
        </div>
      }
      subtitle={subtitleContent}
      callToAction={{
        text: "CONSULT AN EXPERT",
        href: "#contact",
      }}
      backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&auto=format&fit=crop&q=80"
      contactInfo={{
          website: "triotax.in",
          phone: "+91 9591578333",
          address: "Bengaluru, Karnataka, India",
      }}
    />
  );
}
