import {observable, action, computed, configure, runInAction} from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../Models/Activity';
import agent from '../api/agent';

configure({enforceActions: 'always'})

class ActivityStore
{
    @observable activityRegistry = new Map();
    @observable activities:IActivity[]=[];
    @observable loadingInitial=false;
    @observable activity:IActivity | null = null;
    @observable editMode =false;
    @observable submitting =false;
    @observable target ='';

    @computed get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a,b) =>Date.parse(a.date) - Date.parse(b.date))     
    }

    @action loadactivities = async() =>{
        this.loadingInitial=true;
        try
        {
            const activities = await agent.Activities.list();
            runInAction('load activities', ()=>{
                activities.forEach((activity: IActivity) =>{
                    activity.date=activity.date.split('.')[0];
                    this.activityRegistry.set(activity.id,activity);
                });
                this.loadingInitial=false;
            })
        }
        catch(error){
            runInAction('load activities', ()=>{
                this.loadingInitial=false;
            })
            console.log(error);
        }
    }


    @action loadActivity = async (id:string)=>{
        let  activity=this.getActivity(id);
        if (activity){
            this.activity=activity;
        }
        else{
            this.loadingInitial=true;
            try{
                 activity = await  agent.Activities.details(id);
                 runInAction(('Getting Activity'),()=>{
                    this.selectActivity =activity;
                    this.loadingInitial=true;
                 })
            }
            catch(error)
            {
                runInAction(('Error while Getting Activity'),()=>{
                    this.loadingInitial =false;
                })
                console.log(error);
            }
        }
    }

    @action clearActivity =() =>{
        this.activity=null;
    }

    getActivity = (id:string) =>{
        return this.activityRegistry.get(id);
    }

    @action selectActivity =(id:string) =>{
        this.activity =this.activityRegistry.get(id);
        this.editMode =false;
    }

    @action createActivity = async (activity:IActivity)=>{
        this.submitting =true;
        try
        {
           await agent.Activities.create(activity);
           runInAction('create Activity', ()=>{
            this.activityRegistry.set(activity.id,activity);
            this.editMode=false;
            this.submitting=false;
           })
        
        }catch(error)
        {
            runInAction('Create Activity error', ()=>{
                this.submitting=false;
            })
            console.log(error);
        }
    }

    @action openCreateForm =() =>{
        this.editMode=true;
        this.activity = null;
    }


    @action editActivity =async(activity:IActivity)=>{
        this.submitting=true;
        try{
                await  agent.Activities.update(activity);
                runInAction('Edit Activity', ()=>{
                    this.activityRegistry.set(activity.id,activity);
                    this.activity =activity;
                    this.editMode =false;
                    this.submitting=false;
                })
            }catch(error){
                runInAction('Edit Activity error', ()=>{
                    this.submitting=false;
                })
                console.log(error);
            }
    }

    @action openEditForm =(id:string) =>{
        this.activity = this.activityRegistry.get(id);
        this.editMode=true;
    }

    @action cancelSelectedActivity =() =>{
        this.activity = null;
    }

    @action cancelOpenForm =() =>{
        this.editMode=false;
    }

    @action deleteActivity= async(event:SyntheticEvent< HTMLButtonElement>, id:string)=>{
        this.submitting=true;
        this.target = event.currentTarget.name;
        try{
            await agent.Activities.delete(id);
            runInAction('Delete Activity', ()=>{
                this.activityRegistry.delete(id);
                this.submitting = false;
                this.target='';
            })
            }
        catch(error)
        {
            runInAction('Delete Activity error', ()=>{
                this.submitting = false;
                this.target='';
            })
            console.log(error);
        }
    }
}

export default createContext(new  ActivityStore())