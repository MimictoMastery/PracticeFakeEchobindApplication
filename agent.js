// ----------------------------------------
// OUR SIMPLE PRACTICE AI AGENT
// ----------------------------------------

const crypto = require("crypto");

const API_URL = "http://localhost:3000";

const goal = "Submit a software engineering internship application.";

console.log("🤖 Agent started.");
console.log("Goal:", goal);


// ----------------------------------------
// TOOL #1
// GET A CHALLENGE
// ----------------------------------------

async function getChallenge(email) {

  console.log("\n🔧 TOOL: Getting a challenge...");

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

  console.log("Challenge received!");

  return data;
}


// ----------------------------------------
// TOOL #2
// CALCULATE THE PROOF
// ----------------------------------------

function calculateProof(nonce, email) {

  console.log("\n🔧 TOOL: Calculating proof...");

  const cleanEmail = email.trim().toLowerCase();

  const proof = crypto
    .createHash("sha256")
    .update(nonce + cleanEmail)
    .digest("hex");

  console.log("Proof calculated!");

  return proof;
}


// ----------------------------------------
// TOOL #3
// SUBMIT THE APPLICATION
// ----------------------------------------

async function submitApplication(token, proof, email) {

  console.log("\n🔧 TOOL: Submitting application...");

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

  const data = await response.json();

  console.log("Application response:");

  console.log(data);

  return {
    status: response.status,
    data: data
  };
}


// ----------------------------------------
// AGENT'S PLAN
// ----------------------------------------

const plan = [
  "Get a challenge",
  "Calculate the proof",
  "Prepare the application",
  "Submit the application"
];

console.log("\nAgent plan:");

plan.forEach((step, index) => {
  console.log(`${index + 1}. ${step}`);
});


// ----------------------------------------
// AGENT RUNS THE PLAN
// ----------------------------------------

async function runAgent() {

  console.log("\n🤖 Agent decision:");

  console.log(
    "I need to get a challenge before I can submit the application."
  );

  const email = "student@example.com";


  // ----------------------------------------
  // TOOL #1
  // ----------------------------------------

  const challenge = await getChallenge(email);

  console.log("\n🤖 Agent received challenge:");

  console.log(challenge);


  // ----------------------------------------
  // TOOL #2
  // ----------------------------------------

  const proof = calculateProof(
    challenge.nonce,
    email
  );

  console.log("\n🤖 Agent now has a proof:");

  console.log(proof);


  // ----------------------------------------
  // TOOL #3
  // ----------------------------------------

  const result = await submitApplication(
    challenge.token,
    proof,
    email
  );

  console.log("\n🤖 Agent received final result:");

  console.log(result);
}

runAgent();