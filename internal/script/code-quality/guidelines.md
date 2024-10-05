
# Crude Cards Frontend Refactoring and Improvement Guidelines

This document outlines the key guidelines for refactoring and improving the Crude Cards frontend codebase based on the project's goals and requirements.

## 1. Codebase Architecture
- **Frontend Framework**: React with SSR (Server-Side Rendering).
- **Backend**: NestJS with WebSocket connections (no REST API).
- **Deployment**: Deployed via Docker to GCP Cloud Run.
- **Focus**: Simplify and improve the existing codebase while adding thorough, context-rich comments.

## 2. Performance Optimization
- **Goal**: The game is fast-paced and requires real-time responsiveness, so performance optimization is critical.
- **Key Considerations**:
  - Prioritize efficient WebSocket handling.
  - Reduce re-renders where possible.
  - Focus on network resilience, ensuring seamless reconnection during interruptions.

## 3. SSR (Server-Side Rendering) Improvements
- **Lazy Loading**: Use dynamic imports for non-essential components to reduce SSR workload.
- **Caching**: Implement caching mechanisms for frequently accessed SSR content.
- **Hydration Mismatch**: Avoid rendering inconsistencies between client and server to prevent hydration issues.
- **Timeouts and Fallbacks**: Use timeouts for slow SSR processes and provide fallbacks for a better user experience during connection delays.

## 4. Accessibility (a11y) 
- **Keyboard Navigation**: Ensure all components, especially interactive elements, are fully accessible via keyboard.
- **Focus Management**: Implement proper focus management to support screen reader users and keyboard navigation.
- **Screen Reader Support**: Use ARIA roles and live regions for dynamic content. Ensure all buttons, images, and inputs have appropriate labels.
- **Color Contrast**: Ensure sufficient color contrast according to WCAG standards, with optional high-contrast and dark mode support.
- **Accessible Animations**: Provide options to disable animations for users with motion sensitivity and ensure accessibility for game visuals.

## 5. State Management and Logic
- **Redux**: Centralized state management is in place via Redux, with logic handled in Redux Saga for complex interactions.
- **Logic Separation**: Component logic is kept out of UI components and stored in separate `Logic` files in the same directory as the components.

## 6. WebSocket Handling and Network Resilience
- **Session Persistence**: Store session states in local storage or cookies to allow users to rejoin sessions seamlessly after disconnections.
- **Reconnection Strategy**: Use exponential backoff for reconnections to avoid overwhelming the server.
- **Throttling and Optimized Socket Events**: Ensure minimal re-renders on WebSocket events and use throttling mechanisms to avoid excessive server load.

## 7. Error Handling and Error Boundaries
- **Global ErrorBoundary**: Add a global error boundary at the app level to catch unexpected errors in both SSR and CSR.
- **Component-Specific ErrorBoundaries**: Introduce ErrorBoundaries around WebSocket-heavy components and game state UI components.
- **Redux Saga Error Handling**: Use try/catch blocks in sagas and dispatch failure actions for a better user experience during failures.
- **Socket Error Handling**: Handle WebSocket disconnection errors gracefully and inform the user without disturbing the rest of the UI.

## 8. Logging via WebSocket
- **Structured Logging**: Ensure logs are sent via WebSocket in a structured JSON format with metadata like timestamp, user ID, and component state.
- **Error Reporting**: Capture and send client-side stack traces along with session states for server-side debugging.
- **Throttle Log Messages**: Implement a batching or throttling mechanism for logs to avoid overwhelming the backend during heavy load or network issues.

## 9. Internationalization (i18n) and Localization Prep
- **Centralize Text**: Centralize all user-facing text for easy translation. Avoid hardcoding strings in components.
- **Formatting Support**: Use `Intl.NumberFormat` and `Intl.DateTimeFormat` for proper number, date, and time formatting.
- **Flexible Layouts**: Ensure UI layouts can accommodate text expansion for languages like German. Prepare for RTL language support (e.g., Arabic).
- **Translatable Error Messages**: Log messages should be designed with future translation support in mind, using identifiers for easy localization.

## 10. Semantic Versioning and Release Process
- **Commit Format**: Follow conventional commit standards (`feat`, `fix`, `perf`, etc.) to support semantic versioning and automatic version bumps.
- **Changelog Generation**: Ensure changes are well-documented and reflected in the release notes, especially as internationalization and accessibility features are introduced.

## 11. Additional Considerations
- **Component-Level Error Boundaries**: Place error boundaries around key components (game board, WebSocket components, etc.) to prevent crashes from propagating throughout the UI.
- **Context-Rich Comments**: Add thorough comments explaining refactoring decisions, focusing on accessibility improvements and i18n preparation.
- **Code-Splitting and Lazy Loading**: Use React.lazy and Suspense to improve initial load times by deferring the loading of non-essential components.

---

**Final Objective**: The goal is to create a fast, accessible, and reliable WebSocket-based game that performs well under all network conditions while being ready for future internationalization support and maintaining accessibility standards.
