import React, { Component } from 'react';
// import logo from './logo.svg';s
import './App.css';
import Project from './components/project.js';

import Axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    };
  }

  componentDidMount() {
    console.log("anything");
    Axios.get('http://localhost:5000/api/projects')
    .then(res => {
      console.log('axios happening');
      console.log(res.data);
      this.setState(() => ({ projects: res.data })); 
    })
    .catch(err => console.log(err));
    console.log(this.state);
  }

  render() {
    return (
      <div className="App">
        <h1>Projects</h1>
        {this.state.projects.map(project => {
          return <Project key={project.id} name={project.name} description={project.description} />
        })}
      </div>
    )
  }


}



export default App;
