# NGO Impact Tracker

A full-stack web application that helps NGOs submit monthly impact reports and provides an admin dashboard for data visualization.

## Tech Stack

- **Frontend**: Next.js (App Router), Tailwind CSS, Lucide-React icons
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (NeonDB) with Prisma ORM
- **Form Handling**: React Hook Form
- **Styling**: Tailwind CSS for modern, responsive UI


## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database url

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Rio-awsm/ngo-trcaker.git
   cd ngo-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with:
   ```
   DATABASE_URL="postgresql://username:password/dbname"
   ```

4. Initialize the database:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Initialize prisma client:
   ```bash
   npx prisma generate
   ```

6. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.


## Deployment

This application is deployed on Vercel. You can access it at [https://ngo-trcaker.vercel.app/](https://ngo-trcaker.vercel.app/)
