import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(){

return(
<>

<style>{`

*{
box-sizing:border-box;
}



.navbar{

position:fixed;

top:20px;

left:70px;

right:70px;

height:75px;

z-index:1000;


display:flex;

align-items:center;

justify-content:space-between;


padding:0 35px;


background:rgba(255,255,255,.18);


border:1px solid rgba(255,255,255,.35);


border-radius:40px;


backdrop-filter:blur(20px);


-webkit-backdrop-filter:blur(20px);


box-shadow:

0 15px 40px rgba(0,0,0,.18);


}





.logo{


font-family:"Cormorant Garamond",serif;


font-size:42px;


font-weight:700;


color:white;


letter-spacing:.5px;


white-space:nowrap;


}





.links{


display:flex;


align-items:center;


gap:32px;


}



.links a{


text-decoration:none;


color:white;


font-size:16px;


position:relative;


transition:.3s;


white-space:nowrap;


}





.links a::after{


content:"";


position:absolute;


bottom:-8px;


left:0;


width:0;


height:2px;


background:#e8d7bd;


transition:.3s;


}





.links a:hover{


color:#e8d7bd;


}





.links a:hover::after{


width:100%;


}





.profile{


padding:12px 28px;


border-radius:30px;



background:

linear-gradient(

135deg,

#d9b88f,

#bfa6d9

);



color:white;


font-size:15px;


cursor:pointer;



box-shadow:

0 8px 25px rgba(210,180,150,.35);


transition:.25s;


}



.profile:hover{


box-shadow:

0 12px 35px rgba(210,180,150,.5);


}


/* NO MOVEMENT */


/* Mobile */


@media(max-width:900px){


.navbar{


left:20px;


right:20px;


height:70px;


padding:0 20px;


}



.links{


display:none;


}



.logo{


font-size:35px;


}



.profile{


padding:10px 20px;


}
.profile{
  text-decoration:none;
  display:flex;
  align-items:center;
  justify-content:center;

  padding:12px 28px;

  border-radius:30px;

  background:
  linear-gradient(
    135deg,
    #d9b88f,
    #bfa6d9
  );

  color:white;

  font-size:15px;

  cursor:pointer;

  box-shadow:
  0 8px 25px rgba(210,180,150,.35);

  transition:.25s;
}


}



`}</style>





<nav className="navbar">



<div className="logo">

MyLilMap

</div>





<div className="links">


<Link to="/home">
Home
</Link>



<Link to="/places">
Places
</Link>



<Link to="/destinations">
Destinations
</Link>



<Link to="/bucketlist">
Bucket List
</Link>



</div>





<Link to="/profile" className="profile">
  Profile
</Link>



</nav>


</>

)

}