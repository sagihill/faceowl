import React from 'react';

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value})
	}

	onSubmitSignIn = () => {
		fetch('http://localhost:8080/signin',{
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
			.then(response => response.json())
	      	.then(user => {
	        	if(user.id){
	          		this.props.loadUser(user);
	          		this.props.onRouteChange('home');
	        	}
      })
	}

	render() {
		const {onRouteChange} = this.props;
		return (
			<article className="bg-black-10 br3 ba b--black-10 mv6 w-100 w-50-m w-50-l mw6 shadow-5 center">
				<main className="pa4 white-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="cool f1 fw6 ph0 mh0">Sign In</legend>
				      <div className="mt4">
				        <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
				        <input 
					        onChange={this.onEmailChange} 
					        className="br1 shadow-3 pa2 input-reset ba bg-transparent hover-bg-near-black hover-white b--black-60 w-100" 
					        type="email" 
					        name="email-address"  
					        id="email-address"
			        	/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
				        <input
				        	onChange={this.onPasswordChange} 
					        className="br1 shadow-3 pa2 input-reset ba bg-transparent hover-bg-near-black hover-white b--black-60 w-100" 
					        type="password" 
					        name="password"  
					        id="password"
				        />
				      </div>
				    </fieldset>
				    <div className="">
				      <input 
				      	onClick = {this.onSubmitSignIn}
				      	className="b shadow-3 ph3 pv2 input-reset ba b--black white-80 bg-near-black grow pointer f5 dib" 
				      	type="submit" 
				      	value="Submit"
			      	  />
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick = {()=>onRouteChange('register')}  className="f6 link dim pointer white db">Register</p>
				    </div>
				  </div>
				</main>
			</article>
		);
	}
}
export default SignIn;