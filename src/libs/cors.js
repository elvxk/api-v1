export function addCorsHeaders(response) {
  // Header CORS
  response.headers.set("Access-Control-Allow-Origin", "*"); // Mengizinkan akses dari semua domain
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  ); // Tambahkan header Authorization jika diperlukan

  // Handle OPTIONS preflight request
  if (response.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  // Header Keamanan
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload",
  );
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self'; script-src 'self'",
  );

  // Header Kontrol Cache
  response.headers.set("Cache-Control", "no-store");

  return response;
}
