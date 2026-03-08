import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { UserPlus, Copy, Mail, Link2, Settings, FileText, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ClientSignupPage = () => {
  const signupLink = "https://zentavos.app/signup/yourfirm";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(signupLink);
    toast.success("Signup link copied!");
  };

  const signupSteps = [
    { step: 1, title: "Client clicks your signup link", completed: true },
    { step: 2, title: "Client fills out registration form", completed: true },
    { step: 3, title: "Email verification sent", completed: true },
    { step: 4, title: "Client creates password", completed: false },
    { step: 5, title: "Access to client portal", completed: false },
  ];

  return (
      <DashboardPageHeader
        title="Client signup"
        description="Configure how new clients join your firm"
        icon={<UserPlus className="w-5 h-5 text-primary" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Signup Link */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link2 className="w-5 h-5" />
              Your Signup Link
            </CardTitle>
            <CardDescription>Share this link with prospective clients.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input value={signupLink} readOnly className="flex-1" />
              <Button variant="outline" onClick={handleCopyLink}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Mail className="w-4 h-4 mr-2" />
                Email Link
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Embed on Website
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Signup Flow */}
        <Card>
          <CardHeader>
            <CardTitle>Signup Flow</CardTitle>
            <CardDescription>How new clients will register.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {signupSteps.map((item) => (
                <div key={item.step} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    item.completed 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-secondary-foreground"
                  }`}>
                    {item.completed ? <CheckCircle className="w-4 h-4" /> : item.step}
                  </div>
                  <span className={item.completed ? "" : "text-muted-foreground"}>
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Signup Settings */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Signup Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Require Admin Approval</p>
              <p className="text-sm text-muted-foreground">
                Manually approve each new client before they can access the portal.
              </p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto-assign to Team Member</p>
              <p className="text-sm text-muted-foreground">
                Automatically assign new clients to an account manager.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Send Welcome Email</p>
              <p className="text-sm text-muted-foreground">
                Send a customized welcome email to new clients.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Collect Company Information</p>
              <p className="text-sm text-muted-foreground">
                Require business details during registration.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Welcome Message */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Welcome Message
          </CardTitle>
          <CardDescription>Customize the message shown after signup.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Welcome to our firm! We're excited to work with you..."
            className="min-h-[120px]"
            defaultValue="Welcome to our firm! We're excited to work with you. You now have access to your client portal where you can view documents, pay invoices, and communicate with our team."
          />
        </CardContent>
      </Card>

      <div className="flex justify-end mt-6">
        <Button>Save Settings</Button>
      </div>
  );
};

export default ClientSignupPage;

