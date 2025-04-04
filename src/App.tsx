import { useState } from "react"
import { get } from 'aws-amplify/api'

function App() {
  // const [tokenCount, setTokenCount] = useState<number>(0)
  const [tokenRequestItems, setTokenRequestItems] = useState<string | undefined>("")
  

  // const addTokenRequest =  async(nbToken: number) => {
  //   // TODO: Request token from lambda
  //   // Get Request ID and add it to RDS
  //   await client.models.TokenRequest.create({
  //     RequestId: "06a2cae3-8aed-475d-18f2-ea30c2c8d11d",
  //     ppid: "215445-000027",
  //     count: nbToken,
  //     RequestTime: new Date().toISOString()
  //   })

  //   const { data: items, errors } = await client.models.TokenRequest.list()
  //   if (errors != undefined)
  //   {
  //     console.log(errors)
  //   }
  //   setTokenRequest(items)
  // }

  async function getItem() {
    try {
      const restOperation = get({ 
          apiName: 'find-my-api',
          path: 'token_request'
      })
      const response = await restOperation.response
      const json = await response.body.text()
      console.log(json)
      setTokenRequestItems(json)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main>
      <h1>FindMyManufacturing API</h1>
      <button onClick={getItem}>GetTokenRequest</button>
      <div>
        {tokenRequestItems}
      </div>
      {/* <input value={tokenCount} onChange={evt => setTokenCount(Number(evt.target.value))}/> */}
      {/* <button onClick={() => addTokenRequest(tokenCount)}>Test creating Token</button> */}
    </main>
  )
}

export default App
