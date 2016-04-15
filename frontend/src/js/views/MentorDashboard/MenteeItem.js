import React from 'react'
import {Well, Collapse, Button, Modal} from 'react-bootstrap'
import SubmitNotes from '../../components/SubmitNotes/SubmitNotes.js'
import TabNotes from './TabNotes.js'

export default class MenteeItem extends React.Component {
  constructor () {
    super()
    this.state = {
      showNotesModal: false
    }
  }
  toggleModal (typeOfModal) {
    const newState = {}
    newState[typeOfModal] = !this.state[typeOfModal]
    this.setState(newState)
  }
  sendReminder () {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log('text message sent')
      }
    }
    xhr.open('GET', '/text')
    xhr.send()
  }

  render () {
    return (
      <div className='mentee-item'>
        <a style={{textDecoration: 'none'}}>
          <li
            key={this.props.index}
            onClick={() => this.setState({open: !this.state.open})}
            style={this.props.styles}
          >
            {this.props.menteeName}
          </li>
        </a>
        <Collapse in={this.state.open}>
          <div>
            <Well>
              <p>
                <b>Last conversation:</b>
                {(new Date(this.props.lastConversation)).toString().substr(0, 15)}
              </p>
              <p><b>About:</b> {this.props.about}</p>
              <TabNotes {...this.props}/>
              <Modal
                show={this.state.showNotesModal}
                onHide={this.toggleModal}
              >
                <Modal.Header closeButton>
                </Modal.Header>
                <SubmitNotes
                  modalType='showNotesModal'
                  toggleModal={this.toggleModal.bind(this)}
                  noteInstructions='Please write down your thoughts on your mentee'
                />
              </Modal>
              <Button
                onClick={this.toggleModal.bind(this, 'showNotesModal')}
              > create a note</Button>
              <Button onClick={this.sendReminder.bind(this)}>Send reminder</Button>
            </Well>
          </div>
        </Collapse>
      </div>
    )
  }
}

MenteeItem.propTypes = {
  index: React.PropTypes.number,
  conversationLink: React.PropTypes.string,
  lastConversation: React.PropTypes.number,
  menteeName: React.PropTypes.string,
  styles: React.PropTypes.object,
  about: React.PropTypes.string,
}
