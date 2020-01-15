import React, { useState, FormEvent, useContext, useEffect} from 'react'
import { Segment, Form, Button, Grid } from 'semantic-ui-react'
import { IActivity } from '../../../app/Models/Activity'
import {v4 as uuid } from 'uuid'
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps } from 'react-router-dom'

interface DetailParams{
    id:string;
}

const ActivityFrom: React.FC<RouteComponentProps<DetailParams>> =({
    match,
    history
    })=> {
    const activityStore = useContext(ActivityStore);
    const {
        createActivity,
        editActivity,
        submitting,
        cancelOpenForm, 
        activity:InitialFormState,
        loadActivity,
        clearActivity
    } = activityStore;

    const [activity, setActivity] = useState<IActivity> ({
        id:'',
        title:'',
        category:'',
        description:'',
        myproperty:'',
        date:'',
        city:'',
        venue:''
    });

    useEffect(() => {
        if(match.params.id && activity.id.length ===0)
        {
            loadActivity(match.params.id).then(()=> InitialFormState && setActivity(InitialFormState));
        }
        return() =>{
         clearActivity()
        }
     },[loadActivity,clearActivity,match.params.id,InitialFormState,activity.id.length])

     
    const handleSubmit =() =>{
        if(activity.id.length===0)
        {
            let newactivity ={
                ...activity,
                id:uuid()
                };
                createActivity(newactivity).then(()=> history.push(`/activities/${newactivity.id}`));
        }
        else
        {
            editActivity(activity).then(()=> history.push(`/activities/${activity.id}`));
        }
    }
    const handleInputChange = (event:FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value} = event.currentTarget;
        setActivity({...activity,[name]:value });
    }

    return (
        <Grid>
        <Grid.Column width={10}>
            <Segment clearing>
                <Form onSubmit={handleSubmit}>
                    <Form.Input  onChange={handleInputChange} name='title' placeholder='Title' value={activity.title} ></Form.Input>
                    <Form.TextArea  onChange={handleInputChange} name='description'  rows={2} placeholder='Description' value={activity.description} ></Form.TextArea>
                    <Form.Input  onChange={handleInputChange} name='category' placeholder='Category' value={activity.category} ></Form.Input>
                    <Form.Input  onChange={handleInputChange} name='date' placeholder='Date' type='datetime-local' value={activity.date} ></Form.Input>
                    <Form.Input  onChange={handleInputChange} name='city' placeholder='City' value={activity.city} ></Form.Input>
                    <Form.Input  onChange={handleInputChange} name='venue' placeholder='Venue' value={activity.venue} ></Form.Input>
                    <Button loading={submitting} floated='right' positive type='Submit' content='Submit'></Button> 
                    <Button 
                        onClick={cancelOpenForm } 
                        floated='right' 
                        type='button' 
                        content='Cancel' 
                    /> 
                </Form>
            </Segment>
        </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityFrom);