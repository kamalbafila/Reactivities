import React, { useContext } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'
import ActivityStore from '../../app/stores/activityStore'
import { observer } from 'mobx-react-lite';

const NavBar: React.FC = () => {
    const activitystore =useContext(ActivityStore);
    return (
        <Menu fixed='top' inverted>
        <Container>
            <Menu.Item header>
                <img  src ="/assets/logo.png" alt="logo" style={{marginRight:'10px'}}></img>
                Reactivities
            </Menu.Item>
            <Menu.Item name='Activities'/>
            <Menu.Item >
                <Button onClick={activitystore.openCreateForm} positive content="Create Activity"/>
            </Menu.Item>
        </Container>
        </Menu>
    )
}

export default observer(NavBar);