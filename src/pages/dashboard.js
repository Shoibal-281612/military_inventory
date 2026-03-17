import { useEffect, useState } from "react";
import Layout from "../layout/layout";
import API from "../services/api";

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    const res = await API.get("/dashboard");
    setData(res.data);
  };

  const totalPurchases = data.reduce((a, b) => a + Number(b.purchases || 0), 0);
  const totalTransfers = data.reduce(
    (a, b) => a + Number(b.transfer_in || 0),
    0,
  );
  const totalAssignments = data.reduce(
    (a, b) => a + Number(b.assignments || 0),
    0,
  );
  const totalExpended = data.reduce((a, b) => a + Number(b.expended || 0), 0);

  return (
    <Layout>
      <h1>Military Asset Dashboard</h1>

      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div style={{ background: "#e2e8f0", padding: "20px" }}>
          Total Purchases
          <h2>{totalPurchases}</h2>
        </div>

        <div style={{ background: "#e2e8f0", padding: "20px" }}>
          Total Transfers
          <h2>{totalTransfers}</h2>
        </div>

        <div style={{ background: "#e2e8f0", padding: "20px" }}>
          Total Assignments
          <h2>{totalAssignments}</h2>
        </div>

        <div style={{ background: "#e2e8f0", padding: "20px" }}>
          Total Expenditure
          <h2>{totalExpended}</h2>
        </div>
      </div>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Base</th>
            <th>Asset</th>
            <th>Purchases</th>
            <th>Transfer In</th>
            <th>Transfer Out</th>
            <th>Assignments</th>
            <th>Expended</th>
            <th>Current Inventory</th>
            <th>Net Movement</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => {
            const net =
              Number(row.purchases) +
              Number(row.transfer_in) -
              Number(row.transfer_out);

            return (
              <tr key={i}>
                <td>{row.base_name}</td>
                <td>{row.asset}</td>
                <td>{row.purchases}</td>
                <td>{row.transfer_in}</td>
                <td>{row.transfer_out}</td>
                <td>{row.assignments}</td>
                <td>{row.expended}</td>
                <td>{row.current_inventory}</td>
                <td>{net}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
}

export default Dashboard;
