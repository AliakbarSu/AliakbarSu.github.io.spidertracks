
import {
  createBrowserRouter,
} from "react-router-dom";
import App from "../App.tsx"
import OpportunityForm from "components/opportunity/OpportunityForm.tsx";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
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