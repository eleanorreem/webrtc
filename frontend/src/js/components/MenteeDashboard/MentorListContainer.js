import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import MentorCallBox from './MentorCallBox.js'

export default (props) => {
  return (
    <div>
      <Grid className='mentor-list'>
        <Row className='mentor-list-navbar'>
          <Col xs={1}/>
          <Col xs={3}>
            <p className='navbar-items'> previous mentors </p>
          </Col>
          <Col xs={3}>
            <p className='navbar-items'> suggested mentors </p>
          </Col>
          <Col xs={4}/>
          <Col xs={1}>
            <img
              src='https://files.gitter.im/andrewMacmurray/cBwm/search.png'
              className='search-icon'
            />
          </Col>
        </Row>
        {props.mentors.map((mentor) => {
          return (
            <Row>
              <Col xs={1}/>
              <Col xs={10}>
                <MentorCallBox
                  imgUrl={mentor.imgUrl}
                  mentorName={mentor.mentorName}
                  mentorStatus={mentor.mentorStatus}
                />
              </Col>
              <Col xs={1}/>
            </Row>
          )
        })
      }
      </Grid>
    </div>
  )
}
