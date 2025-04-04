import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { schema as generatedSqlSchema } from "./schema.sql";
import { findMyApi } from "../functions/find-my-api/resource";

// Add a global authorization rule

const sqlSchema = generatedSqlSchema
  .authorization(allow => [allow.publicApiKey(), allow.resource(findMyApi)])
  .addToSchema({
    getTokenRequestById: a
      .query()
      .arguments({
        RequestId: a.string().required(),
      })
      .returns(a.ref("TokenRequest").array())
      .handler(
        a.handler.inlineSql(`
        SELECT *
        FROM TokenRequest
        WHERE RequestId = :RequestId;  
        `)
      )
  })

export type Schema = ClientSchema<typeof sqlSchema>;

export const data = defineData({
  schema: sqlSchema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
})
