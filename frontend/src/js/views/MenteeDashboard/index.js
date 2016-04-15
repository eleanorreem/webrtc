import React from 'react'
import {Grid, Row, Col, Modal, Button} from 'react-bootstrap'
import ProfileButtons from '../MentorDashboard/ProfileButtons.js'
import MenteesProfilePage from '../../components/Profile/MenteesProfilePage.js'
import MenteesEditProfile from '../../components/MenteesSignup/MenteesEditProfile.js'
import MentorList from '../../components/MentorList/index.js'
import SubmitNotes from '../../components/SubmitNotes/SubmitNotes.js'

export default class MenteeDashboard extends React.Component {
  constructor () {
    super()
    this.state = {
      status: 'Online',
      showViewModal: false,
      showEditModal: false,
      showFeedbackModal: false,
      showPreChatModal: true
    }
    this.changeStatus = this.changeStatus.bind(this)
  }
  // toggle modal state (modal)

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
          <Col xs={1}/>
          <Col xs={10}><MentorList toggleModal={this.toggleModal.bind(this)} {...this.props}/></Col>
          <Col md={1}/>
        </Row>
        <Row>
          <Col xs={2}/>
          <Col xs={8}>
            <ProfileButtons
              status={this.state.status}
              changeStatus={this.changeStatus}
              viewProfileLink={this.toggleModal.bind(this, 'showViewModal')}
              editProfileLink={this.toggleModal.bind(this, 'showEditModal')}
            />
          </Col>
          <Col xs={2}/>
        </Row>
        <Modal
          show={this.state.showViewModal}
          onHide={this.toggleModal.bind(this, 'showViewModal')}
        >
          <Modal.Header closeButton>
            <Modal.Title>Mentee Profile</Modal.Title>
          </Modal.Header>
          <MenteesProfilePage />
          <Modal.Footer>
            <Button onClick={this.toggleModal.bind(this, 'showViewModal')}>Close</Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={this.state.showEditModal}
          onHide={this.toggleModal.bind(this, 'showEditModal')}
        >
          <Modal.Header closeButton>
            <Modal.Title>Mentee Profile</Modal.Title>
          </Modal.Header>
          <MenteesEditProfile {...this.props.editProfile} editing/>
          <Modal.Footer>
            <Button onClick={this.toggleModal.bind(this, 'showEditModal')}>Close</Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={this.state.showFeedbackModal}
          onHide={this.toggleModal}
        >
          <Modal.Header closeButton>
          </Modal.Header>
          <SubmitNotes
            modalType='showFeedbackModal'
            toggleModal={this.toggleModal.bind(this)}
            noteInstructions='please leave feedback on your session'
          />
        </Modal>
        <Modal
          show={this.state.showPreChatModal}
          onHide={this.toggleModal}
        >
          <Modal.Header closeButton>
          </Modal.Header>
          <SubmitNotes modalType='showPreChatModal' toggleModal={this.toggleModal.bind(this)}
            noteInstructions={'Let your mentor know how you are feeling today'}
          />
        </Modal>
      </Grid>
    )
  }
}

MenteeDashboard.defaultProps = {
  status: 'Offline',
  mentors: [{
    mentorName: 'andrew',
    imgUrl: 'https://avatars0.githubusercontent.com/u/14013616?v=3&s=400',
    mentorStatus: 'online'
  }, {
    mentorName: 'sam',
    imgUrl: 'https://avatars0.githubusercontent.com/u/15983736?v=3&s=400',
    mentorStatus: 'busy'
  }, {
    mentorName: 'ellie',
    imgUrl: 'https://avatars2.githubusercontent.com/u/16049515?v=3&s=460',
    mentorStatus: 'offline'
  }],
  editProfile: {
    username: 'Ivan',
    firstname: 'Ivan',
    lastname: 'King of Puns',
    age: 10,
    gender: 'male',
    profession: 'King of Puns',
    topics: ['Ivan', 'Ivan greatness', 'my glossy soft head of hair'],
    aboutme: 'I am da Bomb'
  },
}

MenteeDashboard.propTypes = {
  status: React.PropTypes.string,
  mentors: React.PropTypes.array,
  viewProfileLink: React.PropTypes.string,
  editProfileLink: React.PropTypes.string,
  editProfile: React.PropTypes.object
}
