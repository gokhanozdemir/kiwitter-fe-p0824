import axios from "axios";
import { createContext, useState, useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useLocalStorage } from "../hooks/useLocalStorage";
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
	const [userInfo, setUserInfo] = useLocalStorage("user", {});
	const isLoggedIn = Boolean(userInfo.accessToken);

	const history = useHistory();
	function handleLogin(data) {
		console.log(data, "---");

		instance.post('/login', data)
			.then(function (response) {
				console.log(response);
				setUserInfo(response.data);
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
		setUserInfo({});
	}

	return (
		<UserContext.Provider value={{ userInfo, isLoggedIn, handleLogin, handleLogout, handleSignup }}>
			{children}
		</UserContext.Provider>
	);

}

export function useUser() {
	return useContext(UserContext);
}