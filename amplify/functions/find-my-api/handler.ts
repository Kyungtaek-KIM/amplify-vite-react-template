import type { APIGatewayProxyHandler } from "aws-lambda"
import type { Schema } from "../../data/resource"
import { generateClient } from "aws-amplify/data"
import { Amplify } from 'aws-amplify'
import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime'
import { env } from '$amplify/env/find-my-api'

const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(env)
Amplify.configure(resourceConfig, libraryOptions)
const client = generateClient<Schema>()

export const handler: APIGatewayProxyHandler = async (event) => {
    console.log("event", event)
    if (event.httpMethod == 'GET')
    {
      const { data: items, errors } = await client.models.TokenRequest.list()
      if (errors != undefined)
      {
        console.log(errors)
      }
      return {
        statusCode: 200,
        // Modify the CORS settings below to match your specific requirements
        headers: {
          "Access-Control-Allow-Origin": "*", // Restrict this to domains you trust
          "Access-Control-Allow-Headers": "*", // Specify only the headers you need to allow
        },
        body: JSON.stringify(items),   
      }
    }
    return {
        statusCode: 200,
        // Modify the CORS settings below to match your specific requirements
        headers: {
          "Access-Control-Allow-Origin": "*", // Restrict this to domains you trust
          "Access-Control-Allow-Headers": "*", // Specify only the headers you need to allow
        },
        body: JSON.stringify("Hello from myFunction!"),   
    }
}
