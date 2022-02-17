import { Routes, Route } from "react-router-dom"
import CompanyDetailsPage from "../containers/companyDetailsPage/companyDetailsPage"
import CompanyPage from "../containers/companyPage/companyPage"
import HomePage from "../containers/homePage/homePage"
import LoginPage from "../containers/loginPage/loginPage"
import RegistrationPage from "../containers/registrationPage/registrationPage"

const routes = (
	<Routes>
		<Route path="/" element={<HomePage />} />
		<Route path="/companies" element={<CompanyPage />} />
		<Route path="/company-details/:id" element={<CompanyDetailsPage />} />
		<Route path="/new-company" element={<CompanyDetailsPage />} />
		<Route path="/login" element={<LoginPage />} />
		<Route path="/registration" element={<RegistrationPage />} />
		<Route path="*" element={<HomePage />} />
	</Routes>
)

export default routes
