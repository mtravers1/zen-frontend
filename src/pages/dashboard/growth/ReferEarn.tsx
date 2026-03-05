import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { Gift, Copy, Share2, DollarSign, Calendar, HelpCircle, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";

const ReferEarnPage = () => {
  const referralLink = "https://zentavos.com/refer/abc123xyz";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied to clipboard!");
  };

  const rewards = [
    {
      icon: DollarSign,
      title: "$100 for you",
      description: "Receive $100 credit when your referral becomes a paying customer.",
      color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    },
    {
      icon: Calendar,
      title: "30 days for invited firm",
      description: "Your referral gets 30 days free to try all premium features.",
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    },
  ];

  const faqs = [
    {
      question: "How does the referral program work?",
      answer: "Share your unique referral link with other firms. When they sign up and become a paying customer, you'll receive a $100 credit on your account.",
    },
    {
      question: "When do I receive my reward?",
      answer: "Rewards are credited to your account within 30 days after your referral completes their first payment.",
    },
    {
      question: "Is there a limit to how many people I can refer?",
      answer: "No! There's no limit. The more firms you refer, the more you earn.",
    },
    {
      question: "Can I refer existing customers?",
      answer: "Referrals must be new customers who haven't had an account with us before.",
    },
  ];

  return (
      <DashboardPageHeader
        title="Refer & earn"
        description="Share Zentavos and earn rewards"
        icon={<Gift className="w-5 h-5 text-primary" />}
      />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Referral Link</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input value={referralLink} readOnly className="flex-1" />
            <Button variant="outline" onClick={handleCopyLink}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {rewards.map((reward, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${reward.color}`}>
                  <reward.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{reward.title}</h3>
                  <p className="text-sm text-muted-foreground">{reward.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
  );
};

export default ReferEarnPage;
