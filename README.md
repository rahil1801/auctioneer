# Online Auction Platform

Welcome to the Online Auction Platform! This platform is currently under active development and includes core features such as **user login, signup, and a home landing page**. The project is built using the **MERN stack** (MongoDB, Express.js, React.js, and Node.js).

Below are the instructions to set up and run the project locally.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- npm (Node Package Manager)
- MongoDB (or a MongoDB Atlas connection string)

---

## Project Setup

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone <repository-url>
cd client
npm install //to install npm dependencies
npm run dev
```

Now Open New Terminal and follow:

```bash
cd server
npm install
npm run start
```

This will start the frontend and backend together.

## Set Up Environment Variables

The project uses environment variables for configuration. Follow these steps:

- Navigate to the source folder and locate the .env.example file.

- Create a new file named .env in the backend directory.

- Copy the contents of .env.example into .env and update the values with your own configuration.

Example .env file:

env

```bash
PORT=5000
MONGO_URI=your_mongoDB_url
JWT_SECRET=your_jwt_secret_key
```

## Project Structure

- Frontend: Contains the React.js application for the user interface.

- Backend: Contains the Express.js server and API routes.

- .env.example: Example environment variables file. Rename to .env and update with your credentials.

## Features Implemented So Far
- User Login

- User Signup

- Home Landing Page

- Dashboard (Not completed yet just APIs are made to appear)

## Week 2 Submission Work

- Created routes for creating Auction and Deleting Auction

- Modified the Sign Up and Log In page to include the user Profile Picture while Signup

- Added a category to filter auctions according to Category

- Categories can only be created by the Admin and cannot be modified by regular users.

- Category section page is not fully working there might be some error in code.

Note - The project uses Multer to upload picture to the local Server files. So the project will work under localhost only.

To work with live server or production, use Cloudinary to upload images on Cloud Based Management System.