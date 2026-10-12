"use client";

import React, { useState } from "react";
import {
  Server,
  Cloud,
  Database,
  HardDrive,
  Globe,
  Plus,
  Trash2,
  Play,
  RotateCw,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { ProjectCloudResource, ProjectEnvironment } from "@/modules/projects/project.types";
import {
  addProjectCloudResource,
  deleteProjectCloudResource,
} from "@/server/actions/projects.actions";

interface ProjectCloudAwsTabProps {
  initialResources?: ProjectCloudResource[];
  environments?: ProjectEnvironment[];
  projectId: string;
  projectCode: string;
}

export function ProjectCloudAwsTab({
  initialResources = [],
  environments = [],
  projectId,
  projectCode,
}: ProjectCloudAwsTabProps) {
  const [resources, setResources] = useState<ProjectCloudResource[]>(initialResources);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [provider, setProvider] = useState<ProjectCloudResource["provider"]>("AWS");
  const [type, setType] = useState<ProjectCloudResource["type"]>("EC2 Compute");
  const [name, setName] = useState("");
  const [resourceId, setResourceId] = useState("");
  const [region, setRegion] = useState("us-east-1");
  const [status, setStatus] = useState<ProjectCloudResource["status"]>("Running");
  const [purpose, setPurpose] = useState("");
  const [costPerMonth, setCostPerMonth] = useState(65);
  const [details, setDetails] = useState("");

  const handleAddResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !purpose.trim()) {
      toast.error("Please enter resource name and purpose.");
      return;
    }

    const newResource: ProjectCloudResource = {
      id: `cres_${Date.now()}`,
      provider,
      type,
      name: name.trim(),
      resourceId: resourceId.trim() || `res-${Math.random().toString(36).substring(2, 8)}`,
      region,
      status,
      purpose: purpose.trim(),
      costPerMonth: Number(costPerMonth),
      details: details.trim() || undefined,
    };

    setResources((prev) => [newResource, ...prev]);
    setIsAddModalOpen(false);
    setName("");
    setResourceId("");
    setPurpose("");
    setDetails("");
    toast.success(`AWS ${type} "${newResource.name}" added to project infrastructure!`);

    try {
      await addProjectCloudResource(projectId, newResource);
    } catch {
      // optimistic state retained
    }
  };

  const handleDeleteResource = async (id: string, resName: string) => {
    if (!confirm(`Delete cloud resource "${resName}" from this project?`)) return;
    setResources((prev) => prev.filter((r) => r.id !== id));
    toast.success("Resource unlinked from project.");

    try {
      await deleteProjectCloudResource(projectId, id);
    } catch {
      // optimistic state retained
    }
  };

  const handleToggleStatus = (id: string) => {
    setResources((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const nextStatus = r.status === "Running" ? "Stopped" : "Running";
          toast.success(`${r.name} status updated to ${nextStatus}.`);
          return { ...r, status: nextStatus };
        }
        return r;
      })
    );
  };

  const getTypeIcon = (resourceType: ProjectCloudResource["type"]) => {
    switch (resourceType) {
      case "EC2 Compute":
        return Server;
      case "S3 Storage":
        return HardDrive;
      case "RDS Database":
        return Database;
      case "CloudFront / CDN":
        return Globe;
      default:
        return Cloud;
    }
  };

  const totalCost = resources.reduce((sum, r) => sum + (r.costPerMonth || 0), 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col justify-between gap-4 rounded-[2.5rem] border border-slate-200/80 bg-white p-6 shadow-xs sm:flex-row sm:items-center sm:p-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-purple-50 px-3 py-1 text-[10px] font-black tracking-wider text-purple-800 uppercase">
              AWS & Cloud Infrastructure
            </span>
            <span className="text-xs font-bold text-slate-400">• {projectCode}</span>
          </div>
          <h2 className="mt-2 text-2xl font-black text-slate-900">
            AWS Resources Provisioned for this Project
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            EC2 compute instances, S3 storage buckets, RDS databases, and edge CDN distributions
            configured for this project.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Est. Monthly Cloud Spend
            </span>
            <div className="text-base font-black text-slate-900">${totalCost}/mo</div>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex cursor-pointer items-center gap-1.5 rounded-2xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            <span>+ Add AWS Resource</span>
          </button>
        </div>
      </div>

      {/* Cloud Resources Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {resources.map((res) => {
          const Icon = getTypeIcon(res.type);

          return (
            <div
              key={res.id}
              className="flex flex-col justify-between space-y-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xs transition-all hover:border-slate-300"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-white shadow-2xs">
                      <Icon className="h-4 w-4 text-purple-400" />
                    </span>
                    <div>
                      <span className="rounded bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-700">
                        {res.provider} • {res.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      onClick={() => handleToggleStatus(res.id)}
                      className={`flex cursor-pointer items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${
                        res.status === "Running" || res.status === "Provisioned"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-slate-200 bg-slate-100 text-slate-600"
                      }`}
                      title="Click to toggle status"
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          res.status === "Running" || res.status === "Provisioned"
                            ? "bg-emerald-500"
                            : "bg-slate-400"
                        }`}
                      />
                      {res.status}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleDeleteResource(res.id, res.name)}
                      className="cursor-pointer p-1 text-slate-300 transition-colors hover:text-rose-600"
                      title="Delete resource"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="mt-3">
                  <h3 className="text-sm font-black text-slate-900">{res.name}</h3>
                  <div className="mt-0.5 font-mono text-[10px] text-slate-400">
                    ID: {res.resourceId} • Region: {res.region}
                  </div>
                </div>

                <div className="mt-3 space-y-1 rounded-2xl border border-slate-100 bg-slate-50/80 p-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Purpose in this Project
                  </span>
                  <p className="text-xs leading-relaxed font-medium text-slate-700">
                    {res.purpose}
                  </p>
                </div>

                {res.details && (
                  <p className="mt-2 text-[11px] leading-relaxed text-slate-500 italic">
                    {res.details}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                <span className="font-medium text-slate-400">Estimated Cost</span>
                <span className="font-black text-slate-900">${res.costPerMonth || 0}/month</span>
              </div>
            </div>
          );
        })}

        {resources.length === 0 && (
          <div className="col-span-full rounded-3xl border border-dashed border-slate-300 p-12 text-center">
            <Server className="mx-auto h-10 w-10 text-slate-300" />
            <h3 className="mt-2 text-sm font-bold text-slate-700">
              No AWS resources logged for this project yet
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Click &quot;+ Add AWS Resource&quot; to record your EC2 instances, S3 buckets, RDS
              databases, or CDN endpoints.
            </p>
          </div>
        )}
      </div>

      {/* Add Cloud Resource Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg space-y-4 rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                Add AWS Cloud Resource to Project
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="cursor-pointer rounded-full p-1 text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddResource} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700">Provider</label>
                  <select
                    value={provider}
                    onChange={(e) => setProvider(e.target.value as any)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none"
                  >
                    <option value="AWS">Amazon Web Services (AWS)</option>
                    <option value="GCP">Google Cloud Platform (GCP)</option>
                    <option value="Azure">Microsoft Azure</option>
                    <option value="Kubernetes">Kubernetes Cluster</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">Resource Type *</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none"
                  >
                    <option value="EC2 Compute">EC2 Compute (Instance)</option>
                    <option value="S3 Storage">S3 Storage (Bucket)</option>
                    <option value="RDS Database">RDS Database (Postgres/MySQL)</option>
                    <option value="CloudFront / CDN">CloudFront / CDN Distribution</option>
                    <option value="EKS Kubernetes">EKS Kubernetes Pods</option>
                    <option value="Lambda / Serverless">Lambda / Serverless Function</option>
                    <option value="Redis ElastiCache">Redis ElastiCache</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Resource Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. logistics-api-prod-worker or s3-freight-waybills"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700">
                    Resource ID / ARN
                  </label>
                  <input
                    type="text"
                    value={resourceId}
                    onChange={(e) => setResourceId(e.target.value)}
                    placeholder="i-09ab7c8e23f9 or arn:aws:s3:::bucket"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">AWS Region</label>
                  <input
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    placeholder="us-east-1"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none"
                  >
                    <option value="Running">Running</option>
                    <option value="Provisioned">Provisioned</option>
                    <option value="Stopped">Stopped</option>
                    <option value="Terminated">Terminated</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">Est. Cost ($/mo)</label>
                  <input
                    type="number"
                    value={costPerMonth}
                    onChange={(e) => setCostPerMonth(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Purpose for this Project *
                </label>
                <input
                  type="text"
                  required
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="e.g. Core API compute server with auto-scaling"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Configuration Details
                </label>
                <textarea
                  rows={2}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Security group policies, encrypted KMS keys, or auto-scaling thresholds..."
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer rounded-xl bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-indigo-700"
                >
                  Save Cloud Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
