import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ComposeMessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (message: { to: string; subject: string; body: string }) => void;
}

const ComposeMessageDialog = ({ open, onOpenChange, onSubmit }: ComposeMessageDialogProps) => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = () => {
    if (!to.trim() || !subject.trim()) return;
    onSubmit({ to: to.trim(), subject: subject.trim(), body: body.trim() });
    setTo(""); setSubject(""); setBody("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>Compose Message</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2"><Label>To *</Label><Input value={to} onChange={(e) => setTo(e.target.value)} placeholder="Recipient name or email" /></div>
          <div className="space-y-2"><Label>Subject *</Label><Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Message subject" /></div>
          <div className="space-y-2"><Label>Message</Label><Textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write your message..." className="min-h-[120px]" /></div>
        </div>
        <DialogFooter><Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button><Button onClick={handleSubmit} disabled={!to.trim() || !subject.trim()}>Send Message</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ComposeMessageDialog;
