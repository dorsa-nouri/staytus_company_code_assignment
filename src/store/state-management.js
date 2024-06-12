class stateManager {
  constructor(initialState) {
    this.state = initialState;
  }

  // set a new state
  setState(newState) {
    this.state = newState;
    console.log("our New state : ", this.state);
  }

  // replace updated data
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
