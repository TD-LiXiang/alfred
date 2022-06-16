import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App"

import "antd/dist/antd.css"

const root = document.createElement("root")
root.id = "alfred-root"
document.body.appendChild(root)

ReactDOM.createRoot(root).render(
  <Suspense fallback={<></>}>
    <App />
  </Suspense>
)
