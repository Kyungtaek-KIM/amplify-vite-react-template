import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { schema as generatedSqlSchema } from "./schema.sql";

// Add a global authorization rule

const sqlSchema = generatedSqlSchema
  .setAuthorization((models) => [
    // Model-level authorization rules
    models.TokenRequest.authorization((allow) => [allow.publicApiKey()]),
    models.Token.authorization((allow) => [allow.publicApiKey()]),
  ])
  .addToSchema({
    createNewTokenRequest: a
      .mutation()
      .arguments({
        RequestId: a.string().required(),
        count: a.integer().required(),
        ppid: a.string().required(),
        RequestTime: a.datetime().required(),
      })
      .returns(a.ref("TokenRequest").array())
      .authorization((allow) => allow.publicApiKey())
      .handler(a.handler.sqlReference("./createNewTokenRequest.sql")),
  });

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
});
