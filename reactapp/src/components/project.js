import React from 'react';

class Project extends React.Component {

    render() {
        return(
            <div className="Project">
                <h3>{this.props.name}</h3>
                <p>{this.props.description}</p>
            </div>
        )
    }
}

export default Project;