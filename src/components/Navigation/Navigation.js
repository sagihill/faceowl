import React from 'react';
import CustomButton from '../CustomButton/CustomButton';
import './Navigation.style.css';

//navigation is responsive to current route
const Navigation = ({onRouteChange,isSignedIn}) => {
		if(isSignedIn){
			return (
				<nav className='navbar navbar-homepage'>
					<CustomButton className='navbar-button' onClick={()=>onRouteChange('signout')}>Sign Out</CustomButton>
				</nav>
			);
		}else{
			return (
				<nav className='navbar navbar-login-register'>
					<CustomButton className='navbar-button navbar-button-login' onClick={()=>onRouteChange('signin')}>Login</CustomButton>
					<CustomButton className='navbar-button navbar-button-register' onClick={()=>onRouteChange('register')}>Register</CustomButton>
				</nav>
			);
		}

}

export default Navigation;