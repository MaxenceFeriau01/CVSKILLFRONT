import { ReactQueryDevtools } from "react-query/devtools"
import { QueryClient, QueryClientProvider } from "react-query"
import { createTheme, ThemeProvider } from "@mui/material/styles"

import Header from "../../components/header/header"
import Sidebar from "../../components/sidebar/sidebar"
import routes from "../../routes/routes"
import ShowSidebarProvider from "../../contexts/showSidebarProvider"
import variables from "../../resources/scss/base.module.scss"
import Footer from "../../components/footer/footer"
import UserProvider from "../../contexts/UserProvider"

const theme = createTheme({
	palette: {
		primary: {
			main: variables.colorPrimary,
		},
	},
})

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

function App() {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<UserProvider>
					<ShowSidebarProvider>
						<div className="overlay" id="overlay" />
						<div className="app">
							<Header />
							<main className="app-container">
								<Sidebar />
								{routes}
							</main>
							<Footer />
						</div>
					</ShowSidebarProvider>
				</UserProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</ThemeProvider>
	)
}

export default App
