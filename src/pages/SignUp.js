import React, { Component } from 'react';
import FormInput from '../components/FormInput/FormInput.js';
import CustomButton from '../components/CustomButton/CustomButton.js'
import LoadingSpinnner from '../components/LoadingSpinner/LoadingSpinner';
const initialState = {
    displayName: '',
    email: '',
    password: '',
	confirmPassword: '',
	isLoading: false
}

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

	// this method is the event listener for submiting registration form
	// invoking the register backend process
	// the input is the form submit
	// the output is setting the user and route state
    handleSubmit = async (event) => {
        event.preventDefault();
		const { displayName, email, password, confirmPassword } = this.state;
		//frontend password check
        if(password!==confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        try {
			// fetch call for registering a user at the backend server
            fetch('https://agile-eyrie-66946.herokuapp.com/register',{
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: displayName,
				email: email,
				password: password
			    })
			})
			// the server response is the same user object
			.then(response => response.json())
			.then(user => {
				if (user.id){
					//loading user
					this.props.loadUser(user);
					//routing to homepage
					this.props.onRouteChange('home');
				} else {
					alert('The email address you have entered is already registered')
				}
			})
        } catch (error) {
			console.log('error creating user', error.message);
        }
        this.setState({...initialState,isLoading: true});
    }

	// an event handler for form change
	// the input is the textbox input
	// the output is setting the proper form state
    handleChange = (event) => {
        const { value, name } = event.target
        this.setState({ [name]: value })
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
			<div className="flex flex-column flex-wrap">
				<article className="bg-black-10 br3 ba b--black-10 mv3 w-100 w-50-m w-50-l mw6 shadow-5 center">
					<main className="pa3 white-80">
						<div className="measure">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="mb2 cool f1 fw6 ph0 mh0">Register</legend>
							<form className='sign-up-form' onSubmit = {this.handleSubmit}>
								<FormInput 
									name='displayName' 
									type='text' 
									value={displayName} 
									handleChange = {this.handleChange}
									label='Name'
									required
								/>
								<FormInput 
									name='email' 
									type='email' 
									value={email} 
									handleChange = {this.handleChange}
									label='Email'
									required
								/>
								<FormInput 
									name='password' 
									type='password' 
									value={password} 
									handleChange = {this.handleChange}
									label='Password'
									required
								/>
								<FormInput 
									name='confirmPassword' 
									type='password' 
									value={confirmPassword} 
									handleChange = {this.handleChange}
									label='Confirm Password'
									required
								/>
								<div className='buttons'>
									<CustomButton type='submit'>Submit</CustomButton>
								</div>
							</form>
						</fieldset>
						</div>
					</main>
				</article>
				<div className="flex flex-column center">
					{
						(this.state.isLoading) ? (
							<LoadingSpinnner/>
						):
						null
					}
				</div>
			</div>
        )
    }
}
export default SignUp;