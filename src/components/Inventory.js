import React, { Component } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import base, { firebaseApp } from "../base";
import Login from "./Login";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";

class Inventory extends Component {
  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    addFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func
  };

  state = {
    uid: "test",
    owner: null
  };
  

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.authHandler({ user });
      }    
    });
  }

  authHandler = async authData => {
  
    // 1. Look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, { context: this });
    // 2. Claim it if there is no owner

    if (!store.owner) {
      // save it as our own
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }
    // 3. Set the state of the inventory component ro reflect the current user

    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
  
  };
  authenticate = provider => {

    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({
      uid: null
    });
  }
   

  render() {
    
    const logout = <button onClick={this.logout}> Se déconnecter </button>;

    // 1. check if they are logged in
    if (!this.state.uid ){
      return <Login authenticate={this.authenticate} />;
    } 

    // 2. Check if they are not the owner of the store
    if (this.state.uid !== this.state.owner){
      return (
        <div>
          <p>Désolé vous n'êtes pas le propriétaire</p>
          {logout}
        </div>
      );
    }

    // 3. They must be the owner , just render the inventory
    return (
      <div className="inventory">
        <h2>Inventaire</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Ajouter tout les poissons
        </button>
      </div>
    );
  }
}

export default Inventory;
