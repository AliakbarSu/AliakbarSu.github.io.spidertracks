import { Customer, CustomerStatusEnum } from "../types/Customer"
import CustomerComponent from "components/Customer"
import { useLoaderData } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "hooks/store"
import { selectCustomers, setCustomers } from "store/customer"
import { useEffect, useState } from "react"
import Filters from "components/Filters"
import { selectLoading } from "store/UI"
import ListSkeleton from "components/UI/ListSkeleton"


export default function Customers() {
    const dispatch = useAppDispatch()
    const customers = useLoaderData() as Customer[]
    const data = useAppSelector(selectCustomers)
    const [filters, setFilters] = useState<CustomerStatusEnum[]>([CustomerStatusEnum.active, CustomerStatusEnum.inactive, CustomerStatusEnum.lead])
    const [sortOrder, setSortOrder] = useState<number>(1)
    const loading = useAppSelector(selectLoading)

    const filterAndSort = (
    ): Customer[] => {
        // Filters and sort the customers array based on the filters and sort order
        const filteredItems = customers.filter((item) => filters.includes(item.status));
        return filteredItems.sort((a, b) => {
            return a.name.localeCompare(b.name) ? sortOrder : -sortOrder;
        });
    }

    useEffect(() => {
        const sortedCustomers = filterAndSort()
        dispatch(setCustomers(sortedCustomers))
    }, [customers, filters, sortOrder])
    return (
        <>
            <Filters onSort={setSortOrder} onFilters={setFilters} />
            {!loading && <ul role="list" className="divide-y divide-gray-100">
                {data.map((customer) => (
                    <CustomerComponent key={customer.id} customer={customer} />
                ))}
            </ul>}
            {loading && <ListSkeleton />}
        </>
    )
}
