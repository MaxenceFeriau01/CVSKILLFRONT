import React from 'react';
import { Link } from 'react-router-dom';
import EditIcon from "@mui/icons-material/Edit";
import Activity from '../../api/models/activity';
import company from '../../api/models/company';
import HasRight from '../../components/rights/hasRight';
import Role from '../../enums/Role';
import imageUpload from "../../resources/images/image-upload.svg"

interface ActivityProps {
    activity: Activity
}

function ActivityTile({ activity }: ActivityProps) {
    
    return (
        <div className="activity-tile">
            <HasRight roles={[Role.ADMIN]}>
				<Link
					to={`/activities/edit/${activity.id}`}
					className="activity-tile__edit"
					title="Editer l'activité"
				>
					<EditIcon />
				</Link>
			</HasRight>
            <div className="activity-tile__image">
                <img src={imageUpload} alt="Default" />
            </div>
            <span className="activity-tile__postal">
				<b>{activity!.name}</b>
			</span>
        </div>
    );

};

export default ActivityTile;