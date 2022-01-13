import { Routes, Route } from "react-router-dom"
import CompanyPage from "../containers/companyPage/companyPage"
import HomePage from "../containers/homePage/homePage"

const routes = (
	<Routes>
		<Route path="/" element={<HomePage />} />
		<Route path="/companies" element={<CompanyPage />} />
	</Routes>
)

export default routes
