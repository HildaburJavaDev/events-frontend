import { CABINET_ROUTE, EVENT_ROUTE, LOGIN_ROUTE, MEMBERS_ROUTE, REGISTRATION_ROUTE } from "./utils/consts";
import Cabinet from "./pages/Cabinet";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import EventPage from "./pages/EventPage";
import EventDetails from "./pages/EventDetails";

export const authRoutes = [
	{
		path: CABINET_ROUTE,
		Component: Cabinet
	},
	{
		path: EVENT_ROUTE,
		Component: EventPage
	},
	{
		path: MEMBERS_ROUTE,
		Component: EventDetails
	}
]

export const publicRoutes = [
	{
		path: REGISTRATION_ROUTE,
		Component: Registration
	},
	{
		path: LOGIN_ROUTE,
		Component: Login
	}
]
