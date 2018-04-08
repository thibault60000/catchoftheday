import React, { Component } from 'react'
import { formatPrice } from '../helpers';

class Order extends Component {

    renderOrder = (key) => { 
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const isAvailable = fish && fish.status === 'available';
        // Make sure the fish is loaded before we continue
        if(!fish) return null;
        if(!isAvailable){
            return <li key={key}>Désolé {fish ? fish.name : 'fish'} n'est plus disponible</li>;
        }
        return (
            <li key={key}>
                {count} lot(s) de {fish.name}&nbsp;
                {formatPrice(count * fish.price)}
                <button onClick={() => this.props.removeFromOrder(key)}> &times; </button>
            </li>
        )
           
    }

    render () {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';
            if(isAvailable) {
                return prevTotal + (count * fish.price);
            }
            return prevTotal;
        }, 0);

        return (
            <div className="order-wrap">
               <h2> Order </h2>
               <ul className="order">
                   {orderIds.map(this.renderOrder)} 
               </ul> 
               <div className="total">
                   Total : 
                   <strong>{formatPrice(total)}</strong>
               </div> 
            </div>
        )
    }
}

export default Order