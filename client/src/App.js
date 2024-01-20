import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 // We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Bardtest from "./components/bardtest";
import HomePage from "./pages/home";
// import AuthPage from "./pages/auth";

 const App = () => {
 return (
   <div>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
      integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
      crossorigin="anonymous"
    />
     {/* <Navbar /> */}
     <Routes>
       <Route exact path="/" element={<HomePage />} />
       <Route exact path="/home" element={<HomePage />} />
       <Route exact path="/bard" element={<Bardtest />} />
       <Route exact path="/record" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
     </Routes>
   </div>
 );
};
 export default App;