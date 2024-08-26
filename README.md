# 🎉 Crude Cards
## A Party Game For Horrible People! 🎉

### Web Development Series

Welcome to **Crude Cards**, a real-time, WebSocket-enabled card game designed for both learning and fun! If you've ever played **Cards Against Humanity** or **Apples to Apples**, you already know how to play. This project is built with modern web technologies like **React**, **Next.js**, and **NestJS** to demonstrate technical concepts in a fun and engaging way.

### 🎯 Game Overview
Crude Cards is a *good* party game for **bad** people. Perfect for casual hangouts or virtual game nights. Real-time play for multiple players via a WebSocket-powered backend. Adaptable for learning games or quizzes.

### 🤓 Educational Purpose
More than entertainment—this project is a learning resource for full-stack, real-time app development. Find tutorials on building, deploying, and scaling the app in the cloud.

### 🎨 CrudeCards - Game Dev Series

#### Introduction to the Series
This article provides an overview of the series, explaining what will be covered and the goals of creating a CAH clone.

#### Defining the Project: What and Why
Detailed description of the CAH clone, including its purpose and goals.

#### Defining the Audience and Stakeholders
Identify the target audience and list stakeholders with their roles.

#### Defining Stakeholder Personas
The process of creating example users and applying them to the project.

#### Conducting In-Person Testing and Gathering Feedback
Methods for in-person testing and how to gather and analyze feedback.

#### Creating Mockups and Prototypes
Tools and techniques for creating mockups and prototypes, emphasizing their importance.

#### Choosing the Tech Stack
Detailed explanation of the tech stack and reasons for choosing each technology.

#### High-Level Application Architecture
Overview of the application architecture, key components, and their interactions.

#### Version Control and Collaboration
Importance of version control and best practices for collaboration.

#### Implementing CI/CD Pipelines
Setting up continuous integration and deployment pipelines, including tools and best practices.

#### Managing Cloud Infrastructure with Terraform
Building the User Interface with React. Basics of React for building the UI, including component structure and state management.

#### Frontend State Management
Introduction to Redux for managing application state, with examples.

#### Architecting Cloud Infrastructure
Designing the cloud infrastructure using services like Kubernetes and Docker.

#### Setting Up the Node.js Backend
Basics of Node.js and Express, including how to structure the backend.

#### Connecting the Frontend and Backend
How to connect a React frontend with a Node.js backend, including setting up API routes and handling requests.

#### Quality Assurance and Testing
Overview of testing methodologies including unit, integration, and end-to-end testing, and the tools used for each.

#### Steps to Deploy the App on GCP
Including tools and best practices for deployment.

#### Maintaining the Application
Regular maintenance tasks and best practices for keeping the app up-to-date.

#### Performance Tuning
Techniques for improving performance, including profiling and optimization.

#### Cost Management and Optimization
Strategies for reducing costs, monitoring, and optimizing cloud expenses.

---

## 🚀 Tech Stack

The tech stack is carefully chosen to showcase modern full-stack development practices. Here's a breakdown:

| Layer           | Technology                              | Purpose                                               |
| --------------- | --------------------------------------- | ----------------------------------------------------- |
| **Frontend**    | ![React](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg) **React** | UI development and rendering                          |
|                 | ![Next.js](https://nextjs.org/static/favicon/favicon-16x16.png) **Next.js**  | Server-side rendering, routing, and API endpoints     |
|                 | ![Mantine](https://mantine.dev/logo.svg) **Mantine** | UI components and styling                             |
|                 | ![Redux](https://redux.js.org/img/redux.svg) **Redux Toolkit** | State management                                      |
|                 | ![Socket.io](https://socket.io/images/logo.svg) **Socket.io Client** | Real-time communication                               |
| **Backend**     | ![NestJS](https://d33wubrfki0l68.cloudfront.net/7f119d8c2e5d7e0516c9da5b7bbf08915311cb7a/83f17/img/logo.png) **NestJS** | Backend framework                                     |
|                 | ![TypeORM](https://typeorm.io/img/logo.svg) **TypeORM** | Database ORM for managing entities and migrations     |
|                 | ![Socket.io](https://socket.io/images/logo.svg) **Socket.io** | WebSocket server for real-time events                 |
| **Infrastructure** | ![GCP](https://www.gstatic.com/devrel-devsite/prod/vfc07da888bba76c1c4c003a198d6e61b87696b912bbbe11354581a64d0862c38/cloud/images/favicons/onecloud/favicon.ico) **GCP** | Cloud hosting and deployment                           |
|                 | ![Docker](https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png) **Docker** | Containerization                                      |
|                 | ![Terraform](https://www.terraform.io/assets/images/og-image-8b3e4f7d.png) **Terraform** | Infrastructure as Code (IaC)                          |
| **Testing**     | ![Jest](https://jestjs.io/img/jest.svg) **Jest** | Unit and integration testing                          |
|                 | ![Testing Library](https://testing-library.com/img/octopus-128x128.png) **Testing Library** | UI testing                                            |
|                 | ![Storybook](https://storybook.js.org/images/logos/icon-storybook.svg) **Storybook** | Component testing and documentation                   |

---

## 📖 Game Rules (Just Like Cards Against Humanity or Apples to Apples)

### Setup
1. Players connect to a game session via a room code.
2. One player is selected as the "Dealer" for each round.

### Gameplay
1. The Dealer plays a black card with a prompt or question (e.g., "Why can't I sleep at night?").
2. The other players choose the funniest white card from their hand to complete the sentence or answer the question.
3. The Dealer reviews the responses and selects the one they find funniest.

### Winning
- The player whose card is chosen wins that round and earns a point.
- The first player to reach a predefined number of points wins the game.

### Additional "Fun"
- The game is customizable with different rule variations to keep things interesting.

---

## 💻 How to Run the Game Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/dandonahoe/crude-cards.git
