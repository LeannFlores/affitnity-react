import { BrowserRouter, Routes, Route } from "react-router-dom";

// import all page screens

import Home from "./pages-screens/Home";
import Login from "./auth-screens/loginTwo";
import Register from "./auth-screens/registerTwo";
import UserPlan from "./pages-screens/userPlan";
import TestAxios from "./test-screens/TestAxios";
import TestGetExercises from "./test-screens/TestGetExercises";

export default function PageRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/loginTwo" element={<Login></Login>}></Route>
          <Route path="/registerTwo" element={<Register></Register>}></Route>
          <Route path="/userPlan" element={<UserPlan></UserPlan>}></Route>

          {/* test routes */}
          <Route path="/test-post" element={<TestAxios></TestAxios>}></Route>
          <Route path="/test-get-exercises" element={<TestGetExercises></TestGetExercises>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
