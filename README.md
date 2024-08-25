# 🎉 Crude Cards
## A Party Game For Horrible People! 🎉

Welcome to **Crude Cards**, a real-time, WebSocket-enabled card game designed for both learning and fun! If you've ever played **Cards Against Humanity** or **Apples to Apples**, you already know how to play. This project is built with modern web technologies like **React**, **Next.js**, and **NestJS** to demonstrate technical concepts in a fun and engaging way.

## 🎯 **Game Overview**

Crude Cards is a hilarious party game where you and your friends compete to create the funniest combinations possible. It's perfect for parties, casual hangouts, or even virtual game nights! The game is real-time, allowing multiple players to join, play, and interact with one another via a WebSocket-powered backend.

## 🤓 **Educational Purpose**

This game is more than just a source of entertainment. It's also a learning resource designed to showcase the development of a full-stack application with real-time capabilities. Throughout this repository, you'll find links to detailed tutorials on the various stages of building this project, from defining the architecture to deploying it in the cloud.

## 📖 **Game Rules (Just Like Cards Against Humanity or Apples to Apples)**

1. **Setup**: 
    - Players connect to a game session via a room code.
    - One player is selected as the "Dealer" for each round.

2. **Gameplay**:
    - The Dealer plays a black card with a prompt or question (e.g., "Why can't I sleep at night?").
    - The other players choose the funniest white card from their hand to complete the sentence or answer the question.
    - The Dealer reviews the responses and selects the one they find funniest.

3. **Winning**:
    - The player whose card is chosen wins that round and earns a point.
    - The first player to reach a predefined number of points wins the game.

4. **Additional Fun**:
    - The game is customizable with different rule variations to keep things interesting.

## 🚀 **Tech Stack**

The tech stack is carefully chosen to showcase modern full-stack development practices. Here's a breakdown:

