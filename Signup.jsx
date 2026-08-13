import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {supabase} from "../supabase";


export default function Signup(){

const navigate = useNavigate();


const [data,setData] = useState({
username:"",
email:"",
password:""
});



const change=(e)=>{

setData({

...data,

[e.target.name]:e.target.value

});

};
const createAccount = async(e)=>{

e.preventDefault();

const {

data:userData,

error

}=await supabase.auth.signUp({

email:data.email,

password:data.password

});


if(error){

console.log(error.message);

return;

}

const user=userData.user;

const {error:profileError}=await supabase

.from("profiles")

.insert({

id:user.id,

username:data.username,

email:data.email

});

if(profileError){

console.log(profileError.message);

return;

}

navigate("/home");

};

return(

<div style={styles.page}>


<div style={styles.blob1}></div>

<div style={styles.blob2}></div>


<div style={styles.card}>


<div style={styles.logo}>

🌎

</div>


<h1>

Create Account

</h1>




<p style={styles.subtitle}>

Start your MyLilMap journey ✨

</p>






<form onSubmit={createAccount}>




<input

style={styles.input}

name="username"

placeholder="Your name"

onChange={change}

required

/>






<input

style={styles.input}

name="email"

type="email"

placeholder="Email address"

onChange={change}

required

/>






<input

style={styles.input}

name="password"

type="password"

placeholder="Password"

onChange={change}

required

/>






<button style={styles.button}>

Create Account

</button>





</form>







<a href="/login" style={styles.link}>

Already have an account? Login

</a>





</div>


</div>

);

}







const styles={



page:{


minHeight:"100vh",

display:"flex",

alignItems:"center",

justifyContent:"center",

position:"relative",

overflow:"hidden",


background:

"linear-gradient(135deg,#fff5eb,#eee8ff,#e8f5eb)"


},





card:{


width:"400px",

padding:"45px",

borderRadius:"35px",


background:

"rgba(255,255,255,0.55)",


backdropFilter:"blur(25px)",


border:

"1px solid rgba(255,255,255,0.5)",


textAlign:"center",


boxShadow:

"0 25px 70px rgba(0,0,0,0.12)",


zIndex:2


},





logo:{


fontSize:"45px",

marginBottom:"10px"


},





subtitle:{


color:"#777",

marginBottom:"30px",

fontSize:"16px"


},





input:{


width:"100%",


boxSizing:"border-box",


padding:"16px 20px",


marginBottom:"15px",


borderRadius:"25px",


border:

"1px solid rgba(200,200,200,.3)",


background:

"rgba(255,255,255,.8)",


outline:"none",


fontSize:"15px"


},





button:{


width:"100%",


padding:"16px",

borderRadius:"30px",


border:"none",


background:

"linear-gradient(135deg,#d7abc0,#bdb2e8,#a9c9af)",


color:"white",


fontSize:"16px",


fontWeight:"600",


cursor:"pointer",


marginTop:"10px"


},





link:{


color:"#8c6aa8",

textDecoration:"none",

fontSize:"14px",

display:"block",

marginTop:"20px"


},





blob1:{


position:"absolute",

width:"250px",

height:"250px",

background:"#ffd6e7",

borderRadius:"50%",

top:"10%",

left:"10%",

filter:"blur(70px)"


},





blob2:{


position:"absolute",

width:"300px",

height:"300px",

background:"#d8d0ff",

borderRadius:"50%",

bottom:"10%",

right:"10%",

filter:"blur(80px)"


}



};