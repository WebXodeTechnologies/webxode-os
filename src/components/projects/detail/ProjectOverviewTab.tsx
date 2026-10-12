"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Clock,
  DollarSign,
  Calendar,
  GitBranch,
  Layers,
  MessageSquare,
  Plus,
  Send,
  Trash2,
  ExternalLink,
  GitPullRequest,
} from "lucide-react";
import { toast } from "react-hot-toast";
import {
  ProjectItem,
  ProjectDiscussionNote,
  ProjectRepository,
} from "@/modules/projects/project.types";
import {
  addProjectDiscussion,
  addProjectRepository,
  deleteProjectRepository,
} from "@/server/actions/projects.actions";

interface ProjectOverviewTabProps {
  project: ProjectItem;
  onUpdateProject?: (updated: ProjectItem) => void;
}

function GithubIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export function ProjectOverviewTab({ project, onUpdateProject }: ProjectOverviewTabProps) {
  const projectId = project.id || project._id || project.projectCode;

  // Discussion state
  const [discussions, setDiscussions] = useState<ProjectDiscussionNote[]>(
    project.discussions || []
  );
  const [noteText, setNoteText] = useState("");
  const [noteAuthor, setNoteAuthor] = useState(project.projectManager || "Project Lead");
  const [isPostingNote, setIsPostingNote] = useState(false);

  // GitHub Repositories state
  const [repositories, setRepositories] = useState<ProjectRepository[]>(project.repositories || []);
  const [isRepoModalOpen, setIsRepoModalOpen] = useState(false);
  const [repoName, setRepoName] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [repoBranch, setRepoBranch] = useState("main");

  // Post Discussion Note handler
  const handlePostNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    setIsPostingNote(true);
    const newNote: ProjectDiscussionNote = {
      id: `disc_${Date.now()}`,
      author: noteAuthor.trim() || "Team Member",
      role: "Engineering",
      text: noteText.trim(),
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setDiscussions((prev) => [newNote, ...prev]);
    setNoteText("");
    toast.success("Project discussion note logged.");

    try {
      await addProjectDiscussion(projectId, newNote);
    } catch {
      // optimistic state retained
    } finally {
      setIsPostingNote(false);
    }
  };

  // Link Repository handler
  const handleLinkRepo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoName.trim() || !repoUrl.trim()) {
      toast.error("Please enter repository name and URL.");
      return;
    }

    const newRepo: ProjectRepository = {
      id: `repo_${Date.now()}`,
      name: repoName.trim(),
      url: repoUrl.trim(),
      branch: repoBranch.trim() || "main",
      provider: "github",
      lastCommitMessage: "Branch synchronized with project",
      openPrCount: 0,
    };

    setRepositories((prev) => [...prev, newRepo]);
    setIsRepoModalOpen(false);
    setRepoName("");
    setRepoUrl("");
    toast.success(`GitHub repository ${newRepo.name} linked to project!`);

    try {
      await addProjectRepository(projectId, newRepo);
    } catch {
      // optimistic state retained
    }
  };

  // Delete Repository handler
  const handleDeleteRepo = async (repoId: string, name: string) => {
    if (!confirm(`Unlink repository ${name} from this project?`)) return;
    setRepositories((prev) => prev.filter((r) => r.id !== repoId && r.name !== repoId));
    toast.success("Repository unlinked.");

    try {
      await deleteProjectRepository(projectId, repoId);
    } catch {
      // optimistic state retained
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Baseline Metrics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-2xs">
          <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Contract Baseline Value
          </span>
          <div className="mt-2 text-2xl font-black text-slate-900">
            ${(project.contractValue || 0).toLocaleString()}
          </div>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            Blended Rate: ${project.hourlyRate}/hr
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-2xs">
          <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Hours Consumed
          </span>
          <div className="mt-2 text-2xl font-black text-slate-900">
            {project.consumedHours}h{" "}
            <span className="text-xs font-normal text-slate-400">/ {project.budgetHours}h</span>
          </div>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            {project.budgetHours - project.consumedHours}h Remaining in scope
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-2xs">
          <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Target Delivery Date
          </span>
          <div className="mt-2 text-xl font-black text-slate-900">{project.targetLaunchDate}</div>
          <p className="mt-1 text-xs font-semibold text-slate-500">Started: {project.startDate}</p>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-2xs">
          <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Delivery Health
          </span>
          <div className="mt-2 text-xl font-black text-emerald-700">{project.status}</div>
          <p className="mt-1 text-xs font-semibold text-slate-500">Phase: {project.phase}</p>
        </div>
      </div>

      {/* Grid: GitHub Repositories & Project Discussions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* GitHub Repositories Section */}
        <div className="flex flex-col justify-between space-y-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xs">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <GithubIcon className="h-5 w-5 text-slate-900" />
                <h3 className="text-sm font-black text-slate-900">GitHub Repositories Linking</h3>
              </div>

              <button
                type="button"
                onClick={() => setIsRepoModalOpen(true)}
                className="flex cursor-pointer items-center gap-1 rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-indigo-600"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Link Repo</span>
              </button>
            </div>

            <div className="mt-4 space-y-2.5">
              {repositories.map((repo, idx) => (
                <div
                  key={repo.id ? `${repo.id}_${idx}` : `repo_${repo.name}_${idx}`}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 transition-all hover:border-slate-200"
                >
                  <div className="flex items-center gap-2.5">
                    <GitBranch className="h-4 w-4 text-slate-500" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{repo.name}</span>
                        <span className="rounded-md bg-purple-50 px-1.5 py-0.5 text-[9px] font-bold text-purple-700">
                          {repo.branch}
                        </span>
                      </div>
                      {repo.lastCommitMessage && (
                        <p className="mt-0.5 max-w-xs truncate text-[10px] text-slate-500">
                          {repo.lastCommitMessage}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800"
                    >
                      <span>Open</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>

                    <button
                      type="button"
                      onClick={() => handleDeleteRepo(repo.id || repo.name, repo.name)}
                      className="cursor-pointer p-1 text-slate-400 transition-colors hover:text-rose-600"
                      title="Unlink repository"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {repositories.length === 0 && (
                <div className="py-8 text-center text-xs text-slate-400">
                  No GitHub repositories linked yet. Click &quot;+ Link Repo&quot; to connect.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-indigo-100/70 bg-indigo-50/50 p-3 text-[11px] text-indigo-800">
            💡 Linked repositories synchronize branch commits and PR review requests into the Sprint
            Kanban board.
          </div>
        </div>

        {/* Project Discussion / Notes Box */}
        <div className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-indigo-600" />
              <h3 className="text-sm font-black text-slate-900">
                Project Discussion & Engineering Notes
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-400">
              {discussions.length} Notes Logged
            </span>
          </div>

          {/* New Note Form */}
          <form onSubmit={handlePostNote} className="space-y-2">
            <textarea
              rows={2}
              required
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Post a project discussion note, technical decision, or meeting update..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none"
            />
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={noteAuthor}
                onChange={(e) => setNoteAuthor(e.target.value)}
                placeholder="Author Name"
                className="w-40 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-700 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isPostingNote || !noteText.trim()}
                className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-indigo-700 disabled:opacity-50"
              >
                <Send className="h-3 w-3" />
                <span>Post Note</span>
              </button>
            </div>
          </form>

          {/* Notes Feed */}
          <div className="max-h-64 space-y-2.5 overflow-y-auto pt-1 pr-1">
            {discussions.map((note, idx) => (
              <div
                key={note.id ? `${note.id}_${idx}` : `note_${idx}`}
                className="space-y-1 rounded-2xl border border-slate-100 bg-slate-50/70 p-3"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-800">{note.author}</span>
                    <span className="py-0.2 rounded bg-indigo-100/70 px-1.5 text-[9px] font-bold text-indigo-700">
                      {note.role}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">{note.createdAt}</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-600">{note.text}</p>
              </div>
            ))}

            {discussions.length === 0 && (
              <div className="py-6 text-center text-xs text-slate-400">
                No discussion notes posted yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SOW Milestones Gate Matrix */}
      <div className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xs">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-900">
            SOW Deliverable Milestones & Sign-off Gates
          </h3>
          <span className="text-xs font-bold text-slate-400">
            {project.milestones?.length || 0} Key Milestones
          </span>
        </div>

        <div className="space-y-3">
          {project.milestones?.map((m, idx) => (
            <div
              key={m.id ? `${m.id}_${idx}` : `m_${idx}`}
              className="flex flex-col justify-between gap-2 rounded-2xl border border-slate-100 bg-slate-50/40 p-4 sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2
                  className={`h-5 w-5 shrink-0 ${
                    m.status === "Completed" ? "text-emerald-600" : "text-slate-300"
                  }`}
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{m.title}</h4>
                  {m.signOffBy && (
                    <span className="text-[10px] text-slate-400">
                      Sign-off verified by: {m.signOffBy}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 pl-8 sm:pl-0">
                <span className="text-xs font-medium text-slate-500">Due: {m.targetDate}</span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                    m.status === "Completed"
                      ? "bg-emerald-50 text-emerald-700"
                      : m.status === "In Progress"
                        ? "bg-indigo-50 text-indigo-700"
                        : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {m.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Link GitHub Modal */}
      {isRepoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md space-y-4 rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900">Link GitHub Repository</h3>
              <button
                type="button"
                onClick={() => setIsRepoModalOpen(false)}
                className="cursor-pointer rounded-full p-1 text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLinkRepo} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700">Repository Name *</label>
                <input
                  type="text"
                  required
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value)}
                  placeholder="e.g. globallogistics-web-app"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">GitHub URL *</label>
                <input
                  type="url"
                  required
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/webxode/..."
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Default Branch</label>
                <input
                  type="text"
                  value={repoBranch}
                  onChange={(e) => setRepoBranch(e.target.value)}
                  placeholder="main"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:border-indigo-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={() => setIsRepoModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer rounded-xl bg-slate-900 px-4 py-1.5 text-xs font-bold text-white hover:bg-indigo-600"
                >
                  Connect Repository
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
