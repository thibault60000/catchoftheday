import React, { Component } from "react";
import PropTypes from 'prop-types';

class EditFishForm extends Component {

  static propTypes = {
    updateFish: PropTypes.func,
    index: PropTypes.string,
    fish: PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.string,
        desc: PropTypes.string,
        status: PropTypes.number
    })
  }

  handleChange = event => {
    // Take a copy of the current fish
    const updatedFish = {
        ...this.props.fish,
        [event.currentTarget.name]: event.currentTarget.value
    };
    this.props.updateFish(this.props.index, updatedFish);
  };
  render() {
    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.props.fish.name}
        />
        <input
          type="text"
          name="price"
          onChange={this.handleChange}
          value={this.props.fish.price}
        />
        <select
          name="status"
          onChange={this.handleChange}
          value={this.props.fish.status}
        >
          <option value="disponible">Dispo! </option>
          <option value="indisponible">Pas dispo!</option>
        </select>
        <textarea
          name="desc"
          onChange={this.handleChange}
          value={this.props.fish.desc}
        />
        <input
          type="text"
          name="image"
          onChange={this.handleChange}
          value={this.props.fish.image}
        />
        <button onClick={() => this.props.deleteFish(this.props.index)}> Retirer un poisson </button>
      </div>
    );
  }
}

export default EditFishForm;
