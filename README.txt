Rule Engine with AST Project 
=====================================
1. Codebase
Platform:
Backend:- https://github.com/kri-premlata/RuleEngine
Frontend:- https://github.com/kri-premlata/RuleEngine-UI


Rule Engine Project Setup and Commands
Backend Commands
Navigate to the Backend Directory:

Initialize a New Node.js Project:
npm init -y

Install Required Dependencies:
npm install express body-parser cors dotenv mongoose morgan


Create the Main Application File:
 app.js

Run the Backend Application:
Using Nodemon (for development with auto-reload):
npm install --save-dev nodemon
nodemon app.js


Alternatively, run it without Nodemon:
node app.js
Frontend Commands


Navigate to the Frontend Directory:
Create a New React Application with Vite:
npm create vite@latest ruleEngine --template react


Navigate to the Created React Application Directory:
cd ruleEngine


Install Required Dependencies:
npm install axios react-router-dom tailwindcss

Start the Development Server:
npm run dev

PORT=3000
MONGODB_URL=mongodb://localhost:27017/rule-engine

2.3 Installation Instructions
Clone the Repository:

bash
Copy code
git clone <repository-url>
cd rule-engine
Backend Setup
Navigate to the Backend Folder:

bash
Copy code
cd backend
Initialize a New Node.js Project:

bash
Copy code
npm init -y
Install Dependencies:

bash
Copy code
npm install express body-parser cors dotenv mongoose morgan
Create the Main Application File:
Create a file named app.js in the root of the backend folder.
Run the Application:
For development with auto-reload:
npm install --save-dev nodemon
nodemon app.js


Frontend Setup
Navigate to the Frontend Folder:
Create a New React Application with Vite:
npm create vite@latest ruleEngine --template react
cd ruleEngine


Install Dependencies:
npm install axios react-router-dom
npm install --save-dev tailwindcss

Start the Development Server:
npm run dev
Starting the Application


Backend:
npm start
Frontend:

bash
Copy code
npm run dev
Access the Application:

Frontend: http://localhost:5173/
Backend API: http://localhost:3000/


MongoDB Container:
docker run --name mongodb -d -p 27017:27017 mongo
3. Design Choices
Key Design Decisions
AST for Rule Representation:
The choice of Abstract Syntax Trees (AST) facilitates complex conditional logic representation, allowing efficient evaluation and modification of rules.

Database Selection:
MongoDB was chosen for its flexibility and ability to store document-based rules, providing a natural fit for the rule engine's needs.

Error Handling and Validation:
Implemented robust error checking and validation logic for rules and attributes, ensuring that only valid inputs are processed.

UI Framework:
Tailwind CSS combined with React (using Vite) was selected for efficient, responsive design and rapid development.

4. Dependencies
Clearly List All Dependencies Required for Both Frontend and Backend Setups
Backend Dependencies:
json
Copy code
{
  "dependencies": {
    "body-parser": "^1.20.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.1",
    "mongoose": "^8.7.2",
    "morgan": "^1.10.0"
  }
}
Frontend Dependencies:
json
Copy code
{
  "dependencies": {
    "axios": "^1.7.7",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.27.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.3",
    "tailwindcss": "^3.4.14",
    "vite": "^5.4.9"
  }
}







