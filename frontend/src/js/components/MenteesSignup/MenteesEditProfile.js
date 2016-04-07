import React from 'react'
import {Input, Grid, Row, Col, ButtonInput} from 'react-bootstrap'

export default () => {
  return (
    <Grid>
      <Row>
        <Col xs={2}/>
        <Col xs={8}>
          <form action='/save-mentor-profile'>
            <h2>Mentee Profile Page</h2>
            <h4>Fill in your details</h4>
            <Input id='username' type='text' placeholder='username' required/>
            <Input id='password' type='password' placeholder='password' required/>
            <Input id='confirm-password' type='password' placeholder='confirm-password' required/>
            <Input id='firstname' type='text' placeholder='first name' required />
            <Input id='lastname' type='text' placeholder='last name' required />
            <Input id='gender' type='text' placeholder='gender' required/>
            <Input id='age' type='text' placeholder='age' required/>
            <Input id='profession' type='text' placeholder='profession' required/>
            <Input id='topics' type='textarea' placeholder='topics' required/>
            <Input id='about-me' type='textarea' placeholder='about me' required/>
            <ButtonInput type='submit' value='save details'/>
          </form>
        </Col>
        <Col xs={2}/>
      </Row>
    </Grid>
  )
}