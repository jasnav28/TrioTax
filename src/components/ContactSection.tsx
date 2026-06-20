"use client";

import React, { useState } from 'react';
import { ContactCard } from "@/components/ui/contact-card";
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";

export function ContactSection({ theme }: { theme?: 'light' | 'dark' }) {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone) {
      toast({
        title: "Missing Information",
        description: "Please enter your name and phone number so we can reach you.",
        type: "destructive",
      });
      return;
    }

    // Construct the WhatsApp message content
    const whatsappMessage = `*New Contact Inquiry - TRIOTAX Website*\n\n` +
      `*Name:* ${name}\n` +
      `*Email:* ${email || 'Not provided'}\n` +
      `*Phone:* ${phone}\n` +
      `*Message:* ${message || 'Not provided'}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/919591578333?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    toast({
      title: "Redirecting to WhatsApp...",
      description: "We are opening WhatsApp to send your inquiry message.",
    });
  };

  const isDark = theme !== 'light';

  return (
    <section 
      id="contact" 
      className="py-16 md:py-24 px-4 md:px-16 w-full flex flex-col items-center justify-center bg-white dark:bg-black transition-colors duration-300"
    >
      <div className="w-full max-w-5xl mx-auto">
        <ContactCard
          title="Get in touch"
          description="If you have any questions regarding our Services or need help, please fill out the form here. We will respond promptly within 1 business day."
          contactInfo={[
            {
              icon: MailIcon,
              label: 'Email',
              value: 'support@triotax.in',
            },
            {
              icon: PhoneIcon,
              label: 'Phone',
              value: '+91 9591578333 / +91 6361556801',
            },
            {
              icon: MapPinIcon,
              label: 'Address',
              value: 'Bengaluru, Karnataka, India',
              className: 'col-span-2',
            }
          ]}
          className={isDark ? "bg-[#0D0D0D] border-neutral-800" : "bg-neutral-50/50 border-neutral-200"}
        >
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-neutral-700 dark:text-neutral-200 font-bold text-xs uppercase tracking-wider">Name</Label>
              <Input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Full Name"
                className="bg-white dark:bg-[#070708] border-neutral-200 dark:border-neutral-800 focus-visible:ring-neutral-400 text-neutral-900 dark:text-white rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-neutral-700 dark:text-neutral-200 font-bold text-xs uppercase tracking-wider">Email</Label>
              <Input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-white dark:bg-[#070708] border-neutral-200 dark:border-neutral-800 focus-visible:ring-neutral-400 text-neutral-900 dark:text-white rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-neutral-700 dark:text-neutral-200 font-bold text-xs uppercase tracking-wider">Phone</Label>
              <Input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your Contact Number"
                className="bg-white dark:bg-[#070708] border-neutral-200 dark:border-neutral-800 focus-visible:ring-neutral-400 text-neutral-900 dark:text-white rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-neutral-700 dark:text-neutral-200 font-bold text-xs uppercase tracking-wider">Message</Label>
              <Textarea  
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help your business?"
                className="bg-white dark:bg-[#070708] border-neutral-200 dark:border-neutral-800 focus-visible:ring-neutral-400 text-neutral-900 dark:text-white rounded-lg"
                rows={4}
              />
            </div>
            <Button 
              className="w-full bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-bold rounded-lg cursor-pointer py-2.5 transition-colors duration-200 shadow-sm border border-neutral-800 dark:border-neutral-200" 
              type="submit"
            >
              Submit
            </Button>
          </form>
        </ContactCard>
      </div>
    </section>
  );
}
