import React,{useState} from "react";
import {supabase} from "../supabase";
import {Link,useNavigate} from "react-router-dom";


export default function Login(){


const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const [msg,setMsg]=useState("");

const navigate=useNavigate();




const login=async(e)=>{

e.preventDefault();


const {data,error}=await supabase.auth.signInWithPassword({

email:email,

password:password

});



if(error){

setMsg(error.message);

return;

}



setMsg("Welcome back ✨");



setTimeout(()=>{

navigate("/home");

},1000);


};





return(

<>


<style>{`

@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Poppins:wght@300;400;500&display=swap');


*{

box-sizing:border-box;

}


body{

margin:0;

}



.login-page{

min-height:100vh;

display:flex;

justify-content:center;

align-items:center;


background:

radial-gradient(
circle at top left,
#f8dfe5,
transparent 35%
),


radial-gradient(
circle at bottom right,
#dcd6f7,
transparent 35%
),


linear-gradient(
135deg,
#fff8f0,
#f6edf5
);


font-family:Poppins;

}



.login-card{


width:420px;


padding:45px;


background:

rgba(255,255,255,.65);


backdrop-filter:blur(20px);


border-radius:35px;


border:

1px solid rgba(255,255,255,.8);


box-shadow:

0 20px 60px
rgba(180,150,170,.25);



}



.logo{

font-family:
"Cormorant Garamond";

font-size:70px;

text-align:center;

color:#b58d9c;


}



h1{


font-family:
"Cormorant Garamond";


font-size:38px;


text-align:center;


color:#6e5560;


margin:5px;


}



.subtitle{

text-align:center;

color:#a18a93;

font-size:14px;

margin-bottom:35px;


}



input{


width:100%;


padding:16px;


margin:12px 0;


border:none;


outline:none;


border-radius:20px;


background:white;


color:#6e5560;


box-shadow:

0 5px 20px
rgba(190,160,170,.15);


}



input::placeholder{

color:#bba7af;

}



button{


width:100%;


padding:16px;


margin-top:20px;


border:none;


border-radius:25px;


background:

linear-gradient(
90deg,
#d9a7c7,
#b8c6db
);


color:white;


font-size:16px;


cursor:pointer;


transition:.3s;


}



button:hover{

transform:translateY(-3px);

}



.msg{

text-align:center;

margin-top:18px;

color:#aa8295;

}



.signup{


text-align:center;

margin-top:30px;

color:#9b858e;


}



.signup a{

color:#bd829d;

text-decoration:none;

font-weight:500;

}



.bottom{

text-align:center;

margin-top:35px;

font-size:12px;

letter-spacing:2px;

color:#c0aeb7;


}


`}</style>




<div className="login-page">


<div className="login-card">


<div className="logo">

V

</div>



<h1>

Welcome Back

</h1>



<p className="subtitle">

Continue your little journey ✿

</p>




<form onSubmit={login}>


<input

type="email"

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>



<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>



<button>

Sign In

</button>


</form>




<div className="msg">

{msg}

</div>




<div className="signup">

Don't have an account?


<Link to="/signup">

 Create one

</Link>


</div>



<div className="bottom">

</div>



</div>


</div>


</>

)

}