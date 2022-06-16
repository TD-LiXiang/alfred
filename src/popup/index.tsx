import React from 'react'
import ReactDOM from 'react-dom/client'

const root = document.createElement('root')
root.id = 'alfred-root'
document.body.appendChild(root)

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <div>Hello World</div>
  </React.StrictMode>
)
