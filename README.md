# 🤖 Echobind Agentic Coding Practice

A beginner-friendly Node.js project I built to practice working with APIs, challenge tokens, SHA-256 proofs, HTTP status codes, and agent-style workflows.

This project was created as a **local practice environment** before attempting an API-driven Software Engineering Internship application.

## 🎯 What I Practiced

This project helped me practice:

- Node.js
- JavaScript
- HTTP requests
- REST-style API endpoints
- `POST` requests
- JSON
- HTTP headers
- Challenge tokens
- Nonces
- SHA-256 hashing
- API validation
- HTTP status codes
- Error handling
- Basic agent-style workflows

## 🧩 How It Works

The project contains two main parts:

### 1. Fake API Server

`server.js` creates a small API that runs locally on my computer.

It provides two endpoints:

```text
POST /api/challenge
POST /api/apply
```

The challenge endpoint generates a temporary token and nonce.

The application endpoint checks the submitted token and SHA-256 proof.

### 2. Applicant Program

`applicant.js` acts as the client communicating with the practice API.

The workflow is:

```text
Request Challenge
       ↓
Receive Token + Nonce
       ↓
Calculate SHA-256 Proof
       ↓
Submit Application
       ↓
API Validates Request
       ↓
Success or Error
```

## 🧪 Practicing Error Handling

I intentionally submitted an incorrect proof to see how the API responded.

The API returned:

```text
HTTP Status: 422
Invalid proof
```

I then corrected the code and submitted the request again.

The successful response was:

```text
HTTP Status: 200
```

This helped me understand how APIs communicate validation errors and how to troubleshoot them.

## 🤖 Agent Practice

`agent.js` is an early practice version of an agent-style workflow.

It starts with a goal:

```text
Submit a software engineering internship application.
```

It then creates a basic plan:

```text
1. Get a challenge
2. Calculate the proof
3. Prepare the application
4. Submit the application
```

The next stage of the project is to connect these steps so the agent can use tools and make decisions based on API responses.

## 📁 Project Structure

```text
echobind-practice/
│
├── agent.js
├── applicant.js
├── server.js
├── package.json
├── .gitignore
└── README.md
```

## 🚀 How to Run the Project

### 1. Clone the repository

```bash
git clone YOUR-REPOSITORY-URL
```

### 2. Open the project

```bash
cd echobind-practice
```

### 3. Install dependencies

```bash
npm install
```

The practice API uses Node's built-in modules, so no additional packages are required for the basic version.

### 4. Start the practice API

```bash
node server.js
```

You should see:

```text
FakeBind API is running at http://localhost:3000
```

### 5. Open a second terminal

Run:

```bash
node applicant.js
```

The program will request a challenge, calculate the proof, and submit the practice application.

## 🔐 Security

This project uses a **fake local API** for practice.

No real Echobind application credentials, API keys, or production secrets are stored in this repository.

Temporary challenge tokens are generated while the local server is running and are not stored in the source code.

The `.gitignore` file also excludes environment files:

```text
node_modules/
.env
.env.*
```

## 📚 What I Learned

One of the biggest things I learned from this project is that an API is a way for programs to communicate with each other.

I also learned that an HTTP `422` response doesn't necessarily mean the server is broken. It can mean that the server received my request but rejected information that didn't pass validation.

The practice exercise gave me experience with:

```text
Request
   ↓
Response
   ↓
Read the error
   ↓
Find the problem
   ↓
Fix the code
   ↓
Try again
   ↓
Success
```

## 🌱 Next Steps

Future improvements to this project include:

- Connect the agent to the practice API
- Add more API validation
- Improve error handling
- Add environment variables for secrets
- Connect an AI model to the agent
- Give the agent tools it can use
- Practice submitting a real API-driven application

## ⚠️ Disclaimer

This is a **personal learning project** created to practice API and agentic coding concepts.

It is not the Echobind production application or an official Echobind tool.