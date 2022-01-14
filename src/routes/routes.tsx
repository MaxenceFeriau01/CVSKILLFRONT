import { Routes, Route } from "react-router-dom"
import CompanyDetailsPage from "../containers/companyDetailsPage/companyDetailsPage"
import CompanyPage from "../containers/companyPage/companyPage"
import HomePage from "../containers/homePage/homePage"

const routes = (
	<Routes>
		<Route path="/" element={<HomePage />} />
		<Route path="/companies" element={<CompanyPage />} />
		<Route path="/company-details/:id" element={<CompanyDetailsPage />} />
		<Route path="/new-company" element={<CompanyDetailsPage />} />
	</Routes>
)

export default routes
