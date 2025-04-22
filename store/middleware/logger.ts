import { createLogger } from "redux-logger";

// Create a custom logger instance with optional configuration
const logger = createLogger({
  collapsed: true, // Makes logs more compact (collapsed in the console)
  diff: true, // Shows the difference between the previous and next state
  timestamp: true, // Adds timestamp to each log
  predicate: (getState, action) => action.type !== "EXCLUDED_ACTION", // Optionally exclude specific actions from being logged
});

export default logger;
