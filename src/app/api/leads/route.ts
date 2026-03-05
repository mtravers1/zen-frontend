import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { pushLeadToSalesforce } from "@/lib/salesforce";
import { contactSchema, inquirySchema, newsletterSchema } from "@/lib/lead-schemas";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { type } = body;

  // Validate with the correct schema per type
  let parsed;
  if (type === "contact") {
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }
    parsed = result.data;
  } else if (type === "inquiry") {
    const result = inquirySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }
    parsed = result.data;
  } else if (type === "newsletter") {
    const result = newsletterSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }
    parsed = result.data;
  } else {
    return NextResponse.json({ error: "Invalid lead type." }, { status: 400 });
  }

  // Save to local DB first (never fails the request)
  const lead = await prisma.lead.create({
    data: {
      type: parsed.type,
      email: parsed.email,
      firstName: "firstName" in parsed ? parsed.firstName : undefined,
      lastName: "lastName" in parsed ? parsed.lastName : undefined,
      phone: "phone" in parsed ? parsed.phone : undefined,
      company: "company" in parsed ? parsed.company : undefined,
      serviceType: "serviceType" in parsed ? parsed.serviceType : undefined,
      budget: "budget" in parsed ? parsed.budget : undefined,
      subject: "subject" in parsed ? parsed.subject : undefined,
      message: "message" in parsed ? parsed.message : undefined,
    },
  });

  // Push to Salesforce in background — fire-and-forget
  pushLeadToSalesforce(lead).then((salesforceId) => {
    if (salesforceId) {
      prisma.lead.update({
        where: { id: lead.id },
        data: { salesforceId },
      }).catch(() => {});
    }
  });

  return NextResponse.json({ success: true }, { status: 201 });
}
