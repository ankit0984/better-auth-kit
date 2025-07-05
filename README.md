# BetterAuth - Modern Authentication System

A modern, secure, and customizable authentication system built with Next.js, featuring email/password and social authentication.

## ✨ Features

- 🔐 Email/Password Authentication
- 🌐 Social Login (Google)
- ✉️ Email Verification
- 🔄 Password Reset
- 🛡️ Protected Routes
- 📱 Responsive Design
- 🎨 Modern UI with Radix UI Components
- 🚀 Built with Next.js 14 (App Router)
- 🔄 Server Actions for Data Mutations

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ankit0984/better-auth-kit
   cd betterauth
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:

   ```env
   DATABASE_URL=your_database_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000

   # Email configuration (for password reset and verification)
   EMAIL_SERVER=your_email_server
   EMAIL_FROM=your_email@example.com

   # OAuth providers (Google example)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. Run database migrations:

   ```bash
   npx drizzle-kit push:pg
   ```

5. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **UI Components**: Radix UI, shadcn/ui
- **Authentication**: Better Auth, NextAuth.js
- **Database**: PostgreSQL with Drizzle ORM
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with CSS Modules
- **Icons**: Lucide React

## 📂 Project Structure

```
src/
├── app/                 # App router pages and layouts
├── components/          # Reusable UI components
│   ├── ui/             # Radix UI components
│   ├── login-form.jsx   # Login form component
│   ├── register-form.jsx # Registration form
│   └── ...
├── lib/                # Utility functions and configurations
│   ├── auth-client.js  # Authentication client
│   └── auth.js         # Authentication utilities
├── server/             # Server actions and API routes
│   └── user.js         # User-related server actions
└── styles/             # Global styles
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Radix UI](https://www.radix-ui.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [NextAuth.js](https://next-auth.js.org/)
