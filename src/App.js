import React, { Component } from "react";
import "./App.scss";
import SignIn from "./pages/SignInSignUp/SignIn/SignIn";
import SignUp from './pages/SignInSignUp/SignUp/SignUp';
import Navigation from "./components/Navigation/Navigation";
import Hompage from './pages/Homepage/Homepage';

//The empty state - when App is renderd
const initialState = {
  input: "",
  imageURL: "",
  uploadURL: "",
  box: {},
  route: "signin",  //  change back to ---> route: "signin",
  isSignedIn: false, // change back to ---> isSignedIn: false,
  isFaceFound: false,
  loadingImage: false,
  isButtonSubmitted: false,
  imageFile: [],
  isDetectingFaces: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
};

//This is the main class App which holds the majority of the logical side of the application
// It also contains and builds the state of the app
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.onButtonSubmit = this.onButtonSubmit.bind(this);
  }

  // a method for loading users. activated through signin, signup or session storage
  // the input data is a user object. 
  // the output is setting the user state
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
  //the output is a css object notation for box display
  calculateFaceLocation = faceData => {
    //using first face for calculation
    //can be scaled up for more than one face
    const image = document.getElementById("inputimage");
    //getting image dimensions (width is constant but height varies)
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: faceData.left_col * width,
      rightCol: (1 - faceData.right_col) * width,
      topRow: faceData.top_row * height,
      bottomRow: (1 - faceData.bottom_row) * height
    };
  };

  //uses calculateFaceLocation method for box display
  //input is the css object notaion 
  displayFaceBox = box => {
    console.log(box);
    this.setState({ box: box, isButtonSubmitted: false});
  };

  //an event listener method for input change (when choosing pasting a URL)
  onInputChange = event => {
    this.setState({ input: event.target.value, uploadURL: "", imageFile: []});
    console.log(event.target.value);
  };

  //for reintializing input
  onInputBlur = () => {
    this.setState({ input: "" });
  };

  //an event listener for upload button (for uploading animation)
  onButtonClick = (event) => {
    const imageInput = event.target;
    imageInput.value = '';
    this.setState({isImageLoaded: false}) // state for 
  }

  //an event listener for image upload
  // input is the upload event
  // output is setting the upload URL state
  OnImageUpload = (event) => {
    const files = event.target.files;
    const uploadFileId = [files[0].lastModified, files[0].size];
    const stateFileId = [this.state.imageFile.lastModified, this.state.imageFile.size];
    if(stateFileId[0]===uploadFileId[0] && stateFileId[1]===uploadFileId[1]){
      alert("Try to upload another image my friend");
      return;
    }
    this.setState({loadingImage: true , imageFile: files[0], isFaceFound: false, input: "", isDetectingFaces: false}, () => {
      const data = new FormData();
      data.append('file',this.state.imageFile);
      data.append('upload_preset','faceowl');
      console.log("uploading");
      //cloudinary upload api
      fetch(
          'https://api.cloudinary.com/v1_1/dt94ijbsb/image/upload',
          {
              method: "POST",
              body: data
          }
      )
      .then(response => response.json())
      .then(response => {
        this.setState({loadingImage: false,  uploadURL: response.secure_url});
      })
    });
  }

// event listener for handeling the detect option
// when invoked the face recognition process is started
onButtonSubmit = () => {
  //the first few lines chooses proper URL from pasted or uploaded image
  // this is to deal with the case of both pasted and uploaded image url
  let URL = "";
  if(this.state.input!==""){
    URL = this.state.input
  } else {
      URL = this.state.uploadURL;
    }
    console.log(URL);
    if(URL===this.state.imageURL && URL!==''){
      alert("Please try a new image my friend");
      return;
    }
    //using setState than invoking callback function for actual detect process
    // isFaceFound set to false for rerendering the Success banner
    this.setState({ imageURL: URL, isFaceFound: false, box: {}, isDetectingFaces: true, isButtonSubmitted: true}, () => {
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
          //this is the response written by me in the backend side when the API response is
          // an error of some sort (no face/bad url)
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
            this.setState({isFaceFound: true, isButtonSubmitted: false}, () => {
              //invoking the facebox diplay methods
              this.displayFaceBox(this.calculateFaceLocation(response));
            })
          } else {
            this.setState({isFaceFound: false, input: "", isButtonSubmitted: false, isDetectingFaces: false})
            alert('Sorry something went wrong, please try again');
          }
        })
        .catch(err => console.log(err));
    });
      
};
    
    // event listener for keyboard submission
    // enabling enter button submission
    handleKeyUp = event => {
      if (event.keyCode === 13) {
        this.onButtonSubmit();
      }
    };

    // method for routing using states
    // in the future it is possible to use React-Router package
    // thus removing routing with state management
    // the input is the destination page
    // the output is setting the proper route
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
    const { imageURL, box, route, isSignedIn, isFaceFound, loadingImage, isDetectingFaces,  isButtonSubmitted} = this.state;
    return (
      <div className={`App ${!isDetectingFaces ? "overflow" : ""}`}>
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
            isDetectingFaces = {isDetectingFaces}
            isButtonSubmitted = {isButtonSubmitted}
            loadingImage = {loadingImage}
            onButtonClick = {this.onButtonClick}
          /> 
        ) : route === "signin" || route === "signout" ? (
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
