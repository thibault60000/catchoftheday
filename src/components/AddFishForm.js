import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types';

class AddFishForm extends Component {

    nameRef = createRef();
    priceRef = createRef();
    statutRef = createRef();
    descRef = createRef();
    imageRef = createRef();

    static propTypes = {
        addFish: PropTypes.func 
    }
    createFish = (event) => {
        event.preventDefault();
        const fish = { 
            name: this.nameRef.value.value,
            price: parseFloat(this.priceRef.value.value),
            statut: this.statutRef.value.value,
            desc: this.descRef.value.value,
            image: this.imageRef.value.value,
        }
        this.props.addFish(fish);
        // refresh form
        event.currentTarget.reset();
    }

    
    render () {
        return (
            <form className="fish-edit" onSubmit={this.createFish}>
                <input name="name" ref={this.nameRef} type="text" placeholder="Nom" />
                <input name="price" ref={this.priceRef} type="text" placeholder="Prix" />
                <select name="Statut" ref={this.statutRef}>
                    <option value="disponible">Dispo! </option>
                    <option value="indisponible">Pas dispo!</option>
                </select>
                <textarea name="desc" ref={this.descRef} type="text" placeholder="Description" />
                <input name="image" ref={this.imageRef} type="text" placeholder="Image" />
                <button type="submit"> + Ajouter Poisson</button>
            </form>
        )
    }
}

export default AddFishForm