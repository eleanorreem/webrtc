import React from 'react'
import {Grid, Row, Col, Modal, Button} from 'react-bootstrap'
import MenteeList from './MenteeList.js'
import ProfileButtons from './ProfileButtons.js'
import MentorsProfilePage from '../../components/Profile/MentorsProfilePage.js'
import MentorsEditProfile from '../../components/MentorsSignup/MentorsEditProfile.js'
import MentorList from '../../components/MentorList/index.js'

export default class MentorDashboard extends React.Component {
  constructor () {
    super()
    this.state = {
      status: 'Online',
      showViewModal: false,
      showEditModal: false
    }
    this.changeStatus = this.changeStatus.bind(this)
  }

  changeStatus (newStatus) {
    this.setState({
      status: newStatus
    })
  }

  toggleModal (typeOfModal) {
    const newState = {}
    newState[typeOfModal] = !this.state[typeOfModal]
    this.setState(newState)
  }

  render () {
    return (
      <Grid>
        <Row>
          <Col md={8}>
            <h2>Your Mentees</h2>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <MenteeList
              mentees={this.props.mentees}
              mentorUsername={this.props.username}
              {...this.props}
            />
            <MentorList location={this.props.location.pathname}/>
          </Col>
          <Col md={4}>
            <ProfileButtons
              location={this.props.location.pathname}
              status={this.state.status}
              changeStatus={this.changeStatus}
              viewProfileLink={this.toggleModal.bind(this, 'showViewModal')}
              editProfileLink={this.toggleModal.bind(this, 'showEditModal')}
            />
          </Col>
        </Row>
        <Modal
          show={this.state.showViewModal}
          onHide={this.toggleModal.bind(this, 'showViewModal')}
        >
          <Modal.Header closeButton>
            <Modal.Title>Mentor Profile</Modal.Title>
          </Modal.Header>
          <MentorsProfilePage />
          <Modal.Footer>
            <Button onClick={this.toggleModal.bind(this, 'showViewModal')}>Close</Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={this.state.showEditModal}
          onHide={this.toggleModal.bind(this, 'showEditModal')}
        >
          <Modal.Header closeButton>
            <Modal.Title>Mentor Profile</Modal.Title>
          </Modal.Header>
          <MentorsEditProfile {...this.props.editProfile} editing/>
          <Modal.Footer>
            <Button onClick={this.toggleModal.bind(this, 'showEditModal')}>Close</Button>
          </Modal.Footer>
        </Modal>
        <div className='bottomdiv'></div>
      </Grid>
    )
  }
}

