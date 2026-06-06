const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SPREADSHEET_ID = "18No6vxWrEjsP6tLXr2V50tHMCm6oBCHrzL6-yhqtTSw";
const RANGE = "Sheet1!A:G";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const GOOGLE_SHEETS_API_KEY = Deno.env.get("GOOGLE_SHEETS_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
    if (!GOOGLE_SHEETS_API_KEY) throw new Error("GOOGLE_SHEETS_API_KEY is not configured");

    const body = await req.json();
    const { name, email, phone, service, date, message } = body ?? {};

    // Basic validation
    const errors: string[] = [];
    if (!name || typeof name !== "string" || name.trim().length === 0 || name.length > 100) errors.push("name");
    if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email) || email.length > 255) errors.push("email");
    if (!phone || typeof phone !== "string" || phone.trim().length === 0 || phone.length > 30) errors.push("phone");
    if (!service || typeof service !== "string" || service.length > 100) errors.push("service");
    if (date && (typeof date !== "string" || date.length > 30)) errors.push("date");
    if (!message || typeof message !== "string" || message.trim().length === 0 || message.length > 2000) errors.push("message");

    if (errors.length > 0) {
      return new Response(JSON.stringify({ error: "Invalid input", fields: errors }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const timestamp = new Date().toISOString();
    const values = [[timestamp, name.trim(), email.trim(), phone.trim(), service, date ?? "", message.trim()]];

    const url = `${GATEWAY_URL}/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": GOOGLE_SHEETS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Google Sheets API failed [${response.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("submit-contact error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
