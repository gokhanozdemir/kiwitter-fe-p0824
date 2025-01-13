import { createContext, useState } from "react";
const UserContext = createContext();
// create a provider component
export default function UserProvider({ children }) {
	const [userInfo, setUserInfo] = useState({});

	function handleLogin(data) {
		console.log(data, "---");
	}

	function handleLogout() {
		setUserInfo({});
	}

	return (
		<UserContext.Provider value={{ userInfo }}>
			{children}
		</UserContext.Provider>
	);

}