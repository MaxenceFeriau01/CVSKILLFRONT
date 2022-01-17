import { ReactQueryDevtools } from "react-query/devtools"
import { QueryClient, QueryClientProvider } from "react-query"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Header from "../../components/header/header"
import Sidebar from "../../components/sidebar/sidebar"
import routes from "../../routes/routes"
import ShowSidebarProvider from "../../contexts/showSidebarProvider"
import variables from "../../resources/scss/base.module.scss"

const theme = createTheme({
	palette: {
		primary: {
			// light: will be calculated from palette.primary.main,
			main: variables.colorPrimary,
			// dark: will be calculated from palette.primary.main,
			// contrastText: will be calculated to contrast with palette.primary.main
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
				<ShowSidebarProvider>
					<div className="overlay" id="overlay" />
					<div className="app">
						<Header />
						<main className="app-container">
							<Sidebar />
							{routes}
						</main>
					</div>
				</ShowSidebarProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</ThemeProvider>
	)
}

export default App
