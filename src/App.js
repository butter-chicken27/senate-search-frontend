import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import LoginButton from "./components/LoginButton";
import Footer from './components/Footer';
import Header from './components/Header';
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
        <Header />
        <main class = "pageBody"> 
          <p className="content">
          <p className="signIn">What is the Senate?</p>
            The Senate comprising all heads of the departments and senior faculty members of the Institute decides the academic policy of the Institute. It controls and approves the curriculum, courses, examinations and results. The teaching, training and research activities of various departments of the Institute are periodically reviewed to improve facilities and maintain standards. 
            <br/><br/>
            <p className="signIn">About the Application</p>
            This application allows you to look through various Senate Documents for the Query or Key Word of your choice to find the top 5 most relavent results from all the Senate Documents in decreasing order of relevance. It requires you to first sign in with your E-Mail ID.
          </p>
          <p className="signIn">Please Sign In</p>
          
          <LoginButton />
        </main>
        <Footer />
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
