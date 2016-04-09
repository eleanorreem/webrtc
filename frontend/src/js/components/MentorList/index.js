import React from 'react'
import MentorItem from './MentorItem/index.js'
import Videochat from './../Videochat/index.js'

var currentRoom
var rooms = {}
var media = {}
var accepted = {}

const styles = {
  li: {
    listStyleType: 'none',
    color: 'white',
    fontSize: '1.7em',
    textDecoration: 'none',
    padding: '5px'
  },
  ul: {
    backgroundColor: '#FFBE63',
    padding: '2em',
    borderRadius: '10px'
  }
}

class MentorList extends React.Component {
  constructor () {
    super()
    this.state = {
      pleaseCall: false,
      mentorList: []
    }
    this.updateState = this.updateState.bind(this)
    this.filterMentors = this.filterMentors.bind(this)
    this.initialisePBX = this.initialisePBX.bind(this)
    this.processFeed = this.processFeed.bind(this)
  }

  componentDidMount () {
    // ajax call to PBX API for info on all contacts in the room
    this.initialisePBX('fac33b', 'a2qitapm')
    var submit = document.getElementById('Submit')
    var input = document.getElementById('textbox')
    submit.addEventListener('click', () => {
      console.log('room (when clicking)-->', currentRoom)
      console.log('posting', input.value)
      currentRoom.post(input.value)
      input.value = ''
    })
  }
  initialisePBX (username, password) {
    const that = this

    var host = 'https://fac1.ipcortex.net' // eslint-disable-line

    IPCortex.PBX.Auth.setHost('https://fac1.ipcortex.net') // eslint-disable-line
    IPCortex.PBX.Auth.login({username: username, password: password}).then( // eslint-disable-line
      () => {
        // console.log(TAG, 'Login successful')
        /* Get the API to start collecting data */
        IPCortex.PBX.startFeed().then(() => { // eslint-disable-line
          // console.log(TAG, 'Live data feed started')
          that.filterMentors()
          // sets up room for video chat to be sent over
          IPCortex.PBX.enableChat((room) => { // eslint-disable-line
            // rob says decide if mentee shows their video????
            currentRoom = room
            if (typeof room !== 'object') {
              return
            }
            room.addListener('update', (_room) => {
              if (rooms[_room.roomID] && _room.state === 'dead') {
                delete rooms[_room.roomID]
              }
              // var messagesBox = document.getElementById('messages')
              // room.messages.forEach((message) => {
              //   // render messages
              // })
            }
            )
            /* If the room has come into existance due to a video request,
               start video with the stored stream */
            if (room.cID === media.cID && media.stream && !that.state.pleaseCall) {
              console.log('New room, starting video chat')
              /* Listen for updates on the Av instance */
              room.videoChat(media.stream).addListener('update', this.processFeed)
              media = {}
            }
            rooms[room.roomID] = room

            console.log('THAT OBJECT', that.state.pleaseCall)
            if (that.state.pleaseCall) {
              console.log('What is pleaseCall? pleaseCall is ', that.state.pleaseCall)
              MentorItem.startVideoCall(room)
            }
            // following line is webrtc vanilla

            // called after Mentor accepts video invitation
            IPCortex.PBX.enableFeature('av', (av) => { // eslint-disable-line
              console.log('enable feature av')
              av.addListener('update', this.processFeed)
              this.processFeed(av, currentRoom)
            }, ['chat'])
          },
          () => {
            // console.log(TAG, 'Live data feed failed')
          }
        )
        },
      () => {
        // console.log(TAG, 'Login failed')
      }
      )
      })
  }

