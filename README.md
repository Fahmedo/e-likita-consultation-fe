🩺 e-Likita Consultation Frontend

This is the frontend of the e-Likita Consultation application.
It provides a multi-step consultation form where patients can submit their information, symptoms, and follow-up preferences.
The app is built with Next.js and integrates seamlessly with the backend API.

🚀 Features

Multi-step form flow:

Patient Info – collects personal and medical details.

Symptoms – captures patient symptoms with severity, frequency, and duration.

Follow-Up – collects preferred contact method, time, urgency, and notes.

Form validation powered by Zod.

State management for persisting form data across steps.

Responsive and accessible UI.

API integration with backend for form submission.

Error handling and validation feedback for smooth UX.

🛠️ Tech Stack

Framework: React / Next.js / Angular (update with the one you used)

Validation: Zod

Forms: React Hook Form / Angular Reactive Forms (depending on stack)

Styling: TailwindCSS / Material UI / PrimeNG (depending on what you used)

API Calls: Fetch / Axios

📂 Project Structure
src/
│── components/ # UI components (inputs, stepper, buttons)
│── forms/ # Zod schemas & form configs
│── pages/ or app/ # Page routes
│── context/ # Form state context (if used)
│── services/ # API calls to backend
│── utils/ # Helpers & constants

```
📑 Form Schemas (Validation)
Patient Information

  firstName:string,
  lastName: string,
  email:string,
  phoneNumber: string,
  dateOfBirth: string,
  gender: string,
  address: string,
  emergencyContactName: string,
  emergencyContactPhone: string,
  medicalHistory: string,
  currentMedications: string,


Symptoms

  description: string,
  name: string,
  severity: string,
  duration: string,
  frequency: string,


Follow-Up

  preferredContactMethod: string,
  preferredTime: string,
  urgency: string,
  additionalNotes: string,
```

⚙️ Installation & Setup

1. Clone Repository
   git clone https://github.com/fahmedo/e-likita-consultation-fe.git
   cd e-likita-consultation-fe

2. Install Dependencies
   npm install

3. Run Development Server
   npm run dev

App will be available at:

http://localhost:3000

📖 Form Flow

Step 1: Patient Info
Collects personal details, medical history, and emergency contact.

Step 2: Symptoms
Allows adding/removing symptoms with severity, frequency, and duration.

Step 3: Follow-Up
Collects communication preferences and urgency level.

Submit
Data is validated against the schema and sent to the backend API.

🧪 Testing

npm run test

🌍 Deployment

Deployable on:

Vercel (recommended for Next.js)

Netlify

Render

Static Hosting (if built with CRA or Angular)

📌 Submission Checklist

✅ Live demo link
✅ GitHub repository link
✅ Clean code & structured components
✅ Responsive UI
✅ Backend integration working

👨‍💻 Author

Your Name
🔗 [GitHub](https://github.com/fahmedo)
