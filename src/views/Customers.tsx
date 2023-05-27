import { Customer, CustomerStatusEnum } from "../types/Customer"
import CustomerComponent from "components/Customer"
import { useAppDispatch, useAppSelector } from "hooks/store"
import { loadCustomers, selectCustomers } from "store/customer"
import { useEffect, useState } from "react"
import Filters from "components/Filters"
import { selectLoading } from "store/UI"
import ListSkeleton from "components/UI/ListSkeleton"


export default function Customers() {
    const dispatch = useAppDispatch()
    const customers = useAppSelector(selectCustomers)
    const [filters, setFilters] = useState<CustomerStatusEnum[]>([CustomerStatusEnum.active, CustomerStatusEnum.inactive, CustomerStatusEnum.lead])
    const [sortOrder, setSortOrder] = useState<number>(1)
    const loading = useAppSelector(selectLoading)
    const [sortedCustomers, setSortedCustomers] = useState<Customer[]>([])

    const filterAndSort = (data: Customer[] = customers,
    ): Customer[] => {
        // Filters and sort the customers array based on the filters and sort order
        const filteredItems = data.filter((item) => filters.includes(item.status));
        return filteredItems.sort((a, b) => {
            return sortOrder === 1 ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        });
    }

    useEffect(() => {
        const sortedData = filterAndSort(customers)
        setSortedCustomers(sortedData)
    }, [customers, filters, sortOrder])

    useEffect(() => {
        const loadData = async () => {
            // avoid excessive data fetch
            if (customers.length > 0) return
            dispatch(loadCustomers())
        }
        void loadData()
    }, [])
    return (
        <>
            <Filters onSort={setSortOrder} onFilters={setFilters} />
            {!loading && <ul role="list" className="divide-y divide-gray-100">
                {sortedCustomers.map((customer) => (
                    <CustomerComponent key={customer.id} customer={customer} />
                ))}
            </ul>}
            {loading && <ListSkeleton />}
        </>
    )
}
