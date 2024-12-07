
# **Railway Management System**

A real-time web application for managing railway bookings, designed to handle concurrent user requests, race conditions, and role-based access. The system provides APIs for user registration, train management, seat availability checks, and ticket bookings.

---

## **Features**
1. **User Authentication**: Secure registration and login with JWT-based token authentication.
2. **Role-Based Access**:
   - **Admin**: Manage trains (add, update).
   - **User**: Check seat availability, book tickets, and view booking details.
3. **Concurrency Handling**: Ensures consistent seat booking under high traffic and resolves race conditions.
4. **API Key Protection**: Admin endpoints secured with an API key to prevent unauthorized access.

---

## **Tech Stack**
- **Backend**: Node.js with Express.js
- **Database**: MySQL
- **Authentication**: JWT for user sessions

---

## **Prerequisites**
- Node.js installed (`v14.x` or higher)
- MySQL or PostgreSQL installed and running
- A tool for API testing (Postman, cURL, or equivalent)

---

## **Setup and Installation**
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Abhivic000/RMSabhi.git
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Setup Environment Variables**:
   Create a `.env` file in the root directory with the following content:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=railway_management
   JWT_SECRET=your_jwt_secret
   ADMIN_API_KEY=your_admin_api_key
   ```

4. **Start the Server**:
   ```bash
   npm start
   ```

5. **Access the Application**:
   The server runs at `http://localhost:3000`.

---



## **Database Schema**
### **Users Table**
| Column   | Type          | Description          |
|----------|---------------|----------------------|
| id       | INT (PK)      | Unique User ID       |
| username | VARCHAR(255)  | User's name          |
| password | VARCHAR(255)  | Hashed password      |
| role     | ENUM('user', 'admin') | User role     |

### **Trains Table**
| Column       | Type          | Description               |
|--------------|---------------|---------------------------|
| id           | INT (PK)      | Unique Train ID           |
| name         | VARCHAR(255)  | Train name                |
| source       | VARCHAR(255)  | Source station            |
| destination  | VARCHAR(255)  | Destination station       |
| totalSeats   | INT           | Total seats in the train  |
| availableSeats | INT         | Remaining available seats |

### **Bookings Table**
| Column      | Type          | Description             |
|-------------|---------------|-------------------------|
| id          | INT (PK)      | Unique Booking ID       |
| userId      | INT (FK)      | ID of the user          |
| trainId     | INT (FK)      | ID of the train         |
| bookingTime | TIMESTAMP     | Timestamp of booking    |

---

## **Concurrency Handling**
- **Race Condition Prevention**: Seat availability is locked for update during booking using SQL's `FOR UPDATE` query, ensuring only one transaction updates the availability at a time.
- **Rollback**: If any issue arises during a booking transaction, it is rolled back to maintain consistency.


