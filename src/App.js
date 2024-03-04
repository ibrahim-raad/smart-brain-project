import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import FaceRecognition from'./components/FaceRecogniton/FaceRecognition';
import './App.css';
import ParticlesBg from 'particles-bg';





const initialState = {
      input: '',
      imageUrl:'',
      boxes: [],
      route: 'SignIn',
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
    this.setState({user :{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }
 

  
  calculateFaceLocations = (data) => {
    return data.outputs[0].data.regions.map(face => {
      const clarifaiFace = face.region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }

    });

  }

  

displayFaceBoxes = (boxes) => {
  this.setState({boxes: boxes})
}

onInputChange = (event) => {
     this.setState({input: event.target.value});
}

onButtonSubmit = () => {
  this.setState({imageUrl: this.state.input})
  fetch('https://face-detection-be-s94b.onrender.com/imageUrl', {
              method: 'post',
            headers: {'content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input,
            })
          })
        .then(response => response.json())
        .then(result => { 
          if(result) {
            fetch('https://face-detection-be-s94b.onrender.com/image', {
              method: 'put',
            headers: {'content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id,
            })
          })
            .then(result=> result.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
            .catch(console.log)
          }
          this.displayFaceBoxes(this.calculateFaceLocations(result));
      })
      .catch(error => console.log('error', error));
  
}

onRouteChange = (route) => {
  if (route === 'SignOut') {
    this.setState(initialState)
  } else if (route === 'home'){
    this.setState({isSignedIn: true})
  }
  this.setState({route : route})
}

  render () {
   const { isSignedIn, boxes, imageUrl, route } = this.state;
    return (
      <div className="App">
         <ParticlesBg color='' type="cobweb" bg={true} />
        <Navigation isSignedIn={isSignedIn}  onRouteChange={this.onRouteChange}/>
        { this.state.route === 'home'
         ? <div>
        <Logo />
        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
        <ImageLinkForm  onInputChange= {this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
         <FaceRecognition boxes={boxes}  imageUrl={imageUrl}/>
        </div>
        : (
         route=== 'SignIn'
         ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
         : <Register  loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )
       
        }
      </div>
    );
  }
}
export default App;
