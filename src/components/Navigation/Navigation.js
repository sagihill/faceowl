import React from 'react';

//navigation is responsive to current route
const Navigation = ({onRouteChange,isSignedIn}) => {
		if(isSignedIn){
			return (
				<nav style={{display: 'flex' , justifyContent: 'flex-end'}}>
					<p onClick={()=>onRouteChange('signout')} className ='ma2 mt3 mr3 b shadow-3 ph3 pv2 input-reset ba b--black white-80 bg-near-black dim pointer f5 dib'> Sign Out</p>
				</nav>
			);
		}else{
			return (
				<nav style={{display: 'flex' , justifyContent: 'flex-end'}}>
					<p onClick={()=>onRouteChange('signin')} className ='ma2 mt3 b shadow-3 ph3 pv2 input-reset ba b--black white-80 bg-near-black dim pointer f5 dib'> Sign In</p>
					<p onClick={()=>onRouteChange('register')} className ='ma2 mt3 mr3 b shadow-3 ph3 pv2 input-reset ba b--black white-80 bg-near-black dim pointer f5 dib'> Register</p>
				</nav>
			);
		}

}

export default Navigation;