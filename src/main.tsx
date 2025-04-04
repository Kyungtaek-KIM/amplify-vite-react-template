import React from "react"
import ReactDOM from "react-dom/client"
import { Amplify } from "aws-amplify"
import { parseAmplifyConfig } from "aws-amplify/utils"

import outputs from "../amplify_outputs.json"
import App from "./App.tsx"
import "./index.css"

const amplifyConfig = parseAmplifyConfig(outputs)

Amplify.configure(
  {
    ...amplifyConfig,
    API: {
      ...amplifyConfig.API,
      REST: outputs.custom.API,
    },
  }
)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
