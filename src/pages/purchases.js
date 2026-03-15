import {useEffect,useState} from "react";
import Layout from "../layout/layout";
import API from "../services/api";

function Purchases(){

const [data,setData]=useState([]);
const [form,setForm]=useState({
base_id:"",
asset_id:"",
quantity:""
});

useEffect(()=>{
fetchData();
},[])

const fetchData=async()=>{
const res=await API.get("/purchases");
setData(res.data);
}

const submit=async(e)=>{
e.preventDefault();

await API.post("/purchases",form);

fetchData();
}

return(

<Layout>

<h2>Record Purchase</h2>

<form onSubmit={submit}>

<input
placeholder="Base ID"
onChange={(e)=>setForm({...form,base_id:e.target.value})}
/>

<input
placeholder="Asset ID"
onChange={(e)=>setForm({...form,asset_id:e.target.value})}
/>

<input
placeholder="Quantity"
onChange={(e)=>setForm({...form,quantity:e.target.value})}
/>

<button type="submit">
Add Purchase
</button>

</form>

<h3>Purchase History</h3>

<table border="1">

<thead>

<tr>
<th>Base</th>
<th>Asset</th>
<th>Quantity</th>
<th>Date</th>
</tr>

</thead>

<tbody>

{data.map((row,i)=>(

<tr key={i}>
<td>{row.base_name}</td>
<td>{row.asset}</td>
<td>{row.quantity}</td>
<td>{row.purchase_date}</td>
</tr>

))}

</tbody>

</table>

</Layout>

)

}

export default Purchases