import React from "react";
import PropTypes from 'prop-types';
import Header from "../components/Header";
import Order from "../components/Order";
import Inventory from "../components/Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {

  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  }

  componentDidMount() {
    const { params } = this.props.match;
    // first reinstate our localstore
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) }); //JSON.parse
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    // this.state.order = [object Object] but JSON.stringify(this.state.order) = { fish: "1"}
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  // AddFish
  addFish = fish => {
    const fishes = { ...this.state.fishes }; // copy existing state
    fishes[`fish${Date.now()}`] = fish; //  add new fish
    this.setState({
      // set new fishes object to state
      fishes // fishes =  fishes: fishes
    });
  };

  updateFish = (key, updatedFish) => {
      const fishes = {...this.state.fishes};
      fishes[key] = updatedFish;
      this.setState({
          fishes
      });
  }

  deleteFish = key => {
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState({ fishes });
  }
  // Load Sample
  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  // Add To Order
  addToOrder = key => {
    const order = { ...this.state.order };
    // Add to the order, or update the number in our order
    order[key] = order[key] + order[key] || 1;
    this.setState({ order });
  };

  removeFromOrder = key => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({ order });
  }

  // Render
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
          deleteFish={this.deleteFish}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
          storeId={this.props.match.params.storeId}
        />
        <Order {...this.state} removeFromOrder={this.removeFromOrder} />
      </div>
    );
  }
}

export default App;
