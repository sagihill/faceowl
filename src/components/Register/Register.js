import React from 'react';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			name: ''
		}
	}

	onNameChange = (event) => {
		this.setState({name: event.target.value})
	}

	onEmailChange = (event) => {
		this.setState({email: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({password: event.target.value})
	}
	onSubmitRegister = () => {
		fetch('https://agile-eyrie-66946.herokuapp.com/register',{
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password
			})
		})
			.then(response => response.json())
			.then(user => {
				if (user.id){
					this.props.loadUser(user);
					this.props.onRouteChange('home');
				}
			})
	}
	render() {
		return (
			<article className="bg-black-10 br3 ba b--black-10 mv6 w-100 w-50-m w-50-l mw6 shadow-5 center">
				<main className="pa4 white-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="cool f1 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f5" htmlFor="name">Name</label>
				        <input
				        	onChange = {this.onNameChange} 
					        className="br1 shadow-3 pa2 input-reset ba bg-transparent hover-bg-near-black hover-white b--black-60 w-100" 
					        type="text" 
					        name="name"  
					        id="name"
				        />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
				        <input 
				        	onChange = {this.onEmailChange}
					        className="br1 shadow-3 pa2 input-reset ba bg-transparent hover-bg-near-black hover-white b--black-60 w-100" 
					        type="email" 
					        name="email-address"  
					        id="email-address"
				        />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
				        <input 
				    	    onChange = {this.onPasswordChange}
					        className="br1 shadow-3 pa2 input-reset ba bg-transparent hover-bg-near-black hover-white b--black-60 w-100" 
					        type="password" 
					        name="password"  
					        id="password"
				        />
				      </div>
				    </fieldset>
				    <div className="">
				      <input 
				      	onClick = {this.onSubmitRegister}
				      	className="b shadow-3 ph3 pv2 input-reset ba b--black white-80 bg-near-black grow pointer f5 dib" 
				      	type="submit" 
				      	value="Submit"
			      	  />
				    </div>
				  </div>
				</main>
			</article>
	);
	}
}

export default Register;