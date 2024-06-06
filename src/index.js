import React, { createContext } from 'react';
import ReactDOM from "react-dom";
import App from "./App";
import User from './data/User';

export const Context = createContext(null)

ReactDOM.render(
	<Context.Provider value={{
		user: new User(),
	}}>
		<App />
	</Context.Provider >,
	document.getElementById('root')
);