# LegalEase
## ⚖️ Simplifying Legal Access for All Indians
LegalEase is an AI-powered platform designed to demystify the Indian justice system, making legal knowledge accessible and understandable for everyone. By leveraging advanced AI tools, it provides plain language explanations, personalized guidance, and real-time legal assistance, empowering citizens to understand and exercise their rights.
## ✨ Core Features
LegalEase offers a suite of powerful tools to simplify your legal journey:
### 1. AI Legal Chatbot : 
Get instant, AI-powered answers to your legal questions. The chatbot can be configured with different LLM models (e.g., LLaMA 3 8B Fast, LLaMA 3 70B Powerful) to suit varying needs for speed and depth.
<img width="1000" height="500" alt="Screenshot 2025-07-23 005313" src="https://github.com/user-attachments/assets/9e7952d4-a2d9-44b2-838f-b387e34cb81f" />
### 2. Case Tracker :
Track and manage your legal cases in real-time. Stay updated on statuses, next hearing dates, and key developments. Features include search, filter by status, and sorting options.
<img width="1000" height="500" alt="Screenshot 2025-07-23 005334" src="https://github.com/user-attachments/assets/2765e469-05bb-4af0-90d0-f10c108f7f81" />
### 3. Legal Rights Visualizer :
Explore and understand your legal rights in simple, easy-to-understand language through interactive visualizations. Browse categories like Arrest Rights, Property Rights, Consumer Rights, Employment Rights, and Family Law Rights.
<img width="1000" height="500" alt="Screenshot 2025-07-23 005350" src="https://github.com/user-attachments/assets/bcf66795-0467-401f-ade1-52fef0361e87" />
### 4. Document Simplifier :
Upload complex legal documents (PDF, Word, Text up to 10MB) and receive simplified, plain-language explanations of their content.
<img width="1000" height="500" alt="Screenshot 2025-07-23 005406" src="https://github.com/user-attachments/assets/d4b18a2e-e635-48fc-9cb8-a9deae2affce" />
### 5. Find Legal Help :
Connect with legal aid providers, lawyers, and clinics across India. Search by name, specialization, or location, and filter by state and type of service.
<img width="1000" height="500" alt="Screenshot 2025-07-23 005420" src="https://github.com/user-attachments/assets/76e2937c-6103-43d5-a23d-0ccd3903c125" />

## 🛠️ Technologies Used
LegalEase is built using a modern MERN (MongoDB, Express, React, Node.js) stack with Next.js for the frontend, leveraging various powerful libraries and services :
### Frontend : 
- Next.js: React framework for building server-side rendered and statically generated web applications.
- React: Frontend JavaScript library for building user interfaces.
- TypeScript: Superset of JavaScript for type safety.
- Tailwind CSS: Utility-first CSS framework for rapid UI development.
- Shadcn/ui: Reusable UI components built with Radix UI and Tailwind CSS.
- OpenAI API: For AI-powered chatbot and document simplification functionalities.
- Supabase: Used for specific functionalities, potentially for user management or other data storage.
- react-day-picker: Date picker component.
- framer-motion: For animations.
- recharts: For charting (if used in visualizations).
- pdf-parse & pdfjs-dist: For PDF document processing.

### Backend :
- Node.js: JavaScript runtime environment.
- Express.js: Web application framework for Node.js.
- MongoDB: NoSQL database for data storage.
- Mongoose: MongoDB object data modeling (ODM) library for Node.js.
- bcryptjs: For password hashing.
- express-session: For session management.
- cors: Middleware for enabling Cross-Origin Resource Sharing.
- ts-node-dev: For development server with TypeScript hot-reloading.
- typescript: For backend type safety.

## 🚀 Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.
### Prerequisites
Ensure you have the following installed on your system :
- Node.js (v18 or higher recommended)
- npm (comes with Node.js): Or yarn if preferred.
- Git
- MongoDB Instance
- OpenAI API Key: Obtain one from OpenAI Platform.
- Supabase Project URL & Anon Key: Obtain these from your Supabase Dashboard.

## Installation & Setup
1. Clone the Repository :
```
git clone https://github.com/yashvikram30/legalease.git
cd legalease
```
2. Backend Setup :
```
cd backend
npm install
```
- Create a .env file in the backend directory and add the following environment variables :
```
MONGO_URI=your_mongodb_connection_string_here
PORT=5000
SESSION_SECRET=a_very_long_and_random_string_for_session_secret
```
- Replace your_mongodb_connection_string_here with your MongoDB connection string.
- Replace a_very_long_and_random_string_for_session_secret with a strong, randomly generated string.

- Build the backend TypeScript code :
```
npm run build
```
3. Frontend Setup :
- Navigate back to the project root directory.
- Install frontend dependencies :
```
npm install
```
- Create a .env.local file in the project root directory and add the following environment variables :
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_public_key_here
```
- Replace your_openai_api_key_here with your actual OpenAI API Key.
- Replace your_supabase_project_url_here and your_supabase_anon_public_key_here with your actual Supabase credentials.

### Running the Application
1. Start the Backend Server from the backend directory :
```
npm start
```
2. Build and start the Frontend Development Server from the root project directory :
```
npm run build
npm start
```
## 🤝 Contributing
Contributions are welcome! If you'd like to contribute, please Check out our [Contributing Guidelines](contributing.md).





