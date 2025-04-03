import { useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [tokenRequest, setTokenRequest] = useState<Schema["TokenRequest"]["type"][]>([]);
  
  const fetchTokeRequest = async () => {
    const { data: items, errors } = await client.models.TokenRequest.list()
    setTokenRequest(items)
    if (errors != undefined)
    {
      console.log(errors)
    }
  }

  const addTokenRequest =  async() => {
    console.log("creating")
    await client.models.TokenRequest.create({
      RequestId: "06a2cae3-8aed-475d-18f2-ea30c2c8d00d",
      ppid: "215445-000027",
      count: 10,
      RequestTime: new Date().toISOString()
    })

    const { data: items, errors } = await client.models.TokenRequest.list()
    if (errors != undefined)
    {
      console.log(errors)
    }
    setTokenRequest(items)
  }

  return (
    <main>
      <h1>FindMyManufacturing API</h1>
      <button onClick={fetchTokeRequest}>GetTokenRequest</button>
      <ul>
        {tokenRequest.map((tokenReq, index) => (
          <li key={index}>{tokenReq.RequestId}</li>
        ))}
      </ul>
      <button onClick={addTokenRequest}>Test creating Token</button>
    </main>
  )
}

export default App;
