import React ,{useState,useEffect, Fragment} from 'react';
import axios from 'axios';
import { List, Container } from 'semantic-ui-react'
import { IActivity } from '../Models/Activity';
import NavBar from '../../feature/nav/NavBar';
import ActivityDashboard from '../../feature/activities/dashboard/ActivityDashboard';

const App = () => {
const [activities, setActivities] = useState<IActivity[]>([]);
const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null)
const [editMode, setEditMode] = useState(false)

const handleSelectedActivity =(id: string)=>{
  setSelectedActivity(activities.filter(a => a.id===id)[0]);
  setEditMode(false);
}

const handleOpenCreateForm =() =>{
  setSelectedActivity(null);
  setEditMode(true);
}

const handleCreateActivity= (activity:IActivity) =>{
  setActivities([...activities,activity]);
  setSelectedActivity(activity);
  setEditMode(false);
}

const handleEditActivity= (activity:IActivity) =>{
  setActivities([...activities.filter(a => a.id !== activity.id), activity])
  setSelectedActivity(activity);
  setEditMode(false);
}

const handleDeleteActivity= (id:string) =>{
  setActivities([...activities.filter(a => a.id !== id)])
}

useEffect(() =>{
    axios
      .get<IActivity[]>('http://localhost:5000/api/activities')
      .then(response =>{
        let activities: IActivity[]=[];
        response.data.forEach(activity =>{
          activity.date=activity.date.split('.')[0];
          activities.push(activity);
        })
          setActivities(activities)
      });
  },[]);

  return (
    <Fragment>
      <NavBar openCreateFrom={handleOpenCreateForm}/>
      <Container style={{marginTop: '7em'}}>
      <List>
          <ActivityDashboard 
          activities ={activities} 
          selectActivity={handleSelectedActivity}
          selectedActivity={selectedActivity!} 
          editMode ={editMode}
          setEditMode ={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          EditActivity ={handleEditActivity}
          deleteActivity ={handleDeleteActivity}
          ></ActivityDashboard>
      </List>
      </Container>
    </Fragment>
  );
}

export default App;
