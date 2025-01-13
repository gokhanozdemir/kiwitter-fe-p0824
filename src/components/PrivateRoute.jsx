// https://v5.reactrouter.com/web/example/auth-workflow
// A wrapper for <Route> that redirects to the login

import { Redirect, Route } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  let { isLoggedIn } = useUser(); // kendi contextime göre özelleştirdim.
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? ( // eğer kullanıcı login değilse yönlendir
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
