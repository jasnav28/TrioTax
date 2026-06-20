"use client";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
} from "lucide-react";

interface SocialIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const Facebook = ({ size = 20, ...props }: SocialIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const Instagram = ({ size = 20, ...props }: SocialIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const Twitter = ({ size = 20, ...props }: SocialIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

const Dribbble = ({ size = 20, ...props }: SocialIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.49-11.05 1-11.6 8.56"/></svg>
);
import { FooterBackgroundGradient } from "@/components/ui/hover-footer";
import { TextHoverEffect } from "@/components/ui/hover-footer";

export function HoverFooter({ scrollToSection }: { scrollToSection?: (id: any) => void }) {
  // Footer link data
  const footerLinks = [
    {
      title: "Product Features",
      links: [
        { label: "Vault Security", href: "#hero" },
        { label: "Vault Plans", href: "#bento" },
        { label: "Calculator", href: "#calculator" },
        { label: "Developer API", href: "#" },
      ],
    },
    {
      title: "Helpful Links",
      links: [
        { label: "FAQs", href: "#" },
        { label: "Support", href: "#" },
        {
          label: "Live Chat",
          href: "#",
          pulse: true,
        },
      ],
    },
  ];

  // Contact info data
  const contactInfo = [
    {
      icon: <Mail size={18} className="text-[#3ca2fa] mt-0.5 shrink-0" />,
      text: "support@triotax.in",
      href: "mailto:support@triotax.in",
    },
    {
      icon: <Phone size={18} className="text-[#3ca2fa] mt-0.5 shrink-0" />,
      text: "+91 9591578333",
      href: "tel:+919591578333",
    },
    {
      icon: <Phone size={18} className="text-[#3ca2fa] mt-0.5 shrink-0" />,
      text: "+91 6361556801",
      href: "tel:+916361556801",
    },
    {
      icon: <MapPin size={18} className="text-[#3ca2fa] mt-0.5 shrink-0" />,
      text: "Corp Office: #27, Sriranga Complex, 2nd Floor, 2nd Main Rd, Dr.MC Modi Hospital Rd, West of Chord Rd, 2nd Stage, Bengaluru-560086",
    },
    {
      icon: <MapPin size={18} className="text-[#3ca2fa] mt-0.5 shrink-0" />,
      text: "Branch Office: #02, Venkateshwara Sawmill Complex, Court Rd, Vinayakanagara, Doddballapura, Bengaluru Rural-561203",
    },
  ];

  // Social media icons
  const socialLinks = [
    { icon: <Facebook size={20} />, label: "Facebook", href: "#" },
    { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
    { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
    { icon: <Dribbble size={20} />, label: "Dribbble", href: "#" },
    { icon: <Globe size={20} />, label: "Globe", href: "#" },
  ];

  return (
    <footer className="bg-[#0F0F11] dark:bg-black text-gray-400 relative h-full w-full overflow-hidden flex flex-col justify-between pt-12 pb-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto w-full z-40 relative px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/logo.png"
                alt="TRIOTAX Logo"
                className="h-8 w-8 object-contain cursor-pointer shrink-0 transition-transform duration-300 hover:scale-105"
                onClick={() => {
                  if (scrollToSection) {
                    scrollToSection('hero');
                  } else {
                    const el = document.getElementById('hero');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.href = '/';
                    }
                  }
                }}
              />
              <span className="text-white text-3xl font-bold font-sans tracking-wide">TRIOTAX</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              TRIOTAX is a modern financial and business support services platform offering company registration, tax filing, and compliance management solutions.
            </p>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-lg font-semibold mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative">
                    <a
                      href={link.href}
                      className="hover:text-[#3ca2fa] transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                    {link.pulse && (
                      <span className="absolute top-1.5 ml-1 w-2 h-2 rounded-full bg-[#3ca2fa] animate-pulse"></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-start space-x-3 text-sm">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="hover:text-[#3ca2fa] transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="hover:text-[#3ca2fa] transition-colors">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-gray-800 my-6" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          {/* Social icons */}
          <div className="flex space-x-6 text-gray-500">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-[#3ca2fa] transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-center md:text-left text-xs text-gray-600">
            &copy; {new Date().getFullYear()} TRIOTAX. All rights reserved.
          </p>
        </div>
      </div>

      {/* Text hover effect */}
      <div className="lg:flex hidden h-[22rem] md:h-[26rem] lg:h-[30rem] -mt-36 md:-mt-48 -mb-28 relative z-10 w-full max-w-7xl mx-auto items-center justify-center">
        <TextHoverEffect text="TRIOTAX" className="z-50" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}
