import { useEffect, useState } from "react";
import Layout from "../layout/layout";
import API from "../services/api";

function Dashboard() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 5;

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    const res = await API.get("/dashboard");
    setData(res.data);
  };

  //Search Filter
  const filteredData = data.filter((row) =>
    `${row.base_name} ${row.asset}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  //Pagination Logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  //Totals (based on filtered data)
  const totalPurchases = filteredData.reduce(
    (a, b) => a + Number(b.purchases || 0),
    0,
  );
  const totalTransfers = filteredData.reduce(
    (a, b) => a + Number(b.transfer_in || 0),
    0,
  );
  const totalAssignments = filteredData.reduce(
    (a, b) => a + Number(b.assignments || 0),
    0,
  );
  const totalExpended = filteredData.reduce(
    (a, b) => a + Number(b.expended || 0),
    0,
  );

  return (
    <Layout>
      <h1>Military Asset Dashboard</h1>

      {/*Search Bar */}
      <input
        type="text"
        placeholder="Search by Base or Asset..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        style={{
          padding: "10px",
          marginBottom: "20px",
          width: "300px",
        }}
      />

      {/*Summary Cards */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <Card title="Total Purchases" value={totalPurchases} />
        <Card title="Total Transfers" value={totalTransfers} />
        <Card title="Total Assignments" value={totalAssignments} />
        <Card title="Total Expenditure" value={totalExpended} />
      </div>

      {/*Table */}
      <table border="1" cellPadding="10" width="100%">
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
          {currentRows.map((row, i) => {
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

      {/*Pagination Controls */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {Math.ceil(filteredData.length / rowsPerPage)}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={indexOfLastRow >= filteredData.length}
        >
          Next
        </button>
      </div>
    </Layout>
  );
}

// 💡 Reusable Card Component (clean UI)
function Card({ title, value }) {
  return (
    <div
      style={{
        background: "#e2e8f0",
        padding: "20px",
        borderRadius: "10px",
        minWidth: "150px",
        textAlign: "center",
      }}
    >
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}

export default Dashboard;
