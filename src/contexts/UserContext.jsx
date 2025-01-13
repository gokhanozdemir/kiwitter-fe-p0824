import axios from "axios";
import { createContext, useState, useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const UserContext = createContext();



// create a provider component
export default function UserProvider({ children }) {


	const [userInfo, setUserInfo] = useState({});

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
		<UserContext.Provider value={{ userInfo, handleLogin, handleLogout, handleSignup }}>
			{children}
		</UserContext.Provider>
	);

}

export function useUser() {
	return useContext(UserContext);
}