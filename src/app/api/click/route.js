// app/api/click/route.js
// Click tracking endpoint (prevents 404s)

export async function POST(req) {
  try {
    const body = await req.json();
    const { timestamp, button } = body;

    // Optional: Log click for analytics
    // You can add database logging here if needed
    console.log('Click tracked:', { timestamp, button });

    // Return success immediately (minimal processing)
    return new Response(
      JSON.stringify({ success: true }), 
      { 
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store'
        }
      }
    );
  } catch (error) {
    // Always return 200 to prevent client retries
    return new Response(
      JSON.stringify({ success: false }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Reject GET requests to prevent bot crawling
export async function GET() {
  return new Response(
    JSON.stringify({ error: 'Method not allowed' }), 
    { 
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}
