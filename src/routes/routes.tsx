import { Routes, Route } from "react-router-dom"
import ActivityAdminPage from "../containers/admin/activityAdminPage/activityAdminPage"
import CompanyDetailsPage from "../containers/companyDetailsPage/companyDetailsPage"
import CompanyPage from "../containers/companyPage/companyPage"
import ForbiddenPage from "../containers/forbiddenPage/forbiddenPage"
import HomePage from "../containers/homePage/homePage"
import JobAdminPage from "../containers/admin/jobAdminPage/jobAdminPage"
import CompanyAdminPage from "../containers/admin/companyAdminPage/companyAdminPage"
import LoginPage from "../containers/loginPage/loginPage"
import ProfilePage from "../containers/profilePage/profilePage"
import RegistrationPage from "../containers/registrationPage/registrationPage"
import Role from "../enums/Role"
import PrivateRoute from "./privateRoute"
import UserAdminPage from "../containers/admin/userAdminPage/userAdminPage"
import ForgotPassword from "../containers/forgotPasswordPage/forgotPasswordPage"
import ResetPassword from "../containers/resetPasswordPage/resetPasswordPage"
import StatisticsGeneralPage from "../containers/statistics/statisticsGeneralPage"
import StatisticsJobPage from "../containers/statistics/statisticsJobPage"
import StatisticsIndividualPage from "../containers/statistics/statisticsIndividualPage"
import EventAdminPage from "../containers/admin/eventAdminPage/eventAdminPage"
import EventAdminForm from "../containers/admin/eventAdminPage/eventAdminForm/eventAdminForm"
import EventPage from "../containers/eventPage/eventPage"

const routes = (
	<Routes>
		<Route path="/" element={<HomePage />} />
		<Route path="/companies" element={<CompanyPage />} />
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
		<Route path="/login" element={<LoginPage />} />
		<Route path="/forgot-password" element={<ForgotPassword />} />
		<Route path="/:token/reset-password" element={<ResetPassword />} />
		<Route path="/registration" element={<RegistrationPage />} />
		<Route path="*" element={<HomePage />} />
		<Route path="/403" element={<ForbiddenPage />} />
	</Routes>
)

export default routes
