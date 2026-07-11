import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Places from "./pages/Places";
import Destinations from "./pages/Destinations";
import BucketList from "./pages/BucketList";
import Profile from "./pages/Profile";
export default function App(){

return (

<Routes>


<Route 
path="/" 
element={<Landing />} 
/>


<Route 
path="/login" 
element={<Login />} 
/>


<Route 
path="/signup" 
element={<Signup />} 
/>


<Route 
path="/home" 
element={<Home />} 
/>


<Route 
path="/places" 
element={<Places />} 
/>


<Route 
path="/destinations" 
element={<Destinations />} 
/>


<Route 
path="/bucketlist" 
element={<BucketList />} 
/>


<Route 
path="/profile" 
element={<Profile />} 
/>
</Routes>

);

}