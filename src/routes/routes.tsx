import { Routes, Route } from "react-router-dom"
import ActivityPage from "../containers/activityPage/activityPage"
import CompanyDetailsPage from "../containers/companyDetailsPage/companyDetailsPage"
import CompanyPage from "../containers/companyPage/companyPage"
import ForbiddenPage from "../containers/forbiddenPage/forbiddenPage"
import HomePage from "../containers/homePage/homePage"
import LoginPage from "../containers/loginPage/loginPage"
import ProfilePage from "../containers/profilePage/profilePage"
import RegistrationPage from "../containers/registrationPage/registrationPage"
import Role from "../enums/Role"
import PrivateRoute from "./privateRoute"

const routes = (
	<Routes>
		<Route path="/" element={<HomePage />} />
		<Route path="/companies" element={<CompanyPage />} />
		<Route path="/company-details/:id" element={<CompanyDetailsPage />} />
		<Route
			path="/new-company"
			element={
				<PrivateRoute roles={[Role.ADMIN, Role.COMPANY]}>
					<CompanyDetailsPage />
				</PrivateRoute>
			}
		/>
		<Route
			path="/activities"
			element={
				<PrivateRoute roles={[Role.ADMIN]}>
					<ActivityPage />
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
		<Route path="/login" element={<LoginPage />} />
		<Route path="/registration" element={<RegistrationPage />} />
		<Route path="*" element={<HomePage />} />
		<Route path="/403" element={<ForbiddenPage />} />
	</Routes>
)

export default routes
