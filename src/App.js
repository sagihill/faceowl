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
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: 'ef9d4bc6225d4fbe8e3bf77f4c442504'
});

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
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLovation = (faceData) => {
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

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLovation(response)))
    .catch(err => console.log(err));
  }
  onRouteChange = (dest) => {
    if(dest==='signout'){
      this.setState({isSignedIn: false});
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
              <Rank />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition 
                box={box} 
                imageURL={imageURL}
              />
            </div>
          : (
              ((route === 'signin') ||  this.state.route === 'signout')
              ? <SignIn onRouteChange ={this.onRouteChange}/>
              : <Register onRouteChange ={this.onRouteChange}/>
            )
        }
      </div>     
    );
  }
}
export default App;
