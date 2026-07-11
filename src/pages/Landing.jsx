import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";


function Landing() {


const navigate = useNavigate();



async function handleExplore(){


const {data}=await supabase.auth.getSession();



if(data.session){

navigate("/home");

}

else{

navigate("/signup");

}


}




function handleLogin(){

navigate("/login");

}





return (

<div style={styles.page}>


<nav style={styles.navbar}>


<h1 style={styles.logo}>

🌎 MyLilMap

</h1>



<div>


<button

style={styles.login}

onClick={handleLogin}

>

Login

</button>




<button

style={styles.signup}

onClick={handleExplore}

>

Start Exploring ✨

</button>



</div>


</nav>






<section style={styles.hero}>


<div style={styles.content}>


<div style={styles.badge}>

🌸 Your personal discovery diary

</div>





<h2 style={styles.heading}>

Create your

<br/>

little world

<br/>

of places ✨

</h2>





<p style={styles.text}>

Save magical cafés, hidden spots,
dream destinations and every place
that makes you happy.

</p>



</div>







<div style={styles.art}>


<div style={styles.glow}></div>



<div style={styles.circle}>


<img

src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"

alt="travel"

style={styles.mainImage}

/>


</div>





<div style={styles.cardOne}>


<img

src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb"

style={styles.smallImage}

/>


<h3>

Cozy Cafés

</h3>


<p>

12 saved places

</p>


</div>








<div style={styles.cardTwo}>


<img

src="https://images.unsplash.com/photo-1448375240586-882707db888b"

style={styles.smallImage}

/>


<h3>

Nature Spots

</h3>


<p>

Peaceful escapes

</p>


</div>








<div style={styles.cardThree}>


<img

src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"

style={styles.smallImage}

/>


<h3>

Memories

</h3>


<p>

Your collections

</p>


</div>



</div>



</section>


</div>

);


}






const styles={


page:{


minHeight:"100vh",

background:
"linear-gradient(135deg,#FFF9F6,#F8F5FF,#F5FAF7)",

fontFamily:"Georgia, serif",

overflow:"hidden"


},



navbar:{


display:"flex",

justifyContent:"space-between",

alignItems:"center",

padding:"28px 70px"


},



logo:{


fontSize:"30px",

color:"#6D625B",

fontWeight:"600"


},



login:{


background:"transparent",

border:"none",

color:"#6D625B",

fontSize:"16px",

marginRight:"20px",

cursor:"pointer"


},



signup:{


background:
"linear-gradient(135deg,#DDB7C5,#D9CBEF)",


color:"white",

border:"none",

padding:"13px 28px",

borderRadius:"30px",

cursor:"pointer"


},




hero:{


display:"flex",

alignItems:"center",

justifyContent:"space-around",

padding:"50px 80px"


},



content:{


width:"45%"


},




badge:{


display:"inline-block",

background:"#F9EEF3",

color:"#A77B8A",

padding:"10px 20px",

borderRadius:"30px",

marginBottom:"25px"


},




heading:{


fontSize:"64px",

lineHeight:"1.1",

color:"#403A35",

fontWeight:"500"


},



text:{


fontSize:"19px",

color:"#81766C",

lineHeight:"1.7"


},





art:{


position:"relative",

width:"500px",

height:"500px"


},




glow:{


position:"absolute",

width:"420px",

height:"420px",

borderRadius:"50%",

background:
"radial-gradient(circle,#E9E1FF,transparent 70%)",

filter:"blur(25px)"


},




circle:{


width:"350px",

height:"350px",

borderRadius:"50%",

overflow:"hidden",

boxShadow:
"0 25px 60px rgba(150,130,150,.18)"


},



mainImage:{


width:"100%",

height:"100%",

objectFit:"cover"


},



smallImage:{


width:"80px",

height:"60px",

borderRadius:"15px",

objectFit:"cover"


},




cardOne:{


position:"absolute",

top:"25px",

right:"0",

background:"rgba(255,248,250,.85)",

padding:"22px",

borderRadius:"25px"


},




cardTwo:{


position:"absolute",

bottom:"40px",

right:"10px",

background:"rgba(235,247,239,.9)",

padding:"22px",

borderRadius:"25px"


},




cardThree:{


position:"absolute",

bottom:"110px",

left:"0",

background:"rgba(255,249,232,.9)",

padding:"22px",

borderRadius:"25px"


}



};



export default Landing;