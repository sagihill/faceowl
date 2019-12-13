import React, {Component} from 'react'
import './App.css';
import Particles from 'react-particles-js';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

const particlesOptions = {
  particles: {
    number: {
        value: 60,
        density: {
            enable: true,
            value_area: 1000
        }
    },
    line_linked: {
        enable: false,
        opacity: 0.02
    },
    move: {
        direction: 'right',
        speed: 0.05
    },
    size: {
        value: 1
    },
    opacity: {
        anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.05
        }
    }
  },
  retina_detect: true
}

const initialState = {
  input: 'Please paste an image URL here',
  imageURL: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }

  calculateFaceLocation = (faceData) => {
    const clarifaiFace = faceData.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      rightCol: (1-clarifaiFace.right_col) * width,
      topRow: clarifaiFace.top_row * height,
      bottomRow: (1-clarifaiFace.bottom_row)* height
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input : event.target.value});
  }

  onInputClick = () => {
    this.setState({input : ''});
  }

  handleKeyUp = (event) => {
    if (event.keyCode === 13){
       this.setState({imageURL: this.state.input});
    fetch('https://agile-eyrie-66946.herokuapp.com/imageURL',{
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.state.input
          })
        })
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch('https://agile-eyrie-66946.herokuapp.com/image',{
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(console.log)

      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
    }
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
    fetch('https://agile-eyrie-66946.herokuapp.com/imageURL',{
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.state.input
          })
        })
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch('https://agile-eyrie-66946.herokuapp.com/image',{
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(console.log)

      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (dest) => {
    if(dest==='signout'){
      this.setState(initialState);
    } else if (dest === 'home'){
      this.setState({isSignedIn: true});
    }
    this.setState({route: dest});
  }
  render() {
    const {imageURL,box,route,isSignedIn} = this.state ;
    return (
      <div className="App">
        <Particles 
          className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn ={isSignedIn} onRouteChange ={this.onRouteChange} />
        {route === 'home'
          ? <div className = 'mv6'>
              <Logo />
              <Rank name = {this.state.user.name} entries = {this.state.user.entries}/>
              <ImageLinkForm 
                input = {this.state.input}
                onInputChange={this.onInputChange} 
                onInputClick={this.onInputClick}
                onButtonSubmit={this.onButtonSubmit}
                handleKeyUp = {this.handleKeyUp}
              />
              <FaceRecognition 
                box={box} 
                imageURL={imageURL}
              />
            </div>
          : (
              ((route === 'signin') ||  this.state.route === 'signout')
              ? <SignIn loadUser = {this.loadUser} onRouteChange ={this.onRouteChange}/>
              : <Register loadUser = {this.loadUser} onRouteChange ={this.onRouteChange}/>
            )
        }
      </div>     
    );
  }
}
export default App;
