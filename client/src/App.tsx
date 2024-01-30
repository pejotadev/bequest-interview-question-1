import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:8080";

function App() {
  const [data, setData] = useState<string>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch(`${API_URL}/blockchain/last`);
    
    console.log(response);
    const { data } = await response.json();
    setData(data);
  };

  const updateData = async () => {
    await fetch(`${API_URL}/blockchain/`, {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    await getData();
  };

  const verifyData = async () => {
    
    const response = await fetch(`${API_URL}/blockchain/validate`);
    if(response.status === 200){
      alert("Data is valid");
    }
    else{
      alert("Data is not valid");
    }
  };

  const recoveringChainFromDatabase = async () => {
    const response = await fetch(`${API_URL}/blockchain/recover`);
    if(response.status === 200){
      alert("Data recovered");
    }
    else{
      alert("Data is not valid in database");
    }
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        position: "absolute",
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
        fontSize: "30px",
      }}
    >
      <div>Saved Data</div>
      <input
        style={{ fontSize: "30px" }}
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <button style={{ fontSize: "20px" }} onClick={updateData}>
          Update Data
        </button>
        <button style={{ fontSize: "20px" }} onClick={verifyData}>
          Verify Data
        </button>
        <button style={{ fontSize: "20px" }} onClick={recoveringChainFromDatabase}>
          Recover Data
        </button>
      </div>
    </div>
  );
}

export default App;
