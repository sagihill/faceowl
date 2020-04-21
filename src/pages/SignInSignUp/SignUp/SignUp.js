import React, { Component } from 'react';
import FormInput from '../../../components/FormInput/FormInput.js';
import CustomButton from '../../../components/CustomButton/CustomButton.js'
import '../shared.style.css';
import './SignUp.style.css';

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
	
	handleSubmit = (event) => {
		event.preventDefault();
		const { displayName, email, password, confirmPassword } = this.state;
		//frontend password check
        if(password!==confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
		this.setState({isLoading: true}, ()=> {
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
					this.setState({isLoading: false});
					alert('The email address you have entered is already registered')
				}
			})
			.catch(err => console.log(err))
		});
	}

	// this method is the event listener for submiting registration form
	// invoking the register backend process
	// the input is the form submit
	// the output is setting the user and route state
    handleSubmitFormer = async (event) => {
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
        this.setState({...initialState});
    }

	// an event handler for form change
	// the input is the textbox input
	// the output is setting the proper form state
    handleChange = (event) => {
        const { value, name } = event.target
        this.setState({ [name]: value })
	}

	handleLoginAnimation = () => {
		this.setState({isLoading: true})
	}

    render() {
        const { displayName, email, password, confirmPassword, isLoading } = this.state;
        return (
			<div className="signin-signup-page-container">
				<article className="signin-signup-page-card">
					<div className='signin-signup-form-container'>
						<div className='company-trademark'>
						{
							isLoading ? (
								<div className='company-logo rolling-owl'></div>
							):(
								<div className='company-logo'></div>
							)
						}
							<div className="company-name">faceOwl</div>
						</div>
						<div className="sign-up-request">Create an Account</div>
						<form className='inputs-form' onSubmit = {this.handleSubmit}>
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
							<CustomButton type='submit'>Submit</CustomButton>
						</form>
					</div>
					<div className="side-container">
						<h1 className='side-greeting'>
							Glad to see You!
						</h1>
						<span className='side-span-info'>
							We are so happy you decided to join us, you won't regret it.<br></br> Just fill out the registration form and 
							start an amazing experience. my faceOwl is so excited, it can't wait to start help you discover facs in your 
							pictures, lets GO!
						</span>
					</div>
				</article>
			</div>
        );
    }
}
export default SignUp;