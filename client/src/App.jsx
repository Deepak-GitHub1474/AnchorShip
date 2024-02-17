import { Route, Routes } from "react-router-dom"
import Header from "./components/Header/Header"
import LandingPage from "./components/LandingPage/LandingPage"
import UserProfile from "./components/UserProfile/UserProfile"
import Register from "./components/RegisterLogin/RegisterLogin"
import InternshipPage from "./components/InternshipPage/InternshipPage"
import PageNotFound from "./components/PageNotFound/PageNotFound"
import AppliedInternshipList from "./components/InternshipPage/AppliedInternshipList/AppliedInternshipList"

function App() {

  return (
    < >
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/register/login" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/internship" element={<InternshipPage />} />
        <Route path="/internship/list" element={<AppliedInternshipList />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
