// ----------------------------------------
// OUR SIMPLE PRACTICE AI AGENT
// ----------------------------------------

const API_URL = "http://localhost:3000";

const goal = "Submit a software engineering internship application.";

console.log("🤖 Agent started.");
console.log("Goal:", goal);


// ----------------------------------------
// AGENT'S TOOL
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
// AGENT MAKES A DECISION
// ----------------------------------------

async function runAgent() {

  console.log("\n🤖 Agent decision:");

  console.log(
    "I need to get a challenge before I can submit the application."
  );

  const challenge = await getChallenge(
    "student@example.com"
  );

  console.log("\n🤖 Agent received:");

  console.log(challenge);
}

runAgent();