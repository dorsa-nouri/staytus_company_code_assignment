class StateManager {
  constructor(initialState) {
    this.state = initialState;
    this.listeners = new Set();
  }

  setState(newState) {
    this.state = newState;
    this.listeners.forEach((listener) => listener());
  }

  addListener(listener) {
    if (!this.listeners.has(listener)) {
      this.listeners.add(listener);
      console.log("listener :", listener);
    }
  }

  dispatch(action) {
    switch (action.type) {
      case "UPDATE_STATE":
        this.setState(action.payload);
        break;
      default:
        console.error(`Unknown action type: ${action.type}`);
    }
  }
}

export default StateManager;
