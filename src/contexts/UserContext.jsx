import axios from "axios";
import { createContext, useState, useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useLocalStorage } from "../hooks/useLocalStorage";
const UserContext = createContext();



// create a provider component
export default function UserProvider({ children }) {
	const [userInfo, setUserInfo] = useLocalStorage("user", {});
	/* // Sample Login Response 
	{
		"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3MzY3OTAxMDksImV4cCI6MTczNjc5MDI4OX0.eD8C-iYj4qpoEgMD1DXukyX1GNi7WNOqDZLQOss_oyM",
		"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3MzY3OTAxMDksImV4cCI6MTczOTM4MjEwOX0.u7X9m0dqhj3bXnSFbaWHKe90AgV-nhras6PdydTb1xg",
		"id": 1,
		"username": "emilys",
		"email": "emily.johnson@x.dummyjson.com",
		"firstName": "Emily",
		"lastName": "Johnson",
		"gender": "female",
		"image": "https://dummyjson.com/icon/emilys/128"
	}
	
	*/
	const isLoggedIn = Boolean(userInfo.accessToken);

	const history = useHistory();
	function handleLogin(data) {
		console.log(data, "---");

		axios.post('https://dummyjson.com/auth/login', data)
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
		axios.post('https://dummyjson.com/users/add', data)
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