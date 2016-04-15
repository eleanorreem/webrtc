import React from 'react'
import axios from 'axios'
import {Input, Button} from 'react-bootstrap'

class SubmitNotes extends React.Component {
  constructor () {
    super()
    this.state = {
      note: '',
      date: this.getDate(),
      showModal: false,
      sent: false
    }
    this.getDate = this.getDate.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.submitNotes = this.submitNotes.bind(this)
  }
  getDate () {
    return new Date().toString().split(' ').slice(0, 4).join(' ')
  }
  handleChange (e) {
    const note = e.target.value
    this.setState({note})
    // console.log(this.state)
  }
  submitNotes (e) {
    e.preventDefault()
    const options = {
      note: this.state.note,
      date: this.state.date,
      menteeName: this.props.menteeName,
      mentorName: this.props.mentorName
    }
    const url = this.props.noteRoute
    axios.post(url, options)
      .then(data => console.log(data))
      .then(this.setState({sent: true}))
      .then(axios.get('/api/note/postchat/john')
        .then(data => {console.log(data)}))
  }
  render () {
    console.log('state', this.state)
    console.log('propsss', this.props)
    return (
      <div>
        <form onSubmit={this.submitNotes} style={{padding: '1em 2em'}}>
          <h4>{this.props.noteInstructions}</h4>
          <Input
            onChange={this.handleChange}
            type='textarea'
            placeholder='let me know your thoughts'
            required
          />
          <Button
            onClick={this.props.toggleModal.bind(this, this.props.modalType)}
            type='submit'
          >
            Submit
          </Button>
        </form>
      </div>
    )
  }
}

SubmitNotes.defaultProps = {
  noteRoute: '/api/note/postchat/john',
  noteInstructions: 'please let me know how you felt about this session, so I can improve',
  note: 'Reem smells',
  menteeName: 'ellie',
  mentorName: 'sublimeOwen',
}

export default SubmitNotes
