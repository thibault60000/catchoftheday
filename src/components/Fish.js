import React, { Component } from 'react';
import { formatPrice } from '../helpers';

class Fish extends Component {

    render () {
        /* 
            const image = this.props.details.image;
            const name = this.props.details.name;
        */ 
        const {image, name, price, desc, status } = this.props.details;
        const isAvailable = status;

        return (
            <li className="menu-fish">
                <img src={image} alt={name} />
                <h3 className="fish-name">{name} 
                    <span className="price">
                        {formatPrice(price)}
                    </span>
                </h3>
                <p>{desc}</p>
                <button disabled={!isAvailable} onClick={() => this.props.addToOrder(this.props.index)}>
                    {isAvailable ? 'Ajouter au panier' : 'Hors Stock'}
                </button>
            </li>
            
        )
    }
}

export default Fish