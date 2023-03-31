import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import LoginButton from "./components/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const {isAuthenticated, isLoading} = useAuth0();
  if(isLoading){
    return(
      <h2>Loading...</h2>
    )
  }
  if(!isAuthenticated){
    return(
      <div>
        <h1>Please Sign In</h1>
        <LoginButton />
      </div>
    )
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="signin" element={<SignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
