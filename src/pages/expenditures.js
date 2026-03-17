import Layout from "../layout/layout";

function Expenditure() {
  return (
    <Layout>
      <h2>Expenditure</h2>

      <form>
        <input placeholder="Asset" />

        <br />
        <br />

        <input placeholder="Cost" />

        <br />
        <br />

        <button>Add Expense</button>
      </form>
    </Layout>
  );
}

export default Expenditure;
