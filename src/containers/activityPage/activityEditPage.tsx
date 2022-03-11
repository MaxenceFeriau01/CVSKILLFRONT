import { TextField, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Activity from '../../api/models/activity';
import activityService from '../../api/services/activityService';


function ActivityEditPage() {
    const { id } = useParams();
    const isEditMode = !!id;
    const [activity, setActivity] = useState<Activity>({
        id: -1, name: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditMode)
            activityService.getById(id)
                .then(res => (setActivity(res)))
    }, []);

    const onChange = (evt: any) => {
        evt.preventDefault();

        const act = {
            id: activity.id,
            name: evt.target.value
        }

        setActivity(act)
    }

    const onSubmit = (evt: any) => {
        evt.preventDefault()

        if (!isEditMode)
            activityService.post(activity)
                .then(() => {
                    navigate('/activities')
                })
        else
            activityService.put(activity, activity.id)
                .then(() => {
                    navigate('/activities')
                })
    }

    const delActivity = (evt: any) => {
        evt.preventDefault()

        if (isEditMode)
            activityService.delete(activity.id)
                .then(() => {
                    navigate('/activities')
                })
    }

    return (
        <div className="page activity-details-page">
            <h4>{isEditMode ? `Modifier l'activité ID=${id}` : 'Ajouter une activité'}</h4>
            <form onSubmit={onSubmit} className="content activity-details-form">

                <TextField id="activityName" className="activity-name-sp" label="Nom de l'activité" onChange={onChange} value={activity.name} placeholder="Entrez le nom de l'activité" style={{ width: 300 }} />

                <Button type="submit" className="activity-name-sp btn-submit" variant="contained" size="large">Valider</Button>
                {
                    isEditMode ?
                    (<Button type="button" className="activity-name-sp" variant="contained" color="error" size="large" onClick={delActivity}>Supprimer</Button>) :
                    ''
                }

                <Button type="button" color="info" size="large" onClick={() => (navigate('/activities'))}>
                    Retour à la liste des activités
                </Button>
            </form>
        </div>
    );
};

export default ActivityEditPage;
