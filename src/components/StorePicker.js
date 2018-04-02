import React from 'react'
import { getFunName } from '../helpers';

class StorePicker extends React.Component {

    myInput = React.createRef();

    goToStore = event => {
        event.preventDefault();
        const storeName = this.myInput.value.value;
        this.props.history.push(`/store/${storeName}`);

    }
    render () {
        return (
            <React.Fragment>
                <h1>BIENVENUE !</h1>
                <form className="store-selector" onSubmit={this.goToStore}>
                    <h2>Nom de boutique?</h2>
                    <input 
                    type="text" 
                    required 
                    ref={this.myInput}
                    placeholder="Entrer un nom" 
                    defaultValue={getFunName()} />
                    <button type="sbumit">Voir la boutique</button>
                </form>
            </React.Fragment>
        )
    }
}

export default StorePicker