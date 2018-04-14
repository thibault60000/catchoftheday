import React from 'react'
import PropTypes from 'prop-types';

const Login = props => {
    return (
        <nav className="login">
           <h2>Connexion à l'inventaire</h2> 
           <p>Connectez vous pour gérer votre inventaire</p>
           <button 
            className="github" 
            onClick={ () => props.authenticate("Github") }>
            Github
           </button>
           <button 
            className="twitter" 
            onClick={ () => props.authenticate("Twitter") }>
            Twitter
           </button>
           <button 
            className="facebook" 
            onClick={ () => props.authenticate("Facebook") }>
            Facebook
           </button>
        </nav>
    );
}

Login.propTypes = {
    authenticate: PropTypes.func.isRequired
};

export default Login;