import React ,{useEffect, Fragment, useContext} from 'react';
import { List, Container } from 'semantic-ui-react'
import NavBar from '../../feature/nav/NavBar';
import ActivityDashboard from '../../feature/activities/dashboard/ActivityDashboard';
import { LoadingComponent } from './LoadingComponent';
import ActivityStore from '../stores/activityStore'
import {observer} from 'mobx-react-lite'

const App = () => {
const activityStore = useContext(ActivityStore);

useEffect(() =>{
     activityStore.loadactivities();
     
}, [activityStore]);
  
  if (activityStore.loadingInitial) return (<LoadingComponent content ='Loading Activities..' />)
  
  return (
    <Fragment>
      <NavBar/>
      <Container style={{marginTop: '7em'}}>
      <List>
          <ActivityDashboard/>
      </List>
      </Container>
    </Fragment>
  );
}

export default observer(App);
