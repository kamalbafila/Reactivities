import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'

interface IProps{
    openCreateFrom: () => void;
}

const NavBar: React.FC<IProps> = ({openCreateFrom}) => {
    return (
        <Menu fixed='top' inverted>
        <Container>
            <Menu.Item header>
                <img  src ="/assets/logo.png" alt="logo" style={{marginRight:'10px'}}></img>
                Reactivities
            </Menu.Item>
            <Menu.Item name='Activities'/>
            <Menu.Item >
                <Button onClick={openCreateFrom} positive content="Create Activity"/>
            </Menu.Item>
        </Container>
        </Menu>
    )
}

export default NavBar;