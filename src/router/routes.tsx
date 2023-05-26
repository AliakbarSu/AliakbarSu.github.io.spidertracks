
import {
  createBrowserRouter,
} from "react-router-dom";
import App from "../App.tsx"
import { getCustomers } from "libs/api.ts";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    loader: async () => {
      const customers = await getCustomers()
      return customers
    }
  },
]);