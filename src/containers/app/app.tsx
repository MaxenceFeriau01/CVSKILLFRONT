import { ReactQueryDevtools } from "react-query/devtools"
import { QueryClient, QueryClientProvider } from "react-query"
import { createTheme, ThemeProvider } from "@mui/material/styles"

import { pdfjs } from "react-pdf"
import Header from "../../components/header/header"
import Sidebar from "../../components/sidebar/sidebar"
import routes from "../../routes/routes"
import ShowSidebarProvider from "../../contexts/showSidebarProvider"
import variables from "../../resources/scss/base.module.scss"
import Footer from "../../components/footer/footer"
import UserProvider from "../../contexts/UserProvider"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const theme = createTheme({
	palette: {
		primary: {
			main: variables.colorPrimary,
		},
		secondary: {
			main: variables.colorSecondary,
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
						<div className="overlay" id="overlay">
							<div className="spin overlay-spin" />
						</div>
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
