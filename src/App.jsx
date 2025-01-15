import "./App.css";
import { Switch, Route } from "react-router-dom";
import PageLayout from "./PageLayout";
import Login from "./Login";
import Signup from "./Signup";
import PrivateRoute from "./components/PrivateRoute";
import Twit from "./components/Twit";
import { useQuery } from "@tanstack/react-query";
import { instance } from "./contexts/UserContext";
import NewTwit from "./NewTwit";
import { useUser } from "./contexts/UserContext";
function App() {
  const { isLoggedIn } = useUser()
  const { data: twits } = useQuery({
    queryKey: ["mainPageTwits"],
    queryFn: () => instance.get("/twits")
  })
  return (
    <div>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>

        <Route path="/" exact>
          {/* /?variant=most_liked */}
          <PageLayout>
            {isLoggedIn && <NewTwit />}
            <div className="bg-white rounded-xl shadow-xl">
              {twits
                ? twits.data.data.map((twit) => <Twit key={twit.id} item={twit} />)
                : "yükleniyor"}
            </div>
          </PageLayout>
        </Route>
        <PrivateRoute path="/profile/:nick">
          <PageLayout>Profile page</PageLayout>
        </PrivateRoute>
        <Route path="/detail/:twitId">
          <PageLayout>Twit detail</PageLayout>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
