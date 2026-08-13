import React, {useEffect, useState} from "react";
import {supabase} from "../supabase";
import Groq from "groq-sdk";
import Navbar from "../components/Navbar";


export default function Places(){


const [places,setPlaces] = useState([]);

const [showForm,setShowForm] = useState(false);

const [loading,setLoading] = useState(true);

const [editing,setEditing] = useState(false);


// AI STATES

const [aiOpen,setAiOpen] = useState(false);

const [aiLoading,setAiLoading] = useState(false);

const [aiAnswer,setAiAnswer] = useState("");
const [userEmail, setUserEmail] = useState("");
const [sendingEmail, setSendingEmail] = useState(false);



const emptyForm = {

id:null,

title:"",

category:"",

location:"",

description:"",

image:""

};



const [form,setForm] = useState(emptyForm);





useEffect(()=>{

fetchPlaces();

},[]);






// ================= READ =================


async function fetchPlaces(){


setLoading(true);


const {data,error}=await supabase

.from("places")

.select("*")

.order("id",{ascending:false});



if(error){

alert(error.message);

setLoading(false);

return;

}



setPlaces(data || []);

setLoading(false);


}
// ================= CREATE =================


async function addPlace(){


if(
!form.title ||
!form.category ||
!form.location
){

alert("Please fill required fields");

return;

}



const {data,error}=await supabase

.from("places")

.insert([

{

title:form.title,

category:form.category,

location:form.location,

description:form.description,

image:form.image

}

])

.select();
if(error){

alert(error.message);

return;

}
setPlaces(prev=>[data[0],...prev]);


closeForm();


}



// ================= UPDATE =================


async function updatePlace(){


const {data,error}=await supabase

.from("places")

.update({

title:form.title,

category:form.category,

location:form.location,

description:form.description,

image:form.image

})

.eq("id",form.id)

.select();




if(error){

alert(error.message);

return;

}



setPlaces(prev=>

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

// ================= DELETE =================


async function deletePlace(id){


const confirmDelete = window.confirm(
"Delete this place?"
);


if(!confirmDelete)

return;



const {error}=await supabase

.from("places")

.delete()

.eq("id",id);

if(error){

alert(error.message);

return;

}



setPlaces(prev=>

prev.filter(item=>item.id!==id)

);


}
// ================= EDIT =================


function openEdit(place){


setForm({

id:place.id,

title:place.title || "",

category:place.category || "",

location:place.location || "",

description:place.description || "",

image:place.image || ""

});



setEditing(true);

setShowForm(true);


}
function closeForm(){


setShowForm(false);

setEditing(false);

setForm(emptyForm);


}

// ================= GROQ AI =================


async function askAI(place){


setAiOpen(true);

setAiLoading(true);

setAiAnswer("");



try{


const groq = new Groq({

apiKey:import.meta.env.VITE_GROQ_API_KEY,

dangerouslyAllowBrowser:true

});
const response = await groq.chat.completions.create({


model:"llama-3.1-8b-instant",



messages:[

{

role:"user",

content:

`

You are a professional travel guide.


Explain this destination:


Name:
${place.title}


Category:
${place.category}


Location:
${place.location}


Description:
${place.description}



Give:


🌍 Overview

🕒 Best time to visit

📸 Things to do

🍴 Food suggestions

💡 Travel tips

`

}

]

});

setAiAnswer(

response.choices[0].message.content

);



}

catch(error){


console.log(error);


setAiAnswer(

"AI could not respond."

);


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

<style>{`

@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Inter:wght@300;400;500&display=swap');


*{

box-sizing:border-box;

}


body{

margin:0;

font-family:Inter,sans-serif;

}

.places{

min-height:100vh;

padding:80px 70px 80px;


background:

linear-gradient(

rgba(5,45,90,.55),

rgba(5,30,70,.65)

),


url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e");


background-size:cover;

background-position:center;

background-attachment:fixed;

}
/* HERO */


.hero{

margin-top:40px;

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

margin-top:35px;

padding:18px 45px;

border:none;

border-radius:40px;

background:white;

cursor:pointer;

font-size:18px;

}
/* CATEGORY TITLE */


.sectionTitle{

font-family:"Cormorant Garamond";

font-size:55px;

color:white;

margin-top:70px;

margin-bottom:30px;

}
/* CARDS */


.grid{

display:grid;

grid-template-columns:repeat(3,1fr);

gap:30px;

}
.card{

position:relative;

background:rgba(255,255,255,.9);

border-radius:35px;

overflow:hidden;

box-shadow:0 25px 60px rgba(0,0,0,.25);

transition:.3s;

}
.card:hover{

transform:translateY(-10px);

}
.card img{

width:100%;

height:280px;

object-fit:cover;

}
.deleteTop{

position:absolute;

top:15px;

right:15px;

width:40px;

height:40px;

border:none;

border-radius:50%;


background:white;

color:#e11d48;

font-size:25px;

cursor:pointer;

z-index:5;

}
.deleteTop:hover{

background:#e11d48;

color:white;

}
.info{

padding:25px;

}
.category{

display:inline-block;

background:#dceeff;

color:#164c7a;

padding:8px 18px;

border-radius:25px;

}
.info h2{

font-family:"Cormorant Garamond";

font-size:38px;

color:#333;

margin:15px 0 5px;

}
.location{

color:#666;

}
.info p{

color:#777;

line-height:1.6;

}
.buttons{

display:flex;

gap:10px;

margin-top:20px;

}
.aiButton,
.update{

flex:1;

padding:10px;

border:none;

border-radius:25px;

cursor:pointer;

}
.aiButton{

background:#e8f2ff;

color:#174ea6;

}
.update{

background:#2563eb;

color:white;

}
.empty{

color:white;

font-size:22px;

}

/* ADD / UPDATE FORM */

/* ADD / UPDATE FORM */

.popup{

width:520px;
max-width:90%;
background:white;
padding:35px;
border-radius:35px;
box-shadow:0 30px 80px rgba(0,0,0,.4);
position:fixed;
top:50%;
left:50%;
transform:translate(-50%,-50%);
z-index:1000;
display:flex;
flex-direction:column;
gap:15px;

}

.popup h2{

font-family:"Cormorant Garamond";

font-size:40px;

margin:0;

}
.popup h2{

font-family:"Cormorant Garamond";

font-size:40px;

margin:0;
}
.popup input,
.popup textarea,
.popup select{


padding:15px;


border-radius:15px;


border:1px solid #ddd;


font-size:16px;


}
.popup textarea{

height:120px;

resize:none;

}
.save,
.cancel{


padding:15px;


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



/* AI POPUP */


.aiOverlay{


position:fixed;


inset:0;


background:rgba(0,0,0,.55);


display:flex;


align-items:center;


justify-content:center;


z-index:1000;


}


.aiPopup{


width:520px;


max-width:90%;



max-height:80vh;



overflow:auto;



background:white;



padding:35px;



border-radius:35px;



box-shadow:0 30px 80px rgba(0,0,0,.4);



position:relative;



}

.aiPopup h2{


font-family:"Cormorant Garamond";


font-size:45px;


color:#164c7a;


}
.aiPopup p{


white-space:pre-line;


line-height:1.8;


color:#444;


font-size:16px;


}
.closeAI{


position:absolute;


right:20px;


top:20px;



width:35px;


height:35px;



border:none;



border-radius:50%;



background:#eee;



font-size:22px;



cursor:pointer;

}
@media(max-width:1000px){


.grid{


grid-template-columns:repeat(2,1fr);


}


}

@media(max-width:700px){


.places{


padding:100px 25px;


}
.hero h1{
font-size:55px;
}
.grid{


grid-template-columns:1fr;


}
.popup{
width:90%;
}


}
`}</style>

<div className="places">
<Navbar/>


<section className="hero">


<h1>

Places

<br/>

<span>

to Visit

</span>

</h1>

<p>

Collect beautiful places you want to explore.

<br/>

Cafes, beaches, cities and hidden gems.

</p>
<button

className="add"

onClick={()=>setShowForm(true)}

>

+ Add Place

</button>
</section>
{

loading ?


<h2 className="empty">

Loading places...

</h2>
:
places.length===0 ?


<h2 className="empty">

No places added yet 🌊

</h2>
:
[

"☕ Cafe",

"🏖️ Beach",

"🏔️ Mountain",

"🍽️ Restaurant",

"🌿 Nature",

"🏙️ City"

].map(category=>{


const categoryPlaces = places.filter(

place=>place.category===category

);



if(categoryPlaces.length===0)

return null;

return(


<section key={category}>


<h2 className="sectionTitle">

{category}

</h2>

<div className="grid">

{

categoryPlaces.map(place=>(


<div className="card" key={place.id}>



<button

className="deleteTop"

onClick={()=>deletePlace(place.id)}

>

×

</button>





<img

src={place.image || "https://via.placeholder.com/400"}

alt={place.title}

/>






<div className="info">





<span className="category">

{place.category}

</span>
<h2>

{place.title}

</h2>

<div className="location">

📍 {place.location}

</div>
<p>

{place.description}

</p>
<div className="buttons">
<button

className="aiButton"

onClick={()=>askAI(place)}

>

✨ Ask AI

</button>
<button

className="update"

onClick={()=>openEdit(place)}

>

✏️ Update

</button>

</div>

</div>


</div>


))

}

</div>


</section>


)



})

}

{

showForm &&



<div className="popup">



<h2>

{editing ? "Update Place" : "Add New Place"}

</h2>

<input

placeholder="Place name"

value={form.title}

onChange={(e)=>

setForm({

...form,

title:e.target.value

})

}

/>

<select

value={form.category}

onChange={(e)=>

setForm({

...form,

category:e.target.value

})

}

>

<option value="">

Select Category

</option>



<option>

☕ Cafe

</option>



<option>

🏖️ Beach

</option>



<option>

🏔️ Mountain

</option>



<option>

🍽️ Restaurant

</option>



<option>

🌿 Nature

</option>



<option>

🏙️ City

</option>



</select>


<input

placeholder="Location"

value={form.location}

onChange={(e)=>

setForm({

...form,

location:e.target.value

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

onClick={editing ? updatePlace : addPlace}

>


{

editing

?

"Update Place"

:

"Save Place"

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
{

aiOpen &&
<div className="aiOverlay">
<div className="aiPopup">
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
       onClick={() => sendEmailGuide("Your Travel Guide")}// Use item.city for Destinations, place.title for Places
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
</div>
</div>
}

</div>
</>


)

}