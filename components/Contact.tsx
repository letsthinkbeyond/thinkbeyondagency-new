"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import { FiPhone, FiInstagram, FiMail, FiArrowUpRight } from "react-icons/fi";
import RevealText from "./RevealText";
import MagneticButton from "./MagneticButton";
import type { ContactFormErrors } from "@/lib/contact-validation";

const channels = [
  { icon: FaWhatsapp, label: "WhatsApp", href: "https://wa.me/919664971846" },
  { icon: FiInstagram, label: "Instagram", href: "https://www.instagram.com/thinkbeyondagency/" },
  { icon: FiMail, label: "Email", href: "mailto:letsthinkbeyond.co@gmail.com" },
];

type FormState = {
  name: string;
  email: string;
  brandName: string;
  contactNo: string;
  subject: string;
  message: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  brandName: "",
  contactNo: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<ContactFormErrors>({});
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    setFormError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFieldErrors({});
    setFormError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setFieldErrors(data.errors);
        } else {
          setFormError(data.message ?? "Something went wrong. Please try again.");
        }
        return;
      }

      setSubmitted(true);
      setForm(initialFormState);
    } catch {
      setFormError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-container">
        <h2 className="font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">
          <RevealText text="Let's Build Something" as="span" />
          <br />
          <RevealText text="Beyond." as="span" className="text-accent" delay={0.15} />
        </h2>

        {/* <div className="mt-16 md:justify-center grid grid-cols-1 gap-16 md:grid-cols-12"> */}
        <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-12">
          {/* <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:col-span-7"> */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:col-span-7 md:col-start-2">
    
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-accent/30 bg-accent/5 p-8 font-display text-2xl"
              >
                Thanks — we&apos;ll be in touch within one business day.
              </motion.div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormField
                    label="Name"
                    name="name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    error={fieldErrors.name}
                    disabled={isSubmitting}
                  />
                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={handleChange}
                    error={fieldErrors.email}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormField
                    label="Brand Name"
                    name="brandName"
                    placeholder="Your brand or company name"
                    value={form.brandName}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  <FormField
                    label="Contact No."
                    name="contactNo"
                    type="tel"
                    placeholder="Your phone number"
                    value={form.contactNo}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>
                <FormField
                  label="Subject"
                  name="subject"
                  placeholder="What would you like to discuss?"
                  value={form.subject}
                  onChange={handleChange}
                  error={fieldErrors.subject}
                  disabled={isSubmitting}
                />
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs uppercase tracking-widest text-secondary">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about your brand and goals"
                    value={form.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full resize-none border-b border-ink/20 bg-transparent py-3 font-sans outline-none transition-colors focus:border-accent disabled:opacity-50 dark:border-ink-dark/20"
                  />
                  {fieldErrors.message && (
                    <p className="text-sm text-accent">{fieldErrors.message}</p>
                  )}
                </div>

                {formError && <p className="text-sm text-accent">{formError}</p>}

                <div className="mt-2">
                  <MagneticButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Submit"} {!isSubmitting && <FiArrowUpRight />}
                  </MagneticButton>
                </div>
              </>
            )}
          </form>

          {/* <div className="flex items-start gap-4 md:col-span-2 md:justify-end"> */}
          <div className="flex items-start gap-4 md:col-span-3 md:justify-end">
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={channel.label}
                data-cursor-hover
                className="glass group flex h-14 w-14 items-center justify-center rounded-full border border-ink/10 text-accent transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-accent/10 dark:border-ink-dark/10"
              >
                <channel.icon size={20} className="transition-transform group-hover:scale-110" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  disabled,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-mono text-xs uppercase tracking-widest text-secondary">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full border-b border-ink/20 bg-transparent py-3 font-sans outline-none transition-colors focus:border-accent disabled:opacity-50 dark:border-ink-dark/20"
      />
      {error && <p className="text-sm text-accent">{error}</p>}
    </div>
  );
}
