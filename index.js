export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return new Response("REvil License Server Running", {
        headers: { "content-type": "text/plain;charset=UTF-8" }
      });
    }

    if (url.pathname === "/verify" && request.method === "POST") {
      try {
        const data = await request.json();
        const code = data.code;

        if (!code) {
          return json({ status: "error", message: "No code provided" });
        }

        if (code === "TEST1234") {
          return json({
            status: "success",
            message: "Code valid",
            expires: "2026-01-01 00:00:00"
          });
        } else {
          return json({
            status: "invalid",
            message: "Code not valid"
          });
        }

      } catch (e) {
        return json({ status: "error", message: "Bad request" });
      }
    }

    return new Response("Not Found", { status: 404 });
  }
}

function json(data) {
  return new Response(JSON.stringify(data), {
    headers: { "content-type": "application/json;charset=UTF-8" }
  });
}
