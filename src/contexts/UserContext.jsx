import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { isPast } from "date-fns";

import { jwtDecode } from "jwt-decode";
const UserContext = createContext();

// https://kiwitter-node-77f5acb427c1.herokuapp.com/api-docs/#/Auth/post_users_signup
const instance = axios.create({
	baseURL: 'https://kiwitter-node-77f5acb427c1.herokuapp.com',
	timeout: 5000,
	headers: { 'costum': 'data' }
});
// https://kiwitter-node-77f5acb427c1.herokuapp.com/

// 6hours 
const millisecondsInSixHours = 6 * 60 * 60 * 1000;

// create a provider component
export default function UserProvider({ children }) {
	const [userToken, setUserToken] = useLocalStorage("user", {});
	const [userInfo, setUserInfo] = useState({})
	const isLoggedIn = Boolean(userToken.token);

	useEffect(() => {
		if (userToken.token) {
			const decoded = jwtDecode(userToken?.token);
			if (isPast(decoded.exp * 1000)) {
				handleLogout()
			} else {
				setUserInfo(decoded)
			}
		}
	}, [userToken])

	const history = useHistory();
	function handleLogin(data) {
		console.log(data, "---");

		instance.post('/login', data)
			.then(function (response) {
				console.log(response);
				setUserToken(response.data);
				history.push('/');
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	function handleSignup(data) {
		instance.post('/users/signup', data)
			.then(function (response) {
				console.log(response);
				history.push('/login');
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	function handleLogout() {
		setUserToken({});
	}

	return (
		<UserContext.Provider value={{ userToken, userInfo, isLoggedIn, handleLogin, handleLogout, handleSignup }}>
			{children}
		</UserContext.Provider>
	);

}

export function useUser() {
	return useContext(UserContext);
}