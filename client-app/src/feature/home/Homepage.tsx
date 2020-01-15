import React from 'react'
import { Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default function Homepage() {
    return (
       <Container style={{marginTop:'7em'}}>
           <h1> Home Page </h1>
           <h3>Go <Link to={'/activities'}>Activities</Link> </h3>
       </Container>
    )
}
