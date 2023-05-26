import { Customer } from "../types/Customer"
import CustomerComponent from "../components/Customer"
import { useLoaderData } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "hooks/store"
import { selectCustomers, setCustomers } from "store/customer"
import { useEffect } from "react"

// const customers: Customer[] = [
//     {
//         id: "customer_one",
//         name: 'Leslie Alexander',
//         email: 'leslie.alexander@example.com',
//         opportunities: [
//             {
//                 id: "opportunity_one",
//                 name: "New opportunity",
//                 status: OpportunityStatusEnum.new
//             },
//             {
//                 id: "opportunity_two",
//                 name: "New opportunity",
//                 status: OpportunityStatusEnum.closedLost
//             }
//         ],
//         status: CustomerStatusEnum.active,
//         created_at: '2023-01-23T13:23Z',
//     },
//     {
//         id: "customer_two",
//         name: 'Michael Foster',
//         email: 'michael.foster@example.com',
//         opportunities: [],
//         status: CustomerStatusEnum.active,
//         created_at: '2023-01-23T13:23Z',
//     },
//     {
//         id: "customer_three",
//         name: 'Dries Vincent',
//         email: 'dries.vincent@example.com',
//         opportunities: [],
//         status: CustomerStatusEnum.inactive,
//         created_at: "2023-01-23T13:23Z"
//     },
//     {
//         id: "customer_four",
//         name: 'Lindsay Walton',
//         email: 'lindsay.walton@example.com',
//         opportunities: [],
//         status: CustomerStatusEnum.lead,
//         created_at: '2023-01-23T13:23Z',
//     },
//     {
//         id: "customer_five",
//         name: 'Courtney Henry',
//         email: 'courtney.henry@example.com',
//         opportunities: [],
//         status: CustomerStatusEnum.active,
//         created_at: '2023-01-23T13:23Z',
//     },
//     {
//         id: "customer_six",
//         name: 'Tom Cook',
//         email: 'tom.cook@example.com',
//         opportunities: [],
//         status: CustomerStatusEnum.lead,
//         created_at: '2023-01-23T13:23Z',
//     },
// ]


export default function Customers() {
    const dispatch = useAppDispatch()
    const customers = useLoaderData() as Customer[]
    const data = useAppSelector(selectCustomers)

    useEffect(() => {
        dispatch(setCustomers(customers))
    }, [customers])
    return (
        <ul role="list" className="divide-y divide-gray-100">
            {data.map((customer) => (
                <CustomerComponent key={customer.id} customer={customer} />
            ))}
        </ul>
    )
}
