import React, { Component } from "react";
import "./App.css";
import Particles from "react-particles-js";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navigation from "./components/Navigation/Navigation";
import Hompage from "./pages/Homepage";

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
      direction: "right",
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
};

const initialInput = "Please paste an image URL here";

//The empty state - when App is renderd
const initialState = {
  input: initialInput,
  imageURL: "",
  uploadURL: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  isFaceFound: false,
  isImageLoaded: false,
  isDetectingFaces: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.onButtonSubmit = this.onButtonSubmit.bind(this);
  }

  // a method for loading users. activated through signin signup or cookies
  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  };

  //a method for calculating face location in the photo
  //the input is the response of clarifai api
  calculateFaceLocation = faceData => {
    //using first face for calculation
    //can be scaled up for more than one face
    const clarifaiFace = faceData; 
    const image = document.getElementById("inputimage");
    //getting image dimensions (width is constant but height varies)
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      rightCol: (1 - clarifaiFace.right_col) * width,
      topRow: clarifaiFace.top_row * height,
      bottomRow: (1 - clarifaiFace.bottom_row) * height
    };
  };
  //uses calculateFaceLocation method for box display
  displayFaceBox = box => {
    this.setState({ box: box });
  };

  //an event listener method for input change (when choosing pasting a URL)
  onInputChange = event => {
    this.setState({ input: event.target.value});
  };

  //for clearing the initial input
  onInputFocus = () => {
    this.setState({ input: "" });
  };

  //for reintializing input
  onInputBlur = () => {
    this.setState({ input: "Please paste an image URL here" });
  };

  //an event listener for upload button (for uploading animation)
  onButtonClick = () => {
    this.setState({isImageLoaded: false}) // state for 
  }

  //an event listener for image upload
  OnImageUpload = async (event) => {
    const files = event.target.files;
    const data = new FormData();
    data.append('file',files[0]);
    data.append('upload_preset','faceowl');
    this.setState({loadingImage: true}); // for future loading animation
    //cloudinary upload api
    const response = await fetch(
        'https://api.cloudinary.com/v1_1/dt94ijbsb/image/upload',
        {
            method: "POST",
            body: data
        }
    )
    const file = await response.json();
    this.setState({isImageLoaded: true, uploadURL: file.secure_url});

}

// event listener for handeling the detect option
onButtonSubmit = () => {
  //the first few lines chooses proper URL from pasted or uploaded image
  let URL = "";
  if(this.state.input!==initialInput){
    URL = this.state.input
  } else {
      URL = this.state.uploadURL;
    }
    //using setState than invoking callback function for actual detect process
    // isFaceFound set to false for rerendering success banner
    this.setState({ imageURL: URL, isFaceFound: false }, () => {
      //fetch call for server at imageURL route - the clarifai api process
      fetch("https://agile-eyrie-66946.herokuapp.com/imageURL", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: this.state.imageURL
        })
      })
        .then(response => response.json())
        .then(response => {
          if (response !== "unable to work with Clarifai API") {
            //if the response is positive (face is found)
            //this fetch call increments user rank
            //sending user id
            //this process can move to backend, using it here for educational purpose
            fetch("https://agile-eyrie-66946.herokuapp.com/image", {
              method: "put",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
              .then(response => response.json())
              //getting user rank
              .then(count => {
                this.setState(Object.assign(this.state.user, { entries: count }));
              })
              .catch(console.log);
              //setting state for rendering success banner
            this.setState({isFaceFound: true})
            //invoking the facebox diplay methods
            this.displayFaceBox(this.calculateFaceLocation(response));
          } else {
            this.setState({isFaceFound: false, input: "Please paste an image URL here" })
            alert('Sorry something went wrong, please try again');
          }
        })
        .catch(err => console.log(err));
      });
      
    };
    
    // event listener for keyboard submission
    handleKeyUp = event => {
      if (event.keyCode === 13) {
        this.onButtonSubmit();
      }
    };

    // method for routing using states
    // in the future it is possible to use React-Router package
    // thus removing routing with state management
    onRouteChange = dest => {
      if (dest === "signout") {
        //clearing user cookie
      sessionStorage.removeItem("userLog");
      this.setState(initialState);
    } else if (dest === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: dest });
  };
  render() {
    // state abstraction notation
    const { imageURL, box, route, isSignedIn, isFaceFound, isImageLoaded} = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <Hompage
            name={this.state.user.name}
            entries={this.state.user.entries}
            input={this.state.input}
            onInputChange={this.onInputChange}
            onInputFocus={this.onInputFocus}
            onInputBlur={this.onInputBlur}
            onButtonSubmit={this.onButtonSubmit}
            handleKeyUp={this.handleKeyUp}
            OnImageUpload={this.OnImageUpload} 
            box={box} 
            imageURL={imageURL} 
            isFaceFound = {isFaceFound}
            isImageLoaded = {isImageLoaded}
            onButtonClick = {this.onButtonClick}
          />
        ) : route === "signin" || this.state.route === "signout" ? (
          <SignIn 
            loadUser={this.loadUser} 
            onRouteChange={this.onRouteChange} 
          />
        ) : (
          <SignUp
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}
export default App;
