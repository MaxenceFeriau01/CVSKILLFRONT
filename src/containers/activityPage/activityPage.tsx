import { Link, TextField } from '@mui/material';
import { useRef } from 'react';
import { useQuery } from 'react-query';
import Activity from '../../api/models/activity';
import ReactSelectOption from '../../api/models/reactSelectOption';
import activityService from '../../api/services/activityService';
import HasRight from '../../components/rights/hasRight';
import Role from '../../enums/Role';
import ActivityTile from './activityTile';

function ActivityPage() {

    const activities = useQuery("activities", () =>
		activityService
			.getAllWithFilters()
	)

    return (
        <section className="page activity-page">
			<header className="activity-page-header">
                <TextField id="searchActivityName" label="Rechercher une activité par nom" style={{ width: 300 }} size="small" />
            </header>
            <section className="content activity-container">
				<div className="activity-list-content">
                    <Link href="/activity/new" className="activity-tile activity-tile--add">
						<span>+</span>
						<b>Créer une activité</b>
					</Link>
                    {activities?.data?.map((a: Activity) => (<div>
                        <ActivityTile key={a.id} activity={a} />
                    </div>))}
                </div>
            </section>
        </section>
    );

}

export default ActivityPage;