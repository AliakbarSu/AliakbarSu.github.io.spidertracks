import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Customer, CustomerStatusEnum } from 'types/Customer'
import StatusModal from "./StatusModal"
import Opportunities from './opportunity/Opportunity'
import { useAppDispatch } from 'hooks/store'
import { updateCustomerStatus } from 'store/customer'




function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Status = ({ status }: { status: CustomerStatusEnum }) => {
    if (status === CustomerStatusEnum.active) {
        return (
            <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs leading-5 text-gray-500">Active</p>
            </div>
        )
    } else if (status === CustomerStatusEnum.inactive) {
        return (
            <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-red-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                </div>
                <p className="text-xs leading-5 text-gray-500">Inactive</p>
            </div>
        )
    } else {
        return (
            <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-indigo-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                </div>
                <p className="text-xs leading-5 text-gray-500">Lead</p>
            </div>
        )
    }
}
export default function Customers({ customer }: { customer: Customer }) {
    const dispatch = useAppDispatch()
    const [modal, setModal] = useState(false)
    const [menu, setMenu] = useState(false)
    const onToggleModal = () => {
        setModal(() => !modal)
    }

    const onUpdateStatusHandler = async (status: CustomerStatusEnum) => {
        await dispatch(updateCustomerStatus({ id: customer.id, status }))
        setModal(false)
    }

    const onToggleMenu = () => {
        setMenu((prev) => !prev)
    }

    const formatDate = (date: string) => {
        const d = new Date(date)
        return d.toLocaleDateString("en-ca", { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })
    }

    return (
        <li key={customer.email} className="flex flex-wrap justify-between gap-x-6 py-5" >
            <StatusModal data-testid="statusModal" status={customer.status} open={modal} onClose={() => setModal(false)} onUpdate={onUpdateStatusHandler} />
            <div className="flex gap-x-4 cursor-pointer w-2/4" onClick={onToggleMenu}>
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">

                        {customer.name}

                    </p>
                    <p className="mt-1 flex text-xs leading-5 text-gray-500">

                        {customer.email}

                    </p>
                    <p className="mt-1 flex text-xs leading-5 text-gray-500">
                        <span className="pr-2">Created at:</span>
                        <time dateTime={customer.created_at}>{formatDate(customer.created_at)}</time>
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between gap-x-6 w-1/6">
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <Status status={customer.status} />
                </div>
                <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                        <span className="sr-only">Open options</span>
                        <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        onClick={onToggleModal}
                                        href="#"
                                        className={classNames(
                                            active ? 'bg-gray-50' : '',
                                            'block px-3 py-1 text-sm leading-6 text-gray-900'
                                        )}
                                    >
                                        Update Status<span className="sr-only">, {customer.name}</span>
                                    </a>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
            {menu && <Opportunities data-testid="opportunities-component" customerId={customer.id
            } opportunities={customer.opportunities} />}
        </li>

    )
}
