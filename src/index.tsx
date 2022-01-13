import ReactDOM from "react-dom"
import "./index.scss"
import { BrowserRouter } from "react-router-dom"
import App from "./containers/app/app"
import "./resources/scss/main.scss"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById("root")
)


