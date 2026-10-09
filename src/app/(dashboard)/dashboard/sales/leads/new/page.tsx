"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  User,
  Phone,
  Mail,
  DollarSign,
  Target,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function NewClientOnboardingForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    dealValue: "",
    source: "Marketing",
    hasGst: false,
    gstin: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sourceOptions = ["Marketing", "Raw Data", "GMD Data", "Scraping", "Direct Referral"];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
    if (!formData.contactPerson.trim()) newErrors.contactPerson = "Contact person is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // GSTIN Validation (Indian Format: 2 digits, 10 PAN chars, 1 entity, 1 Z, 1 checksum)
    if (formData.hasGst) {
      const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      if (!formData.gstin.trim()) {
        newErrors.gstin = "GSTIN is required if GST registered";
      } else if (!gstinRegex.test(formData.gstin.toUpperCase())) {
        newErrors.gstin = "Invalid GSTIN format";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the validation errors before submitting.");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("New client lead onboarded successfully!");
      router.push("/dashboard/sales");
    }, 1500);
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.push("/dashboard/sales")}
          className="flex items-center gap-2 text-xs font-bold text-slate-600 transition hover:text-indigo-600"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Sales Pipeline</span>
        </button>
      </div>

      <div className="rounded-3xl border border-slate-200/90 bg-white p-8 shadow-xs">
        <div className="mb-8 border-b border-slate-100 pb-6">
          <h1 className="text-2xl font-black text-slate-900">New Client Onboarding</h1>
          <p className="mt-1 text-sm font-semibold text-slate-500">
            Enter official company details, contact information, and initial deal scoping.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Company Details */}
          <div className="space-y-4">
            <h2 className="flex items-center gap-2 text-sm font-black text-indigo-900">
              <Building2 className="h-4 w-4" />
              <span>1. Official Company Details</span>
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Company Name *</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="e.g. Annai Agro Tradings"
                  className={`w-full rounded-2xl border bg-slate-50 px-4 py-3 text-sm font-semibold focus:bg-white focus:ring-2 focus:outline-none ${
                    errors.companyName
                      ? "border-rose-300 focus:ring-rose-200"
                      : "border-slate-200 focus:ring-indigo-100"
                  }`}
                />
                {errors.companyName && (
                  <p className="text-[10px] font-bold text-rose-500">{errors.companyName}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Estimated Deal Value (₹)</label>
                <div className="relative">
                  <DollarSign className="absolute top-3.5 left-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="number"
                    value={formData.dealValue}
                    onChange={(e) => setFormData({ ...formData, dealValue: e.target.value })}
                    placeholder="0.00"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pr-4 pl-10 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Contact Information */}
          <div className="space-y-4">
            <h2 className="flex items-center gap-2 text-sm font-black text-indigo-900">
              <User className="h-4 w-4" />
              <span>2. Primary Contact</span>
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Contact Person *</label>
                <div className="relative">
                  <User className="absolute top-3.5 left-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="Full Name"
                    className={`w-full rounded-2xl border bg-slate-50 py-3 pr-4 pl-10 text-sm font-semibold focus:bg-white focus:ring-2 focus:outline-none ${
                      errors.contactPerson
                        ? "border-rose-300 focus:ring-rose-200"
                        : "border-slate-200 focus:ring-indigo-100"
                    }`}
                  />
                </div>
                {errors.contactPerson && (
                  <p className="text-[10px] font-bold text-rose-500">{errors.contactPerson}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute top-3.5 left-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@company.com"
                    className={`w-full rounded-2xl border bg-slate-50 py-3 pr-4 pl-10 text-sm font-semibold focus:bg-white focus:ring-2 focus:outline-none ${
                      errors.email
                        ? "border-rose-300 focus:ring-rose-200"
                        : "border-slate-200 focus:ring-indigo-100"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-[10px] font-bold text-rose-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute top-3.5 left-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className={`w-full rounded-2xl border bg-slate-50 py-3 pr-4 pl-10 text-sm font-semibold focus:bg-white focus:ring-2 focus:outline-none ${
                      errors.phone
                        ? "border-rose-300 focus:ring-rose-200"
                        : "border-slate-200 focus:ring-indigo-100"
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-[10px] font-bold text-rose-500">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Source & Compliance */}
          <div className="space-y-4">
            <h2 className="flex items-center gap-2 text-sm font-black text-indigo-900">
              <Target className="h-4 w-4" />
              <span>3. Acquisition & Compliance</span>
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Lead Source Attribution</label>
                <select
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:outline-none"
                >
                  {sourceOptions.map((src) => (
                    <option key={src} value={src}>
                      {src}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                <label className="flex cursor-pointer items-center gap-3">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.hasGst}
                      onChange={(e) => {
                        setFormData({ ...formData, hasGst: e.target.checked });
                        if (!e.target.checked) setErrors((prev) => ({ ...prev, gstin: "" }));
                      }}
                      className="peer sr-only"
                    />
                    <div className="h-6 w-11 rounded-full bg-slate-200 peer-checked:bg-indigo-600 peer-focus:ring-2 peer-focus:ring-indigo-300 peer-focus:outline-none after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                  </div>
                  <span className="text-sm font-bold text-slate-800">GST Registered Entity?</span>
                </label>

                {formData.hasGst && (
                  <div className="animate-in fade-in slide-in-from-top-2 space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">GSTIN Number *</label>
                    <input
                      type="text"
                      value={formData.gstin}
                      onChange={(e) =>
                        setFormData({ ...formData, gstin: e.target.value.toUpperCase() })
                      }
                      placeholder="e.g. 22AAAAA0000A1Z5"
                      maxLength={15}
                      className={`w-full rounded-xl border bg-white px-4 py-2.5 font-mono text-sm font-bold tracking-wider focus:ring-2 focus:outline-none ${
                        errors.gstin
                          ? "border-rose-300 focus:ring-rose-200"
                          : "border-slate-200 focus:ring-indigo-100"
                      }`}
                    />
                    {errors.gstin ? (
                      <p className="flex items-center gap-1 text-[10px] font-bold text-rose-500">
                        <AlertCircle className="h-3 w-3" />
                        <span>{errors.gstin}</span>
                      </p>
                    ) : (
                      <p className="text-[10px] font-medium text-slate-400">
                        15-character alphanumeric GSTIN
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 border-t border-slate-100 pt-6">
            <button
              type="button"
              onClick={() => router.push("/dashboard/sales")}
              className="rounded-2xl px-6 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-8 py-3 text-sm font-black text-white shadow-md transition hover:bg-indigo-700 active:scale-95 disabled:opacity-70"
            >
              {isSubmitting ? (
                <span>Processing...</span>
              ) : (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Onboard Client</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
