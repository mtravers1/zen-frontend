'use client'

import {
  FileText,
  CreditCard,
  MessageSquare,
  Bell,
  BookOpen,
  ShoppingBag,
  GitBranch,
  Briefcase,
  User,
  LayoutDashboard,
} from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Dashboard Overview",
    description: "A personalized snapshot of your account activity, upcoming tasks, and key metrics at a glance.",
  },
  {
    icon: Briefcase,
    title: "My Services",
    description: "View and manage all active services, track progress, and see what's included in your plan.",
  },
  {
    icon: CreditCard,
    title: "Billing & Invoices",
    description: "Access your full billing history, download invoices, manage payment methods, and track outstanding balances.",
  },
  {
    icon: FileText,
    title: "Documents",
    description: "Securely upload, store, and retrieve important documents shared between you and your team.",
  },
  {
    icon: MessageSquare,
    title: "Messages",
    description: "Communicate directly with your account team through a secure in-portal messaging system.",
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Stay informed with real-time alerts for invoice updates, document requests, task completions, and more.",
  },
  {
    icon: GitBranch,
    title: "Workflow",
    description: "Track the progress of ongoing projects and workflows your team is managing on your behalf.",
  },
  {
    icon: BookOpen,
    title: "Resources",
    description: "Access guides, templates, and reference materials curated to help you get the most out of your services.",
  },
  {
    icon: ShoppingBag,
    title: "Shop",
    description: "Browse and purchase additional services, add-ons, and products directly from the portal.",
  },
  {
    icon: BookOpen,
    title: "Training",
    description: "Access training modules, video walkthroughs, and onboarding materials tailored to your account.",
  },
  {
    icon: User,
    title: "Account Settings",
    description: "Update your profile, change your password, manage notification preferences, and control account details.",
  },
];

export default function PortalLayout({
  children: _children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-start px-4 py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mb-14">
        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
          Coming Soon
        </span>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Client Portal</h1>
        <p className="text-slate-500 text-lg">
          We&apos;re building a powerful portal to give you full visibility and control over your account.
          Here&apos;s a preview of everything that&apos;s on the way.
        </p>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex gap-4 items-start hover:shadow-md transition-shadow"
          >
            <div className="shrink-0 bg-blue-50 text-blue-600 rounded-xl p-3">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p className="mt-14 text-sm text-slate-400">
        Have questions? <a href="/contact-us" className="text-blue-500 hover:underline">Contact us</a> and we&apos;ll be happy to help.
      </p>
    </div>
  );
}
