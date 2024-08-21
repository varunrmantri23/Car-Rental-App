# Car Rental Service Application

**Developed by Varun Mantri**

This project is a comprehensive car rental service application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application allows customers to search, book, and manage car rentals, with features like real-time inventory updates, map tracking of car locations, and a robust admin panel.

## Project Structure

The project is organized into two main folders:

-   **client/**: Contains the frontend code built with React.js.
-   **backend/**: Contains the backend code powered by Node.js, Express.js, and MongoDB.

## Video Link - https://drive.google.com/file/d/1X65VCj2vWti2gTz9BQT3V9yg6V8b_-CK/view?usp=sharing

## Prerequisites

Before running the project, ensure you have the following installed:

-   Node.js
-   npm or yarn
-   MongoDB

## Getting Started

Follow these steps to run the project on your local machine:

### 1\. Clone the Repository

### 2\. Install Dependencies

Navigate to both the client and backend folders and install the necessary dependencies.

`# In the client folder cd client npm install`

`# In the backend folder cd ../backend npm install`

### 3\. Configure Environment Variables

Create a .env file in the backend folder and add the following environment variables:

`PORT=5000  MONGO_URI=your_mongo_db_uri  SOCKET_IO_PORT=your_socket_io_port`

### 4\. Run the Backend Server

`cd backend  npm run dev`

### 5\. Run the Client

    `cd ../client  npm start`

The application should now be running on http://localhost:3000 for the frontend and http://localhost:5000 for the backend.

## Further Development

Here are some pointers for further development and enhancements:

-   **Security**: Implement further security measures, including better JWT handling and secure headers.
-   **Testing**: Add unit and integration tests to ensure the robustness of your application.
-   **Performance Optimization**: Analyze and optimize the performance, especially for real-time features.
-   **User Experience**: Improve the UI/UX design, ensuring the application is user-friendly and visually appealing.

## Contributing

Feel free to fork the repository, create a new branch, and submit a pull request. Any contributions to improve the project are welcome.
