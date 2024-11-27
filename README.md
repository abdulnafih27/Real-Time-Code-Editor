

# CodeCast: Real-Time Collaborative Code Editor

CodeCast is a real-time collaborative code editor built with React, Socket.IO, and Express.js. It allows multiple users to join a room, write code collaboratively, and see changes in real time.

---

## Features

- **Room-Based Collaboration**: Generate unique room IDs and share them with others to collaborate in real-time.
- **Live Code Editing**: See live changes as you and your teammates edit the code.
- **User Management**: View the list of users currently connected to the room
- **Room Persistence**: Users can rejoin rooms as long as the server is active.
- **Customizable UI**: User-friendly interface with responsive design.

---

## Tech Stack

- **Frontend**: React.js, CSS
- **Backend**: Node.js, Express.js
- **WebSockets**: Socket.IO for real-time communication
- **Utilities**:
  - `uuid`: For generating unique room IDs
  - `react-hot-toast`: For notifications

---

## Installation

### Prerequisites
- Node.js installed on your system.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/abdulnafih27/Real-Time-Code-Editor.git
   cd Real-Time-Code-Editor
   ```

2. Navigate to the `server` folder and install dependencies:
   ```bash
   cd server
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```


4. Open a new terminal and navigate to the `client` folder:
   ```bash
   cd ../client
   npm install
   ```

5. Start the frontend development server:
   ```bash
   npm run dev
   ```

6. Access the app in your browser:
   ```
   http://localhost:5000
   ```

---

## Usage

1. **Home Page**:
   - Enter a Room ID and your name to join an existing room.
   - Don’t have a Room ID? Click `New Room` to generate one.

2. **Collaborative Editor**:
   - Share the Room ID with others.
   - Collaborate on code in real-time.
   - Use the sidebar to see who’s online.

3. **Leave Room**:
   - Click `Leave Room` to exit the session.

---



