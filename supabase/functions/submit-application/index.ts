const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SPREADSHEET_ID = "1RcXhzTFnE_RjEs2rJqbOzkkCEuMBz7sbjFcrTknZNo0";
const RANGE = "Sheet3!A:G";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const GOOGLE_SHEETS_API_KEY = Deno.env.get("GOOGLE_SHEETS_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
    if (!GOOGLE_SHEETS_API_KEY) throw new Error("GOOGLE_SHEETS_API_KEY is not configured");

    const body = await req.json();
    const { fullName, phone, email, city, position, department } = body ?? {};

    const errors: string[] = [];
    if (!fullName || typeof fullName !== "string" || !fullName.trim() || fullName.length > 100) errors.push("fullName");
    if (!phone || typeof phone !== "string" || !phone.trim() || phone.length > 30) errors.push("phone");
    if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email) || email.length > 255) errors.push("email");
    if (!city || typeof city !== "string" || !city.trim() || city.length > 100) errors.push("city");

    if (errors.length > 0) {
      return new Response(JSON.stringify({ success: false, error: "Invalid input", fields: errors }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const timestamp = new Date().toISOString();
    const values = [[
      timestamp,
      String(position ?? "").slice(0, 200),
      String(department ?? "").slice(0, 200),
      fullName.trim(),
      phone.trim(),
      email.trim(),
      city.trim(),
    ]];

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
    if (!response.ok) throw new Error(`Google Sheets API failed [${response.status}]: ${JSON.stringify(data)}`);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("submit-application error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
