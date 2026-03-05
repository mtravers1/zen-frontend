/**
 * Salesforce REST API client.
 * Uses Username-Password OAuth 2.0 grant (server-to-server).
 * Token is cached in module scope and refreshed when expired.
 */

interface TokenCache {
  accessToken: string;
  instanceUrl: string;
  expiresAt: number;
}

let tokenCache: TokenCache | null = null;

async function getAccessToken(): Promise<{ accessToken: string; instanceUrl: string }> {
  if (tokenCache && Date.now() < tokenCache.expiresAt) {
    return { accessToken: tokenCache.accessToken, instanceUrl: tokenCache.instanceUrl };
  }

  const instanceUrl = process.env.SALESFORCE_INSTANCE_URL ?? "https://login.salesforce.com";

  const params = new URLSearchParams({
    grant_type: "password",
    client_id: process.env.SALESFORCE_CLIENT_ID ?? "",
    client_secret: process.env.SALESFORCE_CLIENT_SECRET ?? "",
    username: process.env.SALESFORCE_USERNAME ?? "",
    password: `${process.env.SALESFORCE_PASSWORD ?? ""}${process.env.SALESFORCE_SECURITY_TOKEN ?? ""}`,
  });

  const res = await fetch(`${instanceUrl}/services/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Salesforce auth failed: ${text}`);
  }

  const data = await res.json();

  tokenCache = {
    accessToken: data.access_token,
    instanceUrl: data.instance_url,
    expiresAt: Date.now() + 2 * 60 * 60 * 1000, // cache for 2 hours
  };

  return { accessToken: data.access_token, instanceUrl: data.instance_url };
}

interface LeadData {
  type: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  phone?: string | null;
  company?: string | null;
  serviceType?: string | null;
  budget?: string | null;
  subject?: string | null;
  message?: string | null;
}

async function createSalesforceLead(lead: LeadData): Promise<string> {
  const { accessToken, instanceUrl } = await getAccessToken();

  const payload: Record<string, string> = {
    LastName: lead.lastName ?? lead.firstName ?? lead.email,
    Email: lead.email,
    LeadSource: lead.type === "newsletter" ? "Newsletter" : "Web Form",
    Company: lead.company ?? "Unknown",
  };

  if (lead.firstName) payload.FirstName = lead.firstName;
  if (lead.phone) payload.Phone = lead.phone;
  if (lead.serviceType) payload.Industry = lead.serviceType;
  if (lead.message || lead.subject) {
    payload.Description = [lead.subject, lead.message].filter(Boolean).join("\n\n");
  }
  if (lead.budget) payload.AnnualRevenue = lead.budget;

  const res = await fetch(`${instanceUrl}/services/data/v58.0/sobjects/Lead`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Salesforce Lead creation failed: ${text}`);
  }

  const data = await res.json();
  return data.id as string;
}

/**
 * Fire-and-forget safe wrapper.
 * Never throws — logs errors internally.
 * Returns the Salesforce Lead ID on success, null on failure.
 */
export async function pushLeadToSalesforce(lead: LeadData): Promise<string | null> {
  try {
    const id = await createSalesforceLead(lead);
    return id;
  } catch (err) {
    console.error("[Salesforce] Failed to push lead:", err);
    return null;
  }
}
