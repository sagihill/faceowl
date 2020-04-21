import React, { Component } from 'react';
import FormInput from '../../../components/FormInput/FormInput';
import CustomButton from '../../../components/CustomButton/CustomButton';
import '../shared.style.css';
import './SignIn.style.css';

const initialState = {
    email: '',
	password: '',
	isLoading: false
}

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = initialState;
	}

	//first checking if session has a logged user
	componentDidMount() {
		const currUser = sessionStorage.getItem("userLog");
		if(currUser) {
			this.props.loadUser(JSON.parse(currUser))
			this.props.onRouteChange('home');
		}
	}

	// an event handler for form change
	// the input is the textbox input
	// the output is setting the proper form state
	handleChange = (event) => {
        const { value, name } = event.target
        this.setState({ [name]: value })
	}
	
	//an event handler for the form submission process
	// invoking the signin backend process
	// the input is the form submit
	// the output is setting the user and route state
	handleSubmit = (event) => {
		event.preventDefault();
		const { email, password } = this.state;
		this.setState({isLoading: true}, ()=> {
			fetch('https://agile-eyrie-66946.herokuapp.com/signin',{
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: email,
				password: password
			})
			})
			.then(response => response.json())
			.then(user => {
				if(user.id) {
					sessionStorage.setItem("userLog",JSON.stringify(user));
					this.props.loadUser(user);
					this.props.onRouteChange('home');
			  } else {
				  alert('Wrong credentials!')
				  this.setState({isLoading: false});
			  }
			})
			.catch(err => console.log(err))
		});
	}

	//an event handler for the form submission process
	// invoking the signin backend process
	// the input is the form submit
	// the output is setting the user and route state
	// handleSubmitFormer = async (event) => {
	// 	event.preventDefault();
	// 	this.handleLoginAnimation()
    //     const { email, password } = this.state;
    //     try {
    //         fetch('https://agile-eyrie-66946.herokuapp.com/signin',{
	// 		method: 'post',
	// 		headers: {'Content-Type': 'application/json'},
	// 		body: JSON.stringify({
	// 			email: email,
	// 			password: password
	// 		})
	// 	})
	// 		.then(response => response.json())
	//       	.then(user => {
	//         	if(user.id){
	// 				sessionStorage.setItem("userLog",JSON.stringify(user));
	//           		this.props.loadUser(user);
	//           		this.props.onRouteChange('home');
	//         	} else {
	// 				alert('Wrong credentials!')
	// 			}
	// 		  })
    //     } catch(error) {
    //         console.log('error sign in user', error.message);
	// 	}
	// 	this.setState({...initialState});
    // }
	render() {
		const {email, password, isLoading} = this.state
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
						<div className="sign-in-request">Login to your Account</div>
						<form className='inputs-form' onSubmit = {this.handleSubmit}>
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
							<CustomButton type='submit'>Login</CustomButton>
						</form>
					</div>
					<div className="side-container">
						<h1 className='side-greeting'>
							Welcome Back!
						</h1>
						<span className='side-span-info'>
						We are so happy you decided to come back. Here my faceOwl will help you discover faces in your pictures.
						<br></br>If you haven't joined us yet, just click the register button and
						fill out the short registration form, then my faceOwl will do some magic.
						</span>
					</div>
				</article>
			</div>
		);
	}
}
export default SignIn;