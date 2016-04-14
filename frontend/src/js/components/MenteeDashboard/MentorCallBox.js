import React from 'react'

export default (props) => {
  return (
    <div className='profile-bar'>
      <div className='profile-image'>
        <img src={props.imgUrl}/>
      </div>
      <p className='mentor-title'>{props.mentorName}</p>
      <img
        src='https://files.gitter.im/andrewMacmurray/2W0u/phone.png'
        className='call availble'
      />
      <div className={'online-status ' + props.mentorStatus} >
      </div>
    </div>
  )
}