MentorDashboard.defaultProps = {
  status: 'Offline',
  mentees: [
    {menteeName: 'Sam Houston',
      conversationLink: '/contact',
      feedbackNotes: [{
        note: 'I feel sad right now',
        mentorName: 'Andrew',
        menteeName: 'sublimeOwen',
        date: 'somestring'
      }, {
        note: 'I feel great right now',
        mentorName: 'Andrew',
        menteeName: 'sublimeOwen',
        date: 'somestring'
      }, {
        note: 'I feel okay right now',
        mentorName: 'Andrew',
        menteeName: 'sublimeOwen',
        date: 'somestring'
      }],
      prechatNotes: [{
        note: 'I feel bored right now',
        mentorName: 'Andrew',
        menteeName: 'sublimeOwen',
        date: 'somestring'
      }, {
        note: 'I feel tired right now',
        mentorName: 'Andrew',
        menteeName: 'sublimeOwen',
        date: 'somestring'
      }, {
        note: 'I feel real right now',
        mentorName: 'Andrew',
        menteeName: 'sublimeOwen',
        date: 'somestring'
      }],
      postchatNotes: [{
        note: 'I feel mournful right now',
        mentorName: 'Andrew',
        menteeName: 'sublimeOwen',
        date: 'somestring'
      }, {
        note: 'I feel sublime right now',
        mentorName: 'Andrew',
        menteeName: 'sublimeOwen',
        date: 'somestring'
      }, {
        note: 'I feel great right now',
        mentorName: 'Andrew',
        menteeName: 'sublimeOwen',
        date: 'somestring'
      }],
      lastConversation: 1460028602793,
      about: 'Sam is 17 and recently diagnosed with quite severe anxiety, particularly' +
      'school-related. He would like to start working towards his exams but needs some ' +
      'direction around what to expect, how to deal with it and some advice to help alleviate ' +
      'his anxiety. As he is on the waiting list at a service, which may be as long as 18 weeks,' +
      ' they signpost him to the mentoring platform.'
    },
    {menteeName: 'Mireia Sangalo',
      conversationLink: '/contact',
      prechatNotes: [{
        note: 'Im feeling quite down today',
        mentorName: 'Andrew',
        menteeName: 'sublimeOwen',
        date: 'somestring'
      }, {
        note: 'I feel not too bad today',
        mentorName: 'Andrew',
        menteeName: 'sublimeOwen',
        date: 'somestring'
      }],
      feedbackNotes: [{
        note: 'Andrew was great today, he listened and understood me',
        mentorName: 'Andrew',
        menteeName: 'sublimeOwen',
        date: 'somestring'
      }, {
        note: 'Andrew didnt quite understand me today but he listened',
        mentorName: 'Andrew',
        menteeName: 'sublimeOwen',
        date: 'somestring'
      }],
      postchatNotes: [{
        note: 'Mireia seems well today',
        mentorName: 'Andrew',
        menteeName: 'sublimeOwen',
        date: 'somestring'
      }, {
        note: 'Mireia seemed a bit down during our chat but said she felt better afterwards',
        mentorName: 'Andrew',
        menteeName: 'sublimeOwen',
        date: 'somestring'
      }],
      lastConversation: 1460028602793,
      about: 'Mireia is 17 and recently diagnosed with quite severe anxiety, particularly' +
      'school-related. He would like to start working towards his exams but needs some ' +
      'direction around what to expect, how to deal with it and some advice to help alleviate ' +
      'his anxiety. As he is on the waiting list at a service, which may be as long as 18 weeks,' +
      ' they signpost him to the mentoring platform.'
    },
    {menteeName: 'Rob ',
      conversationLink: '/contact',
      feedbackNotes: [{
        note: 'I feel great right now',
        mentorName: 'Andrew',
        menteeName: 'sublimeOwen',
        date: 'somestring'
      }, {
        note: 'I feel great right now',
        mentorName: 'Andrew',
        menteeName: 'sublimeOwen',
        date: 'somestring'
      }, {
        note: 'I feel great right now',
        mentorName: 'Andrew',
        menteeName: 'sublimeOwen',
        date: 'somestring'
      }],
      prechatNotes: [{
        note: 'I feel great right now',
        mentorName: 'Andrew',
        menteeName: 'sublimeOwen',
        date: 'somestring'
      }, {
        note: 'I feel great right now',
        mentorName: 'Andrew',
        menteeName: 'sublimeOwen',
        date: 'somestring'
      }, {
        note: 'I feel great right now',
        mentorName: 'Andrew',
        menteeName: 'sublimeOwen',
        date: 'somestring'
      }],
      postchatNotes: [{
        note: 'I feel great right now',
        mentorName: 'Andrew',
        menteeName: 'sublimeOwen',
        date: 'somestring'
      }, {
        note: 'I feel great right now',
        mentorName: 'Andrew',
        menteeName: 'sublimeOwen',
        date: 'somestring'
      }, {
        note: 'I feel great right now',
        mentorName: 'Andrew',
        menteeName: 'sublimeOwen',
        date: 'somestring'
      }],
      lastConversation: 1460028602793,
      about: 'Sam is 17 and recently diagnosed with quite severe anxiety, particularly' +
      'school-related. He would like to start working towards his exams but needs some ' +
      'direction around what to expect, how to deal with it and some advice to help alleviate ' +
      'his anxiety. As he is on the waiting list at a service, which may be as long as 18 weeks,' +
      ' they signpost him to the mentoring platform.'
    }],
  editProfile: {
    username: 'Andrew MacMurray',
    firstname: 'Andrew',
    lastname: 'MacMurray',
    age: 27,
    gender: 'male',
    profession: 'software developer',
    topics: ['software development', 'helping people'],
    aboutme: 'Im Andrew originally from Manchester ',
    mobile: '07512345678'
  }
}

MentorDashboard.propTypes = {
  status: React.PropTypes.string,
  mentees: React.PropTypes.array,
  viewProfileLink: React.PropTypes.string,
  editProfileLink: React.PropTypes.string,
  editProfile: React.PropTypes.object
}
