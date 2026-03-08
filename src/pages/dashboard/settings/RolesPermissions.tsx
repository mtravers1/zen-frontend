import { useState } from "react";
import { Shield, Check, X } from "lucide-react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const ROLES = [
  "Executive Assistant",
  "Account Manager",
  "Relationship Manager",
  "Executive Manager",
  "Director",
  "Super Admin",
] as const;

type Role = typeof ROLES[number];

const PERMISSIONS = [
  { key: "viewClients", label: "View Clients" },
  { key: "editClients", label: "Edit Clients" },
  { key: "viewBilling", label: "View Billing" },
  { key: "editBilling", label: "Edit Billing" },
  { key: "viewDocuments", label: "View Documents" },
  { key: "uploadDocuments", label: "Upload Documents" },
  { key: "viewInternalDocs", label: "View Internal Docs" },
  { key: "manageTeam", label: "Manage Team" },
  { key: "manageSettings", label: "Manage Settings" },
  { key: "viewReports", label: "View Reports" },
  { key: "approveInvoices", label: "Approve Invoices" },
  { key: "managePipelines", label: "Manage Pipelines" },
] as const;

type PermissionKey = typeof PERMISSIONS[number]["key"];

type RolePermissions = Record<PermissionKey, boolean>;

const defaultPermissions: Record<Role, RolePermissions> = {
  "Executive Assistant": {
    viewClients: true,
    editClients: false,
    viewBilling: false,
    editBilling: false,
    viewDocuments: true,
    uploadDocuments: false,
    viewInternalDocs: false,
    manageTeam: false,
    manageSettings: false,
    viewReports: false,
    approveInvoices: false,
    managePipelines: false,
  },
  "Account Manager": {
    viewClients: true,
    editClients: true,
    viewBilling: true,
    editBilling: false,
    viewDocuments: true,
    uploadDocuments: true,
    viewInternalDocs: false,
    manageTeam: false,
    manageSettings: false,
    viewReports: true,
    approveInvoices: false,
    managePipelines: true,
  },
  "Relationship Manager": {
    viewClients: true,
    editClients: true,
    viewBilling: true,
    editBilling: true,
    viewDocuments: true,
    uploadDocuments: true,
    viewInternalDocs: true,
    manageTeam: false,
    manageSettings: false,
    viewReports: true,
    approveInvoices: false,
    managePipelines: true,
  },
  "Executive Manager": {
    viewClients: true,
    editClients: true,
    viewBilling: true,
    editBilling: true,
    viewDocuments: true,
    uploadDocuments: true,
    viewInternalDocs: true,
    manageTeam: true,
    manageSettings: false,
    viewReports: true,
    approveInvoices: true,
    managePipelines: true,
  },
  Director: {
    viewClients: true,
    editClients: true,
    viewBilling: true,
    editBilling: true,
    viewDocuments: true,
    uploadDocuments: true,
    viewInternalDocs: true,
    manageTeam: true,
    manageSettings: true,
    viewReports: true,
    approveInvoices: true,
    managePipelines: true,
  },
  "Super Admin": {
    viewClients: true,
    editClients: true,
    viewBilling: true,
    editBilling: true,
    viewDocuments: true,
    uploadDocuments: true,
    viewInternalDocs: true,
    manageTeam: true,
    manageSettings: true,
    viewReports: true,
    approveInvoices: true,
    managePipelines: true,
  },
};

const roleColors: Record<Role, string> = {
  "Executive Assistant": "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  "Account Manager": "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  "Relationship Manager": "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  "Executive Manager": "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  Director: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  "Super Admin": "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
};

const RolesPermissionsPage = () => {
  const [permissions, setPermissions] = useState<Record<Role, RolePermissions>>(defaultPermissions);

  const togglePermission = (role: Role, permKey: PermissionKey) => {
    setPermissions((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [permKey]: !prev[role][permKey],
      },
    }));
  };

  const getPermissionCount = (role: Role) => {
    return Object.values(permissions[role]).filter(Boolean).length;
  };

  const handleSave = () => {
    toast.success("Role permissions saved successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <DashboardPageHeader
          title="Roles & Permissions"
          description="Configure what each role can access and modify"
          icon={<Shield className="w-6 h-6" />}
        />
        <Button onClick={handleSave}>
          <Check className="w-4 h-4 mr-2" />Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {ROLES.map((role) => (
          <Card key={role} className="flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-base">
                <span>{role}</span>
                <Badge className={`text-xs ${roleColors[role]}`} variant="outline">
                  {getPermissionCount(role)}/{PERMISSIONS.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-3">
              {PERMISSIONS.map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    {permissions[role][key] ? (
                      <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    ) : (
                      <X className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    )}
                    <span className="text-sm truncate">{label}</span>
                  </div>
                  <Switch
                    checked={permissions[role][key]}
                    onCheckedChange={() => togglePermission(role, key)}
                    className="shrink-0"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end pt-2">
        <Button onClick={handleSave} size="lg">
          <Check className="w-4 h-4 mr-2" />Save All Changes
        </Button>
      </div>
    </div>
  );
};

export default RolesPermissionsPage;
