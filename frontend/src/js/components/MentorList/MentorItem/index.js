import React from 'react'

class MentorItem extends React.Component {
  constructor () {
    super()
    this.onClickFunc = this.onClickFunc.bind(this)
  }
  onClickFunc () {
    console.log('calling onClickFunc')
    this.props.changeState({
      pleaseCall: true
    })
    let ourRoom = null
    IPCortex.PBX.rooms.forEach(((room) => { // eslint-disable-line
      console.log(room.cID)
      console.log(this.props.mentor.cID)
      if (room.cID === this.props.mentor.cID) {
        ourRoom = room
      }
    }).bind(this))
    console.log(ourRoom, 'ourroom')
    if (!ourRoom) {
      this.props.mentor.chat(() => {
        console.log('successful chat')
      })
    } else {
      this.startVideoCall(ourRoom)
    }
  }
  startVideoCall (room) {
    navigator.mediaDevices.getUserMedia({audio: true, video: true}).then((stream) => {
      room.videoChat(stream).addListener('update', (av) => {
        // launch video window here
        /* Only process the Av instance if it has remote media */
        console.log('AV >>>>', av)
        console.log(Object.keys(av.remoteMedia)[0], '<<<< object keys')
        this.props.changeState({showModal: true})

        if (!Object.keys(av.remoteMedia).length) {
          console.log('av.remotemedia not object', typeof av.remoteMedia, typeof av.remoteMedia[0])
          return
        }
        const streamio = av.remoteMedia[Object.keys(av.remoteMedia)[0]]
        console.log(streamio, '<<<< STREAMIO')

        if (streamio.status === 'connected') {
          console.log('3 remote media is connected')
          /* Create a new video tag to play/display the remote media */
          const video = document.getElementById('video')
          // following line from adapterjs (close to vanilla webrtc)
          attachMediaStream(video, streamio) // eslint-disable-line
          video.play()
          this.props.processFeed(av, room)
        }
      })
    })
  }
  render () {
    return (
      <div className='profile-bar'>
        <div className='profile-image'>
          <img src={this.props.imgUrl}/>
        </div>
        <p className='mentor-title'>{this.props.username}</p>
        <img
          src='https://files.gitter.im/andrewMacmurray/2W0u/phone.png'
          className='call availble'
          onClick={this.onClickFunc}
        />
        <div className={'online-status ' + this.props.mentorStatus} >
        </div>
      </div>
    )
  }
}

export default MentorItem
