
import {
  createBrowserRouter,
} from "react-router-dom";
import App from "../App.tsx"
import OpportunityForm from "components/opportunity/OpportunityForm.tsx";
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
  {
    path: "/opportunities/add/:customerId",
    Component: OpportunityForm
  },
  {
    path: ":customerId/opportunities/update/:id",
    Component: OpportunityForm
  }
]);