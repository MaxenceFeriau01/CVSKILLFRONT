import { TextField, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Activity from '../../api/models/activity';
import activityService from '../../api/services/activityService';


function ActivityEditPage() {
    const { id } = useParams();
    const isEditMode = !!id;
    const [activityName, setActivityName] = useState<string>('');
    const navigate = useNavigate();

    let activity: Activity;

    useEffect(() => {
        if (isEditMode)
            activityService.getById(id)
                .then(res => (setActivityName(res.name)))
        else
            setActivityName('')
    }, []);

    const onChange = (evt: any) => {
        evt.preventDefault();

        setActivityName(evt.target.value)
    }

    const onSubmit = (evt: any) => {
        evt.preventDefault()

        const act: Activity = {
            id: isEditMode ? id : -1,
            name: activityName
        } 

        if (isEditMode)
            activityService.post(act)
                .then(() => {
                    navigate('/activities')
                })
        else
            activityService.put(act, act.id)
                .then(() => {
                    navigate('/activities')
                })
    }

    return (
        <div>
            <h4>{isEditMode ? `Modifier l'activité ID=${id}` : 'Ajouter une activité'}</h4>
            <form onSubmit={onSubmit}>

                <TextField id="activityName" label="Nom de l'activité" onChange={onChange} value={activityName} placeholder="Entrez le nom de l'activité" style={{ width: 300 }} />

                <Button type="submit" size="large">Valider</Button>
            </form>
        </div>
    );
};

export default ActivityEditPage;
