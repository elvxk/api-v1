export function addCorsHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", "*"); // Ganti '*' dengan domain yang diizinkan
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  return response;
}
