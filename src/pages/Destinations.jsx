import React,{useEffect,useState} from "react";
import {supabase} from "../supabase";
import Groq from "groq-sdk";
import Navbar from "../components/Navbar";


export default function Destinations(){


const emptyForm={
id:null,
country:"",
city:"",
description:"",
image:""
};



const [destinations,setDestinations]=useState([]);

const [form,setForm]=useState(emptyForm);

const [loading,setLoading]=useState(true);

const [showForm,setShowForm]=useState(false);

const [editing,setEditing]=useState(false);


const [aiOpen,setAiOpen]=useState(false);

const [aiLoading,setAiLoading]=useState(false);

const [aiAnswer,setAiAnswer]=useState("");
const [userEmail, setUserEmail] = useState("");
const [sendingEmail, setSendingEmail] = useState(false);





useEffect(()=>{

fetchDestinations();

},[]);






async function fetchDestinations(){


setLoading(true);


const {data,error}=await supabase

.from("destinations")

.select("*")

.order("id",{ascending:false});



if(error){

alert(error.message);

setLoading(false);

return;

}


setDestinations(data || []);

setLoading(false);


}









async function addDestination(){


if(!form.country || !form.city){

alert("Country and city required");

return;

}



const {data,error}=await supabase

.from("destinations")

.insert([{

country:form.country,

city:form.city,

description:form.description,

image:form.image

}])

.select();



if(error){

alert(error.message);

return;

}



setDestinations(prev=>[

data[0],

...prev

]);


closeForm();


}









async function updateDestination(){


const {data,error}=await supabase

.from("destinations")

.update({

country:form.country,

city:form.city,

description:form.description,

image:form.image

})

.eq("id",form.id)

.select();



if(error){

alert(error.message);

return;

}



setDestinations(prev=>

prev.map(item=>

item.id===form.id

?

data[0]

:

item

)

);



closeForm();


}









async function deleteDestination(id){


if(!window.confirm("Delete destination?"))

return;



const {error}=await supabase

.from("destinations")

.delete()

.eq("id",id);



if(error){

alert(error.message);

return;

}



setDestinations(prev=>

prev.filter(item=>item.id!==id)

);


}









function openEdit(item){


setForm({

id:item.id,

country:item.country || "",

city:item.city || "",

description:item.description || "",

image:item.image || ""

});


setEditing(true);

setShowForm(true);


}









function closeForm(){


setForm(emptyForm);

setEditing(false);

setShowForm(false);


}
async function askAI(destination){


setAiOpen(true);

setAiLoading(true);

setAiAnswer("");



try{


const groq=new Groq({

apiKey:import.meta.env.VITE_GROQ_API_KEY,

dangerouslyAllowBrowser:true

});



const response=await groq.chat.completions.create({


model:"llama-3.1-8b-instant",


messages:[{

role:"user",

content:`

You are a professional travel guide.

Create a guide for:


Country:
${destination.country}


City:
${destination.city}



Include:


🌍 Overview

🏛 Attractions

🍜 Food

🗓 Best time

💰 Budget tips

🎒 Travel tips

`

}]

});



setAiAnswer(

response.choices[0].message.content

);



}

catch(error){

console.log(error);

setAiAnswer("AI could not respond.");

}


setAiLoading(false);


}
async function sendEmailGuide(locationName) {
  if (!userEmail) {
    alert("Please enter an email address.");
    return;
  }
  
  setSendingEmail(true);

  try {
    const response = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userEmail,
        locationName: locationName,
        aiContent: aiAnswer
      })
    });

    const result = await response.json();
    
    if (result.success) {
      alert("Guide sent to your email successfully!");
      setUserEmail(""); // Clear input on success
    } else {
      alert("Failed to send email: " + result.error);
    }
  } catch (error) {
    console.log("Email error:", error);
    alert("An error occurred while sending the email.");
  }
  
  setSendingEmail(false);
}
return(
<>
<Navbar/>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Inter:wght@300;400;500&display=swap');


*{
box-sizing:border-box;
}


body{

margin:0;

font-family:Inter,sans-serif;

}




.destinations{

min-height:100vh;

padding:130px 70px 80px;


background:

linear-gradient(
rgba(4,35,70,.65),
rgba(3,20,45,.75)
),


url("https://images.unsplash.com/photo-1500530855697-b586d89ba3ee");


background-size:cover;

background-position:center;

background-attachment:fixed;

}
.hero{

margin-top:50px;

color:white;

}

.hero h1{

font-family:"Cormorant Garamond";

font-size:80px;

line-height:1;

margin:0;

}
.hero span{

color:#b9ddff;

}

.hero p{

font-size:20px;

line-height:1.7;

}
.add{

margin-top:25px;

padding:17px 45px;

border:none;

border-radius:40px;

background:white;

font-size:18px;

cursor:pointer;

}
.grid{

margin-top:60px;

display:grid;

grid-template-columns:repeat(2,1fr);

gap:35px;

}
.card{

position:relative;

background:white;

border-radius:35px;

overflow:hidden;

box-shadow:0 25px 60px rgba(0,0,0,.3);

transition:.3s;

}



.card:hover{

transform:translateY(-10px);

}
.card img{

width:100%;

height:350px;

object-fit:cover;

}
.deleteTop{

position:absolute;

top:18px;

right:18px;


width:42px;

height:42px;


border:none;

border-radius:50%;


background:white;

color:#e11d48;


font-size:25px;


cursor:pointer;

z-index:5;

}
.info{

padding:22px 30px 28px;

}
.country{

background:#dbeafe;

color:#164c7a;

padding:7px 18px;

border-radius:25px;

font-size:14px;

}
.info h2{

font-family:"Cormorant Garamond";

font-size:38px;

margin:15px 0 5px;

color:#333;

}
.location{

color:#666;

}
.info p{

color:#777;

line-height:1.6;


display:-webkit-box;

-webkit-line-clamp:2;

-webkit-box-orient:vertical;

overflow:hidden;

}
.buttons{

display:flex;

gap:12px;

margin-top:20px;

}
.aiButton,
.updateButton{

flex:1;

padding:12px;

border:none;

border-radius:25px;

cursor:pointer;

}
.aiButton{

background:#e5f0ff;

color:#174ea6;

}
.updateButton{

background:#2563eb;

color:white;

}
.popup{

position:fixed;

top:50%;

left:50%;

transform:translate(-50%,-50%);

width:420px;

background:white;

padding:35px;

border-radius:30px;

z-index:99999;

box-shadow:0 30px 80px rgba(0,0,0,.4);

}
.popup input,
.popup textarea{

width:100%;

padding:15px;

margin:8px 0;

border-radius:15px;

border:1px solid #ddd;

}
.popup textarea{

height:120px;

resize:none;

}
.save,
.cancel{

width:100%;

padding:15px;

margin-top:10px;

border:none;

border-radius:25px;

cursor:pointer;

}
.save{

background:#2563eb;

color:white;

}
.cancel{

background:#eee;

}
.aiOverlay{

position:fixed;

inset:0;

background:rgba(0,0,0,.55);

z-index:900;

}
.aiBox{

position:fixed;

top:50%;

left:50%;

transform:translate(-50%,-50%);


width:520px;

max-height:80vh;

overflow:auto;


background:white;


padding:35px;


border-radius:35px;


z-index:1000;

}
.aiBox h2{

font-family:"Cormorant Garamond";

font-size:45px;

color:#164c7a;

}
.aiBox p{

white-space:pre-line;

line-height:1.8;

color:#444;

}
.closeAI{

position:absolute;

right:20px;

top:15px;

border:none;

background:none;

font-size:30px;

cursor:pointer;

}
@media(max-width:900px){


.grid{

grid-template-columns:1fr;

}



.destinations{

padding:120px 25px;

}



.hero h1{

font-size:60px;

}


}

`}
</style>
<div className="destinations">


{
showForm &&

<div className="popup">


<h2>

{editing ? "Update Destination" : "Add Destination"}

</h2>



<input

placeholder="Country"

value={form.country}

onChange={(e)=>

setForm({

...form,

country:e.target.value

})

}

/>



<input

placeholder="City"

value={form.city}

onChange={(e)=>

setForm({

...form,

city:e.target.value

})

}

/>



<textarea

placeholder="Description"

value={form.description}

onChange={(e)=>

setForm({

...form,

description:e.target.value

})

}

/>



<input

placeholder="Image URL"

value={form.image}

onChange={(e)=>

setForm({

...form,

image:e.target.value

})

}

/>



<button

className="save"

onClick={editing ? updateDestination : addDestination}

>

{

editing

?

"Update Destination"

:

"Save Destination"

}


</button>
<button

className="cancel"

onClick={closeForm}

>

Cancel

</button>



</div>

}





<div className="hero">


<h1>

Explore <span>World</span>

</h1>


<p>

Discover amazing destinations and create unforgettable journeys.

</p>



<button

className="add"

onClick={()=>{

setForm(emptyForm);

setEditing(false);

setShowForm(true);

}}

>

+ Add Destination

</button>


</div>





{

loading

?

<h2 style={{color:"white"}}>

Loading...

</h2>


:


<div className="grid">


{

destinations.map(item=>(


<div className="card" key={item.id}>


<button

className="deleteTop"

onClick={()=>deleteDestination(item.id)}

>

×

</button>



<img

src={item.image}

alt={item.city}

/>



<div className="info">


<span className="country">

{item.country}

</span>



<h2>

{item.city}

</h2>



<div className="location">

📍 {item.country}

</div>



<p>

{item.description}

</p>



<div className="buttons">


<button

className="aiButton"

onClick={()=>askAI(item)}

>

✨ AI Guide

</button>



<button

className="updateButton"

onClick={()=>openEdit(item)}

>

Update

</button>


</div>



</div>


</div>


))


}


</div>


}
{


aiOpen &&

<>


<div

className="aiOverlay"

onClick={()=>setAiOpen(false)}

>

</div>



<div className="aiBox">



<button

className="closeAI"

onClick={()=>setAiOpen(false)}

>

×

</button>
<h2>

✨ AI Travel Guide

</h2>

{
  aiLoading 
  ? <h3>Creating guide...</h3>
  : <>
      <p>{aiAnswer}</p>
      
      {/* NEW EMAIL UI */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '25px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
        <input 
          type="email" 
          placeholder="Enter your email address"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          style={{ flex: 1, padding: '12px 15px', borderRadius: '15px', border: '1px solid #ddd', fontSize: '15px' }}
        />
        <button 
       onClick={() => sendEmailGuide("Your Travel Guide")} // Use item.city for Destinations, place.title for Places
          disabled={sendingEmail}
          style={{ 
            background: '#2563eb', 
            color: 'white', 
            padding: '12px 25px', 
            border: 'none', 
            borderRadius: '25px', 
            cursor: sendingEmail ? 'not-allowed' : 'pointer',
            opacity: sendingEmail ? 0.7 : 1
          }}
        >
          {sendingEmail ? "Sending..." : "📧 Send to Email"}
        </button>
      </div>
    </>
}
<button

className="cancel"

onClick={()=>setAiOpen(false)}

>
Close

</button>
</div>

</>


}
</div>


</>

)

}