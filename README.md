Dynamic Form Builder (React + TypeScript)
This project is a simple dynamic form builder created with React, TypeScript, and Vite. It demonstrates how to:

• Add text and checkbox fields dynamically.
• Validate user input using react-hook-form and Yup.
• Render a final form that displays the added elements.

Features
• Create Text Field with required/non-required settings.
• Create Checkbox Field with multiple choices, each validated.
• Yup Validation in both text and checkbox creation.

Getting Started

1. Installation

# Clone the repo

git clone https://github.com/najdi123/dynamic-form.git
cd https://github.com/najdi123/dynamic-form

# Install dependencies

npm install

2. Development Server

npm run dev

Open http://localhost:5173 (or the printed port) in your browser to view the app.

3. Build for Production
   npm run build
   This will compile the application into a dist folder.

4. Preview Production Build
   npm run preview
   Serves the optimized production build locally.

5. Lint/Testing
   Lint: npm run lint
   (Adjust ESLint settings as needed.)
   Tests: This project has basic test dependencies set up; add your own tests and run via npm test (if configured), or npm run test based on your setup.
   Project Structure
   App.tsx: Renders the main container and includes FormBuilder.
   FormBuilder.tsx: Main logic for creating and storing dynamic elements.
   CreateTextField / CreateCheckboxElement: Components to build new fields with validation.
   CreatedForm.tsx: Renders the final form from the created elements.
