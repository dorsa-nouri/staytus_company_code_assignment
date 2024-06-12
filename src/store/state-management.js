class stateManager {
  constructor(initialState) {
    this.state = initialState;
  }

  setState(newState) {
    this.state = newState;
    console.log("our New state : ", this.state);
  }

  dispatch(action) {
    switch (action.type) {
      case "FILL_STATE":
        this.setState(action.payload);
        break;
      default:
        console.error(`Unknown action type: ${action.type}`);
    }
  }
}

export default stateManager;
