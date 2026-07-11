import React,{useEffect,useState} from "react";
import {supabase} from "../supabase";
import Navbar from "../components/Navbar";


export default function BucketList(){


const [items,setItems]=useState([]);

const [title,setTitle]=useState("");

const [showAdd,setShowAdd]=useState(false);

const [loading,setLoading]=useState(true);




useEffect(()=>{

fetchBucket();

},[]);





async function fetchBucket(){


const {data,error}=await supabase

.from("bucketlist")

.select("*")

.order("id",{ascending:false});



if(error){

alert(error.message);

return;

}


setItems(data || []);

setLoading(false);


}





async function addItem(){


if(!title.trim()) return;



const {data,error}=await supabase

.from("bucketlist")

.insert([{

title:title,

completed:false

}])

.select();



if(error){

alert(error.message);

return;

}



setItems([data[0],...items]);

setTitle("");

setShowAdd(false);


}





async function toggleItem(item){


const {data,error}=await supabase

.from("bucketlist")

.update({

completed:!item.completed

})

.eq("id",item.id)

.select();



if(error){

alert(error.message);

return;

}



setItems(

items.map(i=>

i.id===item.id

?

data[0]

:

i

)

);


}





async function deleteItem(id){


const {error}=await supabase

.from("bucketlist")

.delete()

.eq("id",id);



if(error){

alert(error.message);

return;

}


setItems(

items.filter(item=>item.id!==id)

);


}







return(

<>

<Navbar/>


<style>{`

@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Inter:wght@300;400;500&display=swap');



*{

box-sizing:border-box;

}



body{

margin:0;

font-family:Inter,sans-serif;

}





.bucket{

min-height:100vh;

padding:130px 70px 100px;


background:

linear-gradient(
rgba(4,35,70,.65),
rgba(3,20,45,.8)
),

url("https://images.unsplash.com/photo-1483347756197-71ef80e95f73");
background-size:cover;

background-position:center;

background-attachment:fixed;


}




.hero{

color:white;

margin-bottom:50px;

}



.hero h1{

font-family:"Cormorant Garamond";

font-size:85px;

margin:0;

}



.hero span{

color:#b9ddff;

}




.hero p{

font-size:22px;

line-height:1.7;

max-width:650px;

font-style:italic;

}




.add{

margin-top:25px;

padding:16px 45px;

border:none;

border-radius:40px;

font-size:18px;

cursor:pointer;

background:white;

}




.inputBox{

margin-top:25px;

display:flex;

gap:15px;

}



.inputBox input{

padding:15px 25px;

width:350px;

border:none;

border-radius:30px;

font-size:16px;

}



.inputBox button{

padding:15px 30px;

border:none;

border-radius:30px;

cursor:pointer;

}




.notes{

display:grid;

grid-template-columns:repeat(3,1fr);

gap:25px;

max-width:1200px;

}


.note{

background:#fff4a8;

padding:30px;

min-height:170px;

border-radius:10px;

box-shadow:

0 20px 40px rgba(0,0,0,.3);

position:relative;

transform:rotate(-2deg);

}



.note:nth-child(6n+1){

background:#fff4a8; /* yellow */

}


.note:nth-child(6n+2){

background:#bde7ff; /* blue */

}


.note:nth-child(6n+3){

background:#ffc7d9; /* pink */

}


.note:nth-child(6n+4){

background:#c8f7c5; /* green */

}


.note:nth-child(6n+5){

background:#e8d5ff; /* purple */

}


.note:nth-child(6n){

background:#ffd8a8; /* orange */

}



.note input{

width:22px;

height:22px;

cursor:pointer;

}




.note span{

font-size:22px;

margin-left:15px;

}



.done{

text-decoration:line-through;

opacity:.5;

}




.delete{

position:absolute;

right:20px;

bottom:15px;

border:none;

background:#ffdddd;

color:#d11;

border-radius:20px;

padding:8px 15px;

cursor:pointer;

}



`}</style>





<div className="bucket">


<div className="hero">


<h1>

My <span>Bucket List</span>

</h1>



<p>

"Collect moments, chase dreams,
and complete the adventures
you always imagined."

</p>



<button

className="add"

onClick={()=>setShowAdd(!showAdd)}

>

+ Add

</button>



{

showAdd &&

<div className="inputBox">


<input

placeholder="Add something you want to do..."

value={title}

onChange={(e)=>setTitle(e.target.value)}

/>



<button

onClick={addItem}

>

Save

</button>


</div>


}



</div>







{

loading

?

<h2 style={{color:"white"}}>

Loading...

</h2>


:

<div className="notes">


{

items.map((item,index)=>(


<div

className="note"

key={item.id}

>


<div>


<input

type="checkbox"

checked={item.completed}

onChange={()=>toggleItem(item)}

/>



<span

className={item.completed?"done":""}

>

{item.title}

</span>


</div>



<button

className="delete"

onClick={()=>deleteItem(item.id)}

>

Delete

</button>



</div>


))


}



</div>


}



</div>


</>

)

}