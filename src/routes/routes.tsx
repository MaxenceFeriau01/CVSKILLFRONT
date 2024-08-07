import { Route, Routes } from "react-router-dom"
import ActivityAdminPage from "../containers/admin/activityAdminPage/activityAdminPage"
import CompanyAdminPage from "../containers/admin/companyAdminPage/companyAdminPage"
import EventAdminForm from "../containers/admin/eventAdminPage/eventAdminForm/eventAdminForm"
import EventAdminPage from "../containers/admin/eventAdminPage/eventAdminPage"
import JobAdminPage from "../containers/admin/jobAdminPage/jobAdminPage"
import UserAdminPage from "../containers/admin/userAdminPage/userAdminPage"
import CompanyDetailsPage from "../containers/companyDetailsPage/companyDetailsPage"
import CompanyPage from "../containers/companyPage/companyPage"
import PageAcceuil from "../containers/cv-skill/pageAcceuil"
import PoleAtouts from "../containers/cv-skill/poleAtouts"
import Cvskillpage from "../containers/cv-skill/poleCivilite"
import PoleInterets from "../containers/cv-skill/poleInterets"
import PolePersonnalite from "../containers/cv-skill/polePersonalite"
import PolePersonnalite2 from "../containers/cv-skill/PolePersonnalite2"
import EventPage from "../containers/eventPage/eventPage"
import ForbiddenPage from "../containers/forbiddenPage/forbiddenPage"
import ForgotPassword from "../containers/forgotPasswordPage/forgotPasswordPage"
import HomePage from "../containers/homePage/homePage"
import LoginPage from "../containers/loginPage/loginPage"
import OfferPage from "../containers/offerPage/offerPage"
import ProfilePage from "../containers/profilePage/profilePage"
import RegistrationPage from "../containers/registrationPage/registrationPage"
import ResetPassword from "../containers/resetPasswordPage/resetPasswordPage"
import StatisticsGeneralPage from "../containers/statistics/statisticsGeneralPage"
import StatisticsIndividualPage from "../containers/statistics/statisticsIndividualPage"
import StatisticsJobPage from "../containers/statistics/statisticsJobPage"
import Role from "../enums/Role"
import PrivateRoute from "./privateRoute"

const routes = (
	<Routes>
		<Route path="/" element={<HomePage />} />
		<Route path="/companies" element={<CompanyPage />} />
		<Route
			path="/offers"
			element={
				<PrivateRoute roles={[Role.USER]}>
					<OfferPage />
				</PrivateRoute>
			}
		/>
		<Route
			path="/events"
			element={
				<PrivateRoute roles={[Role.ADMIN, Role.COMPANY, Role.USER]}>
					<EventPage />
				</PrivateRoute>
			}
		/>
		<Route
			path="/company-details/:id"
			element={
				<PrivateRoute roles={[Role.ADMIN, Role.COMPANY]}>
					<CompanyDetailsPage />
				</PrivateRoute>
			}
		/>
		<Route
			path="/new-company"
			element={
				<PrivateRoute roles={[Role.ADMIN, Role.COMPANY]}>
					<CompanyDetailsPage />
				</PrivateRoute>
			}
		/>
		<Route
			path="/admin/activities"
			element={
				<PrivateRoute roles={[Role.ADMIN]}>
					<ActivityAdminPage />
				</PrivateRoute>
			}
		/>
		<Route
			path="/admin/jobs"
			element={
				<PrivateRoute roles={[Role.ADMIN]}>
					<JobAdminPage />
				</PrivateRoute>
			}
		/>
		<Route
			path="/admin/events"
			element={
				<PrivateRoute roles={[Role.ADMIN]}>
					<EventAdminPage />
				</PrivateRoute>
			}
		/>
		<Route
			path="/admin/new-event"
			element={
				<PrivateRoute roles={[Role.ADMIN]}>
					<EventAdminForm />
				</PrivateRoute>
			}
		/>
		<Route
			path="/admin/events/:id"
			element={
				<PrivateRoute roles={[Role.ADMIN]}>
					<EventAdminForm />
				</PrivateRoute>
			}
		/>
		<Route
			path="/admin/companies"
			element={
				<PrivateRoute roles={[Role.ADMIN]}>
					<CompanyAdminPage />
				</PrivateRoute>
			}
		/>
		<Route
			path="/admin/users"
			element={
				<PrivateRoute roles={[Role.ADMIN]}>
					<UserAdminPage />
				</PrivateRoute>
			}
		/>
		<Route
			path="/statistics/general"
			element={
				<PrivateRoute roles={[Role.ADMIN]}>
					<StatisticsGeneralPage />
				</PrivateRoute>
			}
		/>
		<Route
			path="/statistics/individual"
			element={
				<PrivateRoute roles={[Role.ADMIN]}>
					<StatisticsIndividualPage />
				</PrivateRoute>
			}
		/>
		<Route
			path="/statistics/job"
			element={
				<PrivateRoute roles={[Role.ADMIN]}>
					<StatisticsJobPage />
				</PrivateRoute>
			}
		/>
		<Route
			path="/my-profile"
			element={
				<PrivateRoute>
					<ProfilePage />
				</PrivateRoute>
			}
		/>

		<Route
			path="/user-details/:id"
			element={
				<PrivateRoute roles={[Role.ADMIN]}>
					<ProfilePage />
				</PrivateRoute>
			}
		/>
		<Route
			path="/cvskill/pageAcceuil"
			element={
				<PrivateRoute roles={[Role.ADMIN, Role.USER]}>
					<PageAcceuil/>
				</PrivateRoute>
			}
			/>
		<Route
			path="/cvskill/poleCivilite"
			element={
				<PrivateRoute roles={[Role.ADMIN, Role.USER]}>
					<Cvskillpage/>
				</PrivateRoute>
			}
			/>
			<Route
			path="/cvskill/polePersonnalite"
			element={
				<PrivateRoute roles={[Role.ADMIN, Role.USER]}>
					<PolePersonnalite/>
				</PrivateRoute>
			}
			/>
			<Route
			path="/cvskill/poleAtouts"
			element={
				<PrivateRoute roles={[Role.ADMIN, Role.USER]}>
					<PoleAtouts/>
				</PrivateRoute>
			}
			/>
			<Route
			path="/cvskill/poleInterets"
			element={
				<PrivateRoute roles={[Role.ADMIN, Role.USER]}>
					<PoleInterets/>
				</PrivateRoute>
			}
			/>
			<Route
			path="/cvskill/polePersonnalite2"
			element={
				<PrivateRoute roles={[Role.ADMIN, Role.USER]}>
					<PolePersonnalite2/>
				</PrivateRoute>
			}
			/>
		
		<Route path="/login" element={<LoginPage />} />
		<Route path="/forgot-password" element={<ForgotPassword />} />
		<Route path="/:token/reset-password" element={<ResetPassword />} />
		<Route path="/registration" element={<RegistrationPage />} />
		<Route path="*" element={<HomePage />} />
		<Route path="/403" element={<ForbiddenPage />} />
	</Routes>
)

export default routes
