import React, { SyntheticEvent } from 'react'
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
    deleteActivity:(event: SyntheticEvent<HTMLButtonElement>, id:string)=>void;
    submitting: boolean;
    target:string
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
    deleteActivity,
    submitting,
    target
   }) => {
            return (
                <Grid>
                    <Grid.Column width={10}>
                        <ActivityList 
                        activities={activities} 
                        selectActivity={selectActivity}
                        deleteActivity={deleteActivity}
                        submitting={submitting}
                        target={target}
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
                        EditActivity={EditActivity}
                        submitting={submitting}/>
                        )}
                    </Grid.Column>
                </Grid>
            );
};
export default ActivityDashboard;