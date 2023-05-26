import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './router/routes'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from "store/index"



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
