"use client";

import React from "react";
import { motion } from "framer-motion";
import { ClientInvoiceOverview } from "../ClientInvoiceOverview";
import { ClientBottomWidgets } from "../ClientBottomWidgets";

export function ClientOverviewTab({ lead }: { lead?: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="space-y-6"
    >
      <ClientInvoiceOverview lead={lead} />
      <ClientBottomWidgets lead={lead} />
    </motion.div>
  );
}
