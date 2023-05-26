import { FormEvent, Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CustomerStatusEnum } from 'types/Customer'
import { useAppSelector } from 'hooks/store'
import { selectUpdating } from 'store/UI'
import LoadingSpinner from 'components/UI/LoadingSpinner'


type AvailableStatus = { id: string, title: string, value: CustomerStatusEnum }

const availableStatus: AvailableStatus[] = [
    {
        id: "active",
        title: "Active",
        value: CustomerStatusEnum.active
    },
    {
        id: "inactive",
        title: "Inactive",
        value: CustomerStatusEnum.inactive
    },
    {
        id: "lead",
        title: "Lead",
        value: CustomerStatusEnum.lead
    }
]

type StatusModalProps = { open: boolean, onUpdate: (status: CustomerStatusEnum) => void, onClose: () => void, status: CustomerStatusEnum }
const StatusModal = ({ status: customerStatus, open, onUpdate, onClose, ...props }: StatusModalProps) => {
    const [newStatus, setNewStatus] = useState<CustomerStatusEnum>(CustomerStatusEnum.active)
    const updating = useAppSelector(selectUpdating)

    const onUpdateStatus = () => {
        onUpdate(newStatus)
    }

    const onRadioUpdate = (event: FormEvent) => {
        const value = (event.target as any)?.value as unknown as CustomerStatusEnum
        setNewStatus(value)
    }

    return (
        <Transition.Root show={open} as={Fragment} {...props}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <div>
                                    <label className="text-base font-semibold text-gray-900">Customer Status</label>
                                    <p className="text-sm text-gray-500">Customer new status</p>
                                    <fieldset className="mt-4">
                                        <legend className="sr-only">Customer Status</legend>
                                        <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                            {availableStatus.map((status) => (
                                                <div key={status.id} className="flex items-center">
                                                    <input
                                                        id={status.id}
                                                        name="notification-method"
                                                        type="radio"
                                                        defaultChecked={status.value === customerStatus}
                                                        onChange={onRadioUpdate}
                                                        value={status.value}
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor={status.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                                                        {status.title}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </fieldset>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        onClick={() => onUpdateStatus()}
                                    >
                                        <LoadingSpinner loading={updating} text='Update' loadingText='Updating...' />
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}


export default StatusModal