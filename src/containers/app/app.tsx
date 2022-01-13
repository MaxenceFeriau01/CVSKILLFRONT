import { ReactQueryDevtools } from "react-query/devtools"
import { QueryClient, QueryClientProvider } from "react-query"
import Header from "../../components/header/header"
import Sidebar from "../../components/sidebar/sidebar"
import routes from "../../routes/routes"
import ShowSidebarProvider from "../../contexts/showSidebarProvider"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ShowSidebarProvider>
				<div className="overlay" id="overlay" />
				<div className="app">
					<Header />
					<main className="app-container">
						<Sidebar />
						<section className="page">{routes}</section>
					</main>
				</div>
			</ShowSidebarProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

export default App
