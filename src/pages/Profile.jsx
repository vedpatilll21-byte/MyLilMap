import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {supabase} from "../supabase";
import Navbar from "../components/Navbar";

export default function Profile(){

const navigate = useNavigate();

const [profile,setProfile] = useState(null);
const [message,setMessage] = useState("");



useEffect(()=>{

getProfile();

},[]);



const getProfile = async()=>{

const {
data:{user}
}=await supabase.auth.getUser();



if(!user){

navigate("/login");

return;

}



const {data,error}=await supabase

.from("profiles")

.select("*")

.eq("id",user.id)

.single();



if(error){

console.log(error.message);

return;

}



setProfile(data);


};

const signOut = async()=>{


setMessage(
`You signed out: ${profile?.email}`
);



await supabase.auth.signOut();



setTimeout(()=>{

navigate("/");

},1500);


};





const editProfile = ()=>{

navigate("/edit-profile");

};





return(

<>

<Navbar/>

<style>{`

.profile-page{

min-height:100vh;

padding-top:130px;

display:flex;

justify-content:center;

align-items:flex-start;


background:

linear-gradient(
135deg,
#bc88c4,
#cfc6d6
);


font-family:"Poppins",sans-serif;

}





.profile-container{

width:500px;

padding:40px;

border-radius:35px;


background:

rgba(255,255,255,.35);


border:

1px solid rgba(255,255,255,.5);


backdrop-filter:blur(20px);


-webkit-backdrop-filter:blur(20px);


box-shadow:

0 20px 50px rgba(0,0,0,.12);


text-align:center;

}
.avatar{

width:120px;

height:120px;

border-radius:50%;


display:flex;

align-items:center;

justify-content:center;


font-size:50px;


color:white;


margin:auto;


background:

linear-gradient(
135deg,
#d9b88f,
#bfa6d9
);

}

.profile-container h1{

color:#5b4968;

font-size:32px;

margin-top:25px;

}

.info{

margin-top:30px;

padding:25px;

border-radius:20px;


background:

rgba(255,255,255,.45);


text-align:left;

}

.info h3{

color:#b08d57;

font-size:15px;

margin-bottom:5px;

}

.info p{

color:#5b4968;

font-size:17px;

margin-bottom:20px;

}

.buttons{

display:flex;

justify-content:center;

gap:15px;

margin-top:30px;

}

button{

padding:13px 30px;

border:none;

border-radius:30px;

color:white;

font-size:15px;

cursor:pointer;

}

.edit-btn{

background:

linear-gradient(
135deg,
#d9b88f,
#bfa6d9
);

}

.signout-btn{

background:#c98f9b;

}

button:hover{

opacity:.85;

}



`}</style>

<div className="profile-page">


<div className="profile-container">


<div className="avatar">

👤

</div>


<h1>

{profile?.username || "User"}

</h1>

<div className="info">


<h3>
Name
</h3>

<p>
{profile?.username}
</p>

<h3>
Email
</h3>
<p>
{profile?.email}
</p>
<h3>
Password
</h3>
<p>
••••••••
</p>
</div>
<div className="buttons">
<button

className="edit-btn"

onClick={editProfile}

>

Edit Profile

</button>
<button

className="signout-btn"

onClick={signOut}

>

Sign Out

</button>
</div>
<p>

{message}

</p>
</div>
</div>

</>

)

}