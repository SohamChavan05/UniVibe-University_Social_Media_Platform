# UniVibe - University Social Media Platform

UniVibe is a university-specific social media platform designed to connect students, faculty, and alumni within a campus environment. It facilitates networking, collaboration, event management, and resource sharing, providing a secure and personalized social platform exclusive to university members.

## Features

- **User Profiles**: Personalized profiles for students, faculty, and alumni.
- **Networking**: Connect with peers, professors, and alumni within your university.
- **Collaboration**: Tools for group projects, discussions, and resource sharing.
- **Event Management**: Create, manage, and participate in campus events.
- **Secure Environment**: Access limited to verified university members.

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/SohamChavan05/UniVibe-University_Social_Media_Platform
   cd UniVibe-University_Social_Media_Platform
   ```

2. **Install dependencies**:

   ```bash
   # For backend
   cd backend
   npm install

   # For frontend
   cd frontend
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the `server` directory and add the following:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

4. **Run the application**:

   ```bash
   # Start backend
   cd backend
   node app.js

   # Start frontend
   cd frontend
   npm run dev
   ```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.
