import React ,{useEffect, Fragment, useContext} from 'react';
import {Container } from 'semantic-ui-react'
import NavBar from '../../feature/nav/NavBar';
import ActivityDashboard from '../../feature/activities/dashboard/ActivityDashboard';
import { LoadingComponent } from './LoadingComponent';
import ActivityStore from '../stores/activityStore'
import {observer} from 'mobx-react-lite'
import { Route,withRouter, RouteComponentProps } from 'react-router-dom';
import ActivityFrom from '../../feature/activities/from/ActivityFrom';
import Homepage from '../../feature/home/Homepage';
import ActivityDetails from '../../feature/activities/details/ActivityDetails';

const App: React.FC<RouteComponentProps> = ({location}) => {
const activityStore = useContext(ActivityStore);

useEffect(() =>{
     activityStore.loadactivities();
     
}, [activityStore]);
  
  if (activityStore.loadingInitial) return (<LoadingComponent content ='Loading Activities..' />)
  
  return (
    <Fragment>
      <Route exact path ='/' component ={Homepage}></Route>
      <Route path ={'/(.+)'} render = {()=>(
          <Fragment>
              <NavBar/>
              <Container style={{marginTop: '7em'}}>
              <Route exact path ='/activities' component ={ActivityDashboard}></Route>
              <Route path ='/activities/:id' component ={ActivityDetails}></Route>
              <Route 
              key={location.key} 
              path ={['/createActivity','/manage/:id']} 
              component ={ActivityFrom}>
              </Route>
              </Container>
          </Fragment>
      )}/>
  
    </Fragment>
  );
}

export default withRouter(observer(App));
