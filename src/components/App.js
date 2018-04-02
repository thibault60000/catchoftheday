import React from 'react';
import Header from '../components/Header';
import Order from '../components/Order';
import Inventory from '../components/Inventory';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    addFish = (fish) => {
        const fishes = {...this.state.fishes}; // copy existing state
        fishes[`fish${Date.now()}`] = fish; //  add new fish
        this.setState({ // set new fishes object to state
            fishes  // fishes =  fishes: fishes
        });
    }
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                </div>
                <Inventory addFish={this.addFish} />
                <Order />
            </div>
        )
    }
}

export default App;
