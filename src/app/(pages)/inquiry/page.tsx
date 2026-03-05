import { Suspense } from "react";
import { MainTemplate } from "../../shared_components/MainTemplate";
import { InquiryForm } from "./components/InquiryForm";

export const metadata = {
  title: "Service Inquiry | Zentavos",
  description: "Tell us about your financial needs and we'll reach out to discuss how Zentavos can help.",
};

export default function InquiryPage() {
  return (
    <Suspense>
      <MainTemplate>
        <div className="flex flex-col items-center px-[5vw] py-[6vw]">
          <h1 className="text-[#1f6d4f] text-[3.5vw] font-medium text-center mb-[1vw]">
            Service Inquiry
          </h1>
          <p className="text-gray-500 text-center text-[1.2vw] mb-[4vw] max-w-[500px]">
            Tell us about your financial needs and a member of our team will be in touch within 1–2 business days.
          </p>
          <InquiryForm />
        </div>
      </MainTemplate>
    </Suspense>
  );
}
