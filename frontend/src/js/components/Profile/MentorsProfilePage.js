import React from 'react'

class MentorsProfilePage extends React.Component {
  render () {
    return (
      <div style={{padding: '0 2em'}}>
        <h3> {this.props.firstname} {this.props.lastname}</h3>
        <p>gender: {this.props.gender}</p>
        <p>age: {this.props.age}</p>
        <p>profession: {this.props.profession}</p>
        <p>topics: </p>
        <ul> {this.props.topics.map((topic, i) => {
          return <li key={i}>{topic}</li>
        })}</ul>
        <p>some things about me: </p>
        <p> {this.props.aboutme}</p>
      </div>
    )
  }
}

MentorsProfilePage.propTypes = {
  firstname: React.PropTypes.string.isRequired,
  lastname: React.PropTypes.string.isRequired,
  age: React.PropTypes.number.isRequired,
  gender: React.PropTypes.string.isRequired,
  profession: React.PropTypes.string.isRequired,
  topics: React.PropTypes.array.isRequired,
  aboutme: React.PropTypes.string.isRequired
}

MentorsProfilePage.defaultProps = {
  firstname: 'Andrew',
  lastname: 'MacMurray',
  age: 27,
  gender: 'male',
  profession: 'software developer',
  topics: ['software development', 'helping people'],
  aboutme: 'Im Andrew originally from Manchester '
}

export default MentorsProfilePage
