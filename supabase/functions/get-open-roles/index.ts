import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/google_sheets/v4';
const SPREADSHEET_ID = '1RcXhzTFnE_RjEs2rJqbOzkkCEuMBz7sbjFcrTknZNo0';
const RANGE = 'Sheet2!A1:E1000';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const GOOGLE_SHEETS_API_KEY = Deno.env.get('GOOGLE_SHEETS_API_KEY');

    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY is not configured');
    if (!GOOGLE_SHEETS_API_KEY) throw new Error('GOOGLE_SHEETS_API_KEY is not configured');

    const url = `${GATEWAY_URL}/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': GOOGLE_SHEETS_API_KEY,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Google Sheets API failed [${response.status}]: ${JSON.stringify(data)}`);
    }

    const rows: string[][] = data.values || [];
    const [, ...body] = rows;
    const roles = body
      .filter((r) => r && r.some((c) => (c ?? '').toString().trim() !== ''))
      .map((r) => ({
        timestamp: r[0] ?? '',
        department: r[1] ?? '',
        location: r[2] ?? '',
        position: r[3] ?? '',
        experience: r[4] ?? '',
      }));

    return new Response(JSON.stringify({ success: true, roles }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('get-open-roles error:', message);
    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
