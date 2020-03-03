import React, { Component } from 'react';
import FormInput from '../components/FormInput/FormInput';
import CustomButton from '../components/CustomButton/CustomButton';
import LoadingSpinnner from '../components/LoadingSpinner/LoadingSpinner';
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
	handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        try {
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
	        	if(user.id){
					sessionStorage.setItem("userLog",JSON.stringify(user));
	          		this.props.loadUser(user);
	          		this.props.onRouteChange('home');
	        	} else {
					alert('Wrong credentials!')
				}
			  })
        } catch(error) {
            console.log('error sign in user', error.message);
		}
		this.setState({...initialState, isLoading: true});
    }
	render() {
		const {onRouteChange} = this.props;
		return (
			<div className="flex flex-column flex-wrap">
				<article className="bg-black-10 br3 ba b--black-10 mv3 w-100 w-50-m w-50-l mw6 shadow-5 center">
					<main className="pa4 white-80">
					<div className="measure">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
						<legend className="mb2 cool f1 fw6 ph0 mh0">Sign In</legend>
						<form onSubmit = {this.handleSubmit}>
								<FormInput 
									name='email' 
									type='email' 
									value={this.state.email} 
									handleChange = {this.handleChange}
									label='Email'
									required
								/>
								<FormInput 
									name='password' 
									type='password' 
									value={this.state.password} 
									handleChange = {this.handleChange}
									label='Password'
									required
								/>
								<div className='buttons'>
									<CustomButton type='submit'>Sign In</CustomButton>
								</div>
							</form>
							<div className="lh-copy mt3">
								<p onClick = {()=>onRouteChange('register')}  className="f6 link dim pointer white db">Register</p>
							</div>
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
		);
	}
}
export default SignIn;