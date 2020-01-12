import React from 'react'
import { Grid } from 'semantic-ui-react'
import { IActivity } from '../../../app/Models/Activity'
import { ActivityList } from './ActivityList';
import { ActivityDetails } from '../details/ActivityDetails';
import { ActivityFrom } from '../from/ActivityFrom';

interface IProps{
    activities:IActivity[];
    selectActivity:(id:string)=>void;
    selectedActivity:IActivity | null;
    editMode: boolean;
    setEditMode:(editmode:boolean) => void;
    setSelectedActivity:(activity:IActivity | null) => void;
    createActivity:(activity:IActivity | null) => void;
    EditActivity:(activity:IActivity | null) => void;
    deleteActivity:(id:string)=>void;
}

const ActivityDashboard: React.FC<IProps> = ({
    activities,
    selectActivity,
    selectedActivity,
    editMode,
    setEditMode,
    setSelectedActivity,
    createActivity,
    EditActivity,
    deleteActivity
   }) => {
            return (
                <Grid>
                    <Grid.Column width={10}>
                        <ActivityList 
                        activities={activities} 
                        selectActivity={selectActivity}
                        deleteActivity={deleteActivity}
                        ></ActivityList>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        {selectedActivity && !editMode && 
                        <ActivityDetails activity={selectedActivity} setEditMode ={setEditMode} setSelectedActivity={setSelectedActivity}></ActivityDetails>}
                        {editMode && (
                        <ActivityFrom 
                        key ={(selectedActivity &&  selectedActivity.id) ||0}
                        setEditMode={setEditMode}  
                        activity={selectedActivity!}
                        createActivity={createActivity} 
                        EditActivity={EditActivity}/>
                        )}
                    </Grid.Column>
                </Grid>
            );
};
export default ActivityDashboard;