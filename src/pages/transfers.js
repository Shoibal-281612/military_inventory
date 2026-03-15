import Layout from "../layout/layout";

function Transfers(){

return(

<Layout>

<h2>Transfer Assets</h2>

<form>

<input placeholder="Asset ID"/>

<br/><br/>

<input placeholder="From Base"/>

<br/><br/>

<input placeholder="To Base"/>

<br/><br/>

<button>Transfer</button>

</form>

</Layout>

)

}

export default Transfers;