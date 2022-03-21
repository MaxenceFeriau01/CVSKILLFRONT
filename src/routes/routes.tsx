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

const routes = (
	<Routes>
		<Route path="/" element={<HomePage />} />
		<Route path="/companies" element={<CompanyPage />} />
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
		<Route path="/registration" element={<RegistrationPage />} />
		<Route path="*" element={<HomePage />} />
		<Route path="/403" element={<ForbiddenPage />} />
	</Routes>
)

export default routes
