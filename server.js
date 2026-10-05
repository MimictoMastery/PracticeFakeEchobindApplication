const http = require("http");
const crypto = require("crypto");

const PORT = 3000;

// This will hold our practice challenge
let challenge = null;

const server = http.createServer((req, res) => {
  // Tell the browser/API client that we are sending JSON
  res.setHeader("Content-Type", "application/json");

  // -----------------------------
  // GET /
  // -----------------------------
  if (req.method === "GET" && req.url === "/") {
    res.statusCode = 200;

    res.end(
      JSON.stringify({
        message: "Welcome to the FakeBind Practice API!"
      })
    );

    return;
  }

  // -----------------------------
  // POST /api/challenge
  // -----------------------------
  if (req.method === "POST" && req.url === "/api/challenge") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);

        if (!data.email) {
          res.statusCode = 422;

          res.end(
            JSON.stringify({
              error: "email is required"
            })
          );

          return;
        }

        const email = data.email.trim().toLowerCase();

        // Create a random nonce
        const nonce = crypto.randomBytes(16).toString("hex");

        // Create a random token
        const token = crypto.randomBytes(20).toString("hex");

        challenge = {
          email,
          nonce,
          token
        };

        res.statusCode = 200;

        res.end(
          JSON.stringify({
            token,
            nonce,
            expires_in: 900
          })
        );
      } catch (error) {
        res.statusCode = 400;

        res.end(
          JSON.stringify({
            error: "Invalid JSON"
          })
        );
      }
    });

    return;
  }

  // -----------------------------
  // POST /api/apply
  // -----------------------------
  if (req.method === "POST" && req.url === "/api/apply") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);

        const submittedToken = req.headers["x-challenge-token"];

        // Check token
        if (!challenge || submittedToken !== challenge.token) {
          res.statusCode = 422;

          res.end(
            JSON.stringify({
              error: "Invalid or missing challenge token"
            })
          );

          return;
        }

        // Calculate the proof ourselves
        const expectedProof = crypto
          .createHash("sha256")
          .update(challenge.nonce + challenge.email)
          .digest("hex");

        // Check proof
        if (data.proof !== expectedProof) {
          res.statusCode = 422;

          res.end(
            JSON.stringify({
              error: "Invalid proof"
            })
          );

          return;
        }

        // Check name
        if (!data.name) {
          res.statusCode = 422;

          res.end(
            JSON.stringify({
              error: "name is required"
            })
          );

          return;
        }

        // Everything worked!
        res.statusCode = 200;

        res.end(
          JSON.stringify({
            success: true,
            message: "🎉 Practice application accepted!",
            applicant: data.name
          })
        );

        // Make the challenge single-use
        challenge = null;
      } catch (error) {
        res.statusCode = 400;

        res.end(
          JSON.stringify({
            error: "Invalid JSON"
          })
        );
      }
    });

    return;
  }

  // -----------------------------
  // Unknown route
  // -----------------------------

  res.statusCode = 404;

  res.end(
    JSON.stringify({
      error: "Route not found"
    })
  );
});

server.listen(PORT, () => {
  console.log(`FakeBind API is running at http://localhost:${PORT}`);
});