| **Layer**      | **Technology**                              | **Purpose**                                       |
|----------------|---------------------------------------------|---------------------------------------------------|
| **Frontend**   | [React](https://reactjs.org/)               | UI development and rendering                      |
|                | [Next.js](https://nextjs.org/)              | Server-side rendering, routing, and API endpoints |
|                | [Mantine](https://mantine.dev/)             | UI components and styling                         |
|                | [Redux Toolkit](https://redux-toolkit.js.org/) | State management                                  |
|                | [Socket.io Client](https://socket.io/docs/v4/client-api/) | Real-time communication                           |
| **Backend**    | [NestJS](https://nestjs.com/)               | Backend framework                                 |
|                | [TypeORM](https://typeorm.io/)              | Database ORM for managing entities and migrations |
|                | [Socket.io](https://socket.io/)             | WebSocket server for real-time events             |
| **Infrastructure** | [GCP](https://cloud.google.com/)          | Cloud hosting and deployment                      |
|                | [Docker](https://www.docker.com/)           | Containerization                                  |
|                | [Terraform](https://www.terraform.io/)      | Infrastructure as Code (IaC)                      |
| **Testing**    | [Jest](https://jestjs.io/)                  | Unit and integration testing                      |
|                | [Testing Library](https://testing-library.com/) | UI testing                                      |
|                | [Storybook](https://storybook.js.org/)      | Component testing and documentation               |

## 📚 **Learning Resources and Tutorials**

Follow along with the full development process through the tutorials below:

- [**Defining the Project: What and Why**](https://www.notion.so/WIP-Defining-the-Project-What-and-Why-04f8e77dae2c4b7894da56738b1825cc?pvs=21)
- [**Conducting In-Person Testing and Gathering Feedback**](https://www.notion.so/WIP-Conducting-In-Person-Testing-and-Gathering-Feedback-7af8aeab5bd84788acf6d332d51a113b?pvs=21)
- [**Creating Mockups and Prototypes**](https://www.notion.so/WIP-Creating-Mockups-and-Prototypes-73897025582a44ef8887e6938ad7ea83?pvs=21)
- [**Building the User Interface with React**](https://www.notion.so/WIP-Building-the-User-Interface-with-React-0e8db9a08f38463fa4ac62ee3ff85e71?pvs=21)
- [**Implementing CI/CD Pipelines**](https://www.notion.so/WIP-Implementing-CI-CD-Pipelines-aa78af3790d3411ea8a1a5856fa686d9?pvs=21)
- [**Deploying on GCP**](https://www.notion.so/Steps-to-deploy-the-app-on-GCP-including-tools-and-best-practices-for-deployment-1c8fc473f9cc4904af523de1517ed666?pvs=21)

## 📊 **Interactive Panels and Resources**

- [**Storybook for UI Components**](https://your-storybook-link.com) - Explore the reusable UI components used in the game.
- [**CI/CD Pipeline Overview**](https://your-ci-cd-pipeline-link.com) - Monitor the status and structure of the CI/CD pipeline.
- [**API Documentation**](https://your-api-docs-link.com) - Detailed documentation for the backend APIs.


## 📝 **Architecture Diagrams*
* [**Architecture Diagrams**](https://www.notion.so/Architecture-Diagrams-1b1b3b1b1b1b4)

```mermaid
flowchart TD
  %% Frontend Layer
  A[Frontend] -->|Uses WebSocket| B(GameGateway)
  A -->|Interacts via REST API| L[API Layer]
  A -->|UI Components| M[React Components]
  M --> N[Mantine for Styling]
  M --> O[Redux Toolkit for State Management]
  O --> P[Socket.io Client for Realtime Updates]

  %% Backend Layer
  B[GameGateway] -->|Validates Player| C(GameService)
  B -->|Broadcasts Events| Q[Socket.io Server]

  %% Game Logic Services
  C -->|Manages Player State| D(PlayerService)
  C -->|Handles Game Logic| E(GameSessionService)
  E -->|Manages Card Deck| F(CardService)
  E -->|Handles Rounds & Turns| G(RoundService)

  %% Card Operations
  F -->|Draws Cards| H[(Database)]
  F -->|Stores Cards| H

  %% Player Management
  D -->|Stores Player Data| H
  D -->|Manages Reconnections| I[ConnectionService]
  D -->|Saves Player State| H

  %% Session Management
  E -->|Handles Sessions| H
  E -->|Stores Game Metadata| H
  E -->|Syncs Game State| Q[Socket.io Server]
  
  %% Additional Services
  G -->|Stores Round Data| H
  G -->|Determines Winning Cards| J[GameLogicService]

  %% Feedback and Monitoring
  B -->|Handles Feedback| K(FeedbackService)
  K -->|Saves Feedback| H
  K -->|Sends Alerts| R[NotificationService]
  
  %% API Layer
  L -->|CRUD Operations| H
  L -->|Exposes Game State| M[Frontend]

  %% Logging and Monitoring
  C -->|Logs Events| S(Logger)
  S -->|Stores Logs| H
  S -->|Monitors Realtime Data| T[MonitoringDashboard]

  %% Infrastructure and Deployment
  T -->|Deployed to| U[GCP via Docker]
  U -->|Orchestrated by| V[Terraform for IaC]
  T -->|CI/CD Pipelines| W[GitHub Actions]

  %% Relationships
  Q --> P
  L -->|Exposes Endpoints| M
  L -->|Triggers| Q
  W --> T

```


## 🎮 **Gameplay Flow - Mermaid Diagram**
* [**Gameplay Flow**](https://www.notion.so/Gameplay-Flow-1b1b3b1b1b1b4)

```mermaid
sequenceDiagram
    participant Home
    participant Player
    participant Dealer

    Home->>Player: Choose new game or enter game code
    Player->>Home: Enter game code
    Home->>Dealer: Display game code
    Dealer->>Player: Enter game lobby

    loop Start Game
        Dealer->>Dealer: Host starts the game
        Dealer->>Dealer: Host picks a black card

        alt End round early
            Dealer->>Player: Show answers anonymously
        else Wait 30 seconds or all players finish
            Player->>Dealer: Submit card or timeout
        end

        Dealer->>Dealer: Dealer picks a winner
        Dealer->>Player: Show winner screen and leaderboard

        alt First card picked 7 times
            Dealer->>All: End of Game
        else Loop back
            Dealer->>Dealer: Start next round
        end
    end

```

## 🎉 **For Fun and Learning**

This game is perfect for those who want to learn modern web development while enjoying a fun, interactive project. Whether it's for parties, casual hangouts, or just testing your development skills, **Crude Cards** has you covered.

## 💻 **How to Run the Game Locally**

1. Clone the repository:
   ```bash
   git clone https://github.com/ConstructWorks/cards.git
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run the development server:
   ```bash
   pnpm dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the game.

## 📜 **License**

This project is licensed under a **Creative Commons Attribution-NonCommercial-NoDerivatives (CC BY-NC-ND) License with Custom Terms**. You can learn from it, share it, and use it for educational purposes, but you must obtain permission for commercial use or any significant modifications.


# 🎨 Image Grid

Below is a 3x6 grid of images linked from the `./internal/wiki` directory:

|   |   |   |
|---|---|---|
| ![001](https://github.com/ConstructWorks/cards/raw/main/internal/wiki/001.webp) | ![002](https://github.com/ConstructWorks/cards/raw/main/internal/wiki/002.webp) | ![003](https://github.com/ConstructWorks/cards/raw/main/internal/wiki/003.webp) |
| ![004](https://github.com/ConstructWorks/cards/raw/main/internal/wiki/004.webp) | ![005](https://github.com/ConstructWorks/cards/raw/main/internal/wiki/005.webp) | ![006](https://github.com/ConstructWorks/cards/raw/main/internal/wiki/006.webp) |
| ![007](https://github.com/ConstructWorks/cards/raw/main/internal/wiki/007.webp) | ![008](https://github.com/ConstructWorks/cards/raw/main/internal/wiki/008.webp) | ![009](https://github.com/ConstructWorks/cards/raw/main/internal/wiki/009.webp) |
| ![010](https://github.com/ConstructWorks/cards/raw/main/internal/wiki/010.webp) | ![011](https://github.com/ConstructWorks/cards/raw/main/internal/wiki/011.webp) | ![012](https://github.com/ConstructWorks/cards/raw/main/internal/wiki/012.webp) |
| ![013](https://github.com/ConstructWorks/cards/raw/main/internal/wiki/013.webp) | ![014](https://github.com/ConstructWorks/cards/raw/main/internal/wiki/014.webp) | ![015](https://github.com/ConstructWorks/cards/raw/main/internal/wiki/015.webp) |
| ![016](https://github.com/ConstructWorks/cards/raw/main/internal/wiki/016.webp) | | |