  processFeed (av, room) {
    console.log('current Room (when process feed)-->', currentRoom)
    var accept = document.getElementById('call')
    var hangup = document.getElementById('hangup')
    var video = document.getElementById('video')
    /* Only process the Av instance if it has remote media */

    if (typeof av.remoteMedia !== 'object') {return}
    var videos = []
    for (var id in av.remoteMedia) {
      if (av.remoteMedia[id].status === 'offered') {
        /* If the remote party is offering create an invite */
        if (accepted[av.id]) { // We have already accepted - return
          return
        }
        console.log('Offer recieved from ' + av.remoteMedia[id].cN)
        /* Mark the offer as accepted as we may get another
           update with the 'offer' state still set */
        accepted[av.id] = true
        // POP UP AN 'accept' BUTTON WITH ONCLICK

        hangup.addEventListener('click', () => {
          console.log('rejecting call')
          av.reject()
        })

        accept.addEventListener('click', () => {
          console.log('accepting call')
          /* Grab the user media and accept the offer with the returned stream */
          navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(
            (stream) => {
              av.accept(stream)
            }
          ).catch(
            () => {
              console.log('getUserMedia failed')
            }
          )
        })
        // this is a convient way to keep things in scope
        // av.addListener('update', (av) => {
        //     // if (av.state == 'closed')
        //     // get rid of video...
        //       // invite.parentNode.removeChild(invite)
        // })
      } else if (av.remoteMedia[id].status === 'connected') {
        console.log('New remote media source ', av.remoteMedia[id])
        /* Create a new video tag to play/display the remote media */
        hangup.addEventListener('click', () => {
          console.log('hanging up')
          room.leave()
        })
        attachMediaStream(video, av.remoteMedia[id])  // eslint-disable-line
        videos.push(video)
        video.id = id
        video.play()
      } /* else if ( av.remoteMedia[id].status != 'connected' && video ) {
  			// Remove any video tags that are no longer in a 'connected' state //
  			video.parentNode.removeChild(video)
  		} */
    }
  }

  filterMentors () {
    // AJAX call to our api
    // save mentors to state so if new contact arrives we can still check it?
    const mentors = [{
      username: 'Jacket',
      apiId: 'fac28a',
      age: 22,
      firstName: 'mentor 1',
      lastName: 'string',
      gender: 'male',
      profession: 'string',
      topics: ['strings'],
      aboutme: 'string'
    }, {
      username: 'Franzzzz',
      apiId: 'fac21b',
      age: 22,
      firstName: 'mentor 2',
      lastName: 'string',
      gender: 'male',
      profession: 'string',
      topics: ['strings'],
      aboutme: 'string'
    }, {
      username: 'Mireia',
      apiId: 'mentor-4',
      age: 22,
      firstName: 'mentor 3',
      lastName: 'string',
      gender: 'male',
      profession: 'string',
      topics: ['strings'],
      aboutme: 'string'
    }]

    // axios.get('/getAllMentors')
    // .then((response) => {
    //   mentors = response
    // })
    // .catch((response) => {
    //   console.log(response)
    // })

    // filter contacts who are also mentors and save to state
    // regardless of their online/offline state
    let mentorList = IPCortex.PBX.contacts.filter((contact) => { // eslint-disable-line
      var isMentor = false
      mentors.forEach((mentor) => {
        if (contact.uname === mentor.apiId) {
          isMentor = true
          Object.assign(contact, mentor)
        }
      })
      return isMentor
    }).forEach((contact) => {
      /* Listen for updates in case the user changes state */
      contact.addListener('update', () => {
        // console.log(this.state.mentorList)
        const newMentorList = this.state.mentorList.filter((stateContact) => {
          return contact.cID !== stateContact.cID
        })
        this.updateState({
          mentorList: [
            ...newMentorList,
            contact
          ]
        })
      })

      this.updateState({
        mentorList: [
          ...this.state.mentorList,
          contact
        ]
      })
    })
  }

  updateState (newState) {
    this.setState(newState)
    console.log('update state called', this.state)
  }

  render () {
    return (
      <div>
        <ul style={styles.ul}>
          {this.state.mentorList.map((mentor, i) => {
            return mentor.canChat
            ? <MentorItem
              style={styles.li}
              mentor={mentor}
              key={i}
              changeState={this.updateState}
              processFeed={this.processFeed}
              />
            : null
          })}
        </ul>
        <Videochat />
      </div>
    )
  }
}

export default MentorList