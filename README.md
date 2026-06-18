# 🤖 Chatbot — Spring Boot AI Chatbot Application

A full-stack AI Chatbot web application built with **Spring Boot 3**, featuring a secure, interactive chat interface powered by a Java backend and a clean HTML/CSS/JavaScript frontend.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Build & Package](#build--package)
- [Contributing](#contributing)

---

## Overview

This project is a conversational AI chatbot application developed using Spring Boot. It provides a browser-based chat interface where users can interact with the chatbot in real time. The application includes user authentication via Spring Security and persists data using an embedded H2 database, making it easy to run locally without any external database setup.

---

## ✨ Features

- Interactive web-based chat UI (HTML + CSS + JavaScript)
- User authentication and session management via Spring Security
- Server-side rendering using Thymeleaf templates
- Data persistence with Spring Data JPA and H2 in-memory database
- Input validation with Spring Validation
- Clean MVC architecture
- Hot reload support with Spring DevTools during development

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Backend | Java 17, Spring Boot 3.2.5 |
| Web | Spring MVC, Thymeleaf |
| Security | Spring Security 6, Thymeleaf Security Extras |
| Database | Spring Data JPA, H2 (in-memory) |
| Frontend | HTML, CSS, JavaScript |
| Build Tool | Maven |
| Utilities | Lombok, Jackson, Spring Validation |
| Dev Tools | Spring Boot DevTools |

---

## 📁 Project Structure

```
chatbot-springboot/
├── src/
│   └── main/
│       ├── java/com/example/chatbot/
│       │   ├── ChatbotApplication.java       # Main entry point
│       │   ├── controller/                   # MVC Controllers
│       │   ├── service/                      # Business logic
│       │   ├── model/                        # JPA Entities
│       │   ├── repository/                   # Data repositories
│       │   └── config/                       # Security & app config
│       └── resources/
│           ├── templates/                    # Thymeleaf HTML templates
│           ├── static/                       # CSS, JS, assets
│           └── application.properties        # App configuration
├── pom.xml
└── .gitignore
```

---

## ✅ Prerequisites

- **Java 17** or higher
- **Maven 3.6+**
- A terminal / IDE (IntelliJ IDEA, Eclipse, VS Code)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Nandita-1293/chatbot-springboot.git
cd chatbot-springboot
```

### 2. Install Dependencies

```bash
mvn clean install
```

---

## ⚙️ Configuration

All application settings are in `src/main/resources/application.properties`.

Default configuration (H2 in-memory database — no setup required):

```properties
# Server
server.port=8080

# H2 Database
spring.datasource.url=jdbc:h2:mem:chatbotdb
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# JPA
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true

# H2 Console (accessible at /h2-console during development)
spring.h2.console.enabled=true
```

> The H2 database is in-memory and resets on every restart. No external database installation is needed.

---

## ▶️ Running the Application

### Using Maven

```bash
mvn spring-boot:run
```

### Using the JAR

```bash
mvn clean package
java -jar target/chatbot-1.0.0.jar
```

Once started, open your browser and navigate to:

```
http://localhost:8080
```

---

## 💬 Usage

1. Open the app in your browser at `http://localhost:8080`.
2. Register or log in using the authentication page.
3. Start chatting in the chat interface — type your message and hit Send.
4. The chatbot will respond based on its configured logic.
5. To inspect the database during development, visit `http://localhost:8080/h2-console`.

---

## 📦 Build & Package

To build a production-ready JAR:

```bash
mvn clean package -DskipTests
```

The output will be at:

```
target/chatbot-1.0.0.jar
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to your branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👩‍💻 Author

**Nandita** — [GitHub Profile](https://github.com/Nandita-1293)

---

## 📄 License

This project is open source. Feel free to use and modify it for learning and development purposes.
