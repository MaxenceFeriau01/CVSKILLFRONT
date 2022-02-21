import { Routes, Route } from "react-router-dom"
import CompanyDetailsPage from "../containers/companyDetailsPage/companyDetailsPage"
import CompanyPage from "../containers/companyPage/companyPage"
import ForbiddenPage from "../containers/forbiddenPage/forbiddenPage"
import HomePage from "../containers/homePage/homePage"
import LoginPage from "../containers/loginPage/loginPage"
import RegistrationPage from "../containers/registrationPage/registrationPage"
import { ROLE } from "../utils/rights"
import PrivateRoute from "./privateRoute"

const routes = (
	<Routes>
		<Route
			path="/"
			element={
				<PrivateRoute>
					<HomePage />
				</PrivateRoute>
			}
		/>
		<Route path="/companies" element={<CompanyPage />} />
		<Route path="/company-details/:id" element={<CompanyDetailsPage />} />
		<Route
			path="/new-company"
			element={
				<PrivateRoute roles={[ROLE.ADMIN, ROLE.COMPANY]}>
					<CompanyDetailsPage />
				</PrivateRoute>
			}
		/>
		<Route path="/login" element={<LoginPage />} />
		<Route path="/registration" element={<RegistrationPage />} />
		<Route
			path="*"
			element={
				<PrivateRoute roles={[ROLE.ADMIN]}>
					<HomePage />
				</PrivateRoute>
			}
		/>
		<Route path="/403" element={<ForbiddenPage />} />
	</Routes>
)

export default routes
