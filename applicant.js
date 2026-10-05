const crypto = require("crypto");

const API_URL = "http://localhost:3000";

const email = "student@example.com";

async function getChallenge() {
  console.log("STEP 1: Asking for a challenge...");

  const response = await fetch(`${API_URL}/api/challenge`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },

    body: JSON.stringify({
      email: email
    })
  });

  const data = await response.json();

  console.log("Challenge response:");
  console.log(data);

  return data;
}

function calculateProof(nonce, email) {
  console.log("\nSTEP 2: Calculating proof...");

  const cleanEmail = email.trim().toLowerCase();

  const proof = crypto
    .createHash("sha256")
    .update(nonce + cleanEmail)
    .digest("hex");

  console.log("Nonce:", nonce);
  console.log("Email:", cleanEmail);
  console.log("Proof:", proof);

  return proof;
}

async function submitApplication(token, proof) {
  console.log("\nSTEP 3: Submitting application...");

  const application = {
    name: "Practice Student",
    email: email,
    proof: proof
  };

  const response = await fetch(`${API_URL}/api/apply`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-Challenge-Token": token
    },

    body: JSON.stringify(application)
  });

  console.log("\nHTTP Status:", response.status);

const data = await response.json();

console.log("Application response:");
console.log(data);
}

async function main() {
  const challenge = await getChallenge();

const proof = calculateProof(
  challenge.nonce,
  email
);

  await submitApplication(
    challenge.token,
    proof
  );
}

main();