import React, { useState, FormEvent} from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/Models/Activity'
import {v4 as uuid } from 'uuid'

interface IProps{
    setEditMode:(editmode:boolean) => void;
    activity :IActivity
    createActivity:(activity:IActivity | null) => void;
    EditActivity:(activity:IActivity | null) => void;
}



export const ActivityFrom: React.FC<IProps> =({
    setEditMode,
    activity : InitialFormState,
    createActivity,
    EditActivity
    })=> {
    const intializeForm =() => {
        if(InitialFormState){
            return InitialFormState
        }
        else
        {
            return {
                id:'',
                title:'',
                category:'',
                description:'',
                myproperty:'',
                date:'',
                city:'',
                venue:''
            }
        }
    }

    const [activity, setActivity] = useState<IActivity> (intializeForm)
    const handleSubmit =() =>{
        if(activity.id.length===0)
        {
            let newactivity ={
                ...activity,
                id:uuid()
                }
                createActivity(newactivity)
        }
        else
        {
            EditActivity(activity);
        }
    }
    const handleInputChange = (event:FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value} = event.currentTarget;
        setActivity({...activity,[name]:value });
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input  onChange={handleInputChange} name='title' placeholder='Title' value={activity.title} ></Form.Input>
                <Form.TextArea  onChange={handleInputChange} name='description'  rows={2} placeholder='Description' value={activity.description} ></Form.TextArea>
                <Form.Input  onChange={handleInputChange} name='category' placeholder='Category' value={activity.category} ></Form.Input>
                <Form.Input  onChange={handleInputChange} name='date' placeholder='Date' type='datetime-local' value={activity.date} ></Form.Input>
                <Form.Input  onChange={handleInputChange} name='city' placeholder='City' value={activity.city} ></Form.Input>
                <Form.Input  onChange={handleInputChange} name='venue' placeholder='Venue' value={activity.venue} ></Form.Input>
                <Button floated='right' positive type='Submit' content='Submit'></Button> 
                <Button onClick={()=> setEditMode(false)} floated='right' type='button' content='Cancel'></Button> 
            </Form>
        </Segment>
    )
}

