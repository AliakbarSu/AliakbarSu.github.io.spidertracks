import { FormEvent, useEffect, useState } from "react"
import { OpportunityStatusEnum } from "types/Opportunity"
import { Link, useLocation, useParams, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "hooks/store"
import { addCustomerOpportunity, selectCustomers, updateOpportunity } from "store/customer"
import { selectUpdating } from "store/UI"


const AddUpdateBtn = ({ mode }: { mode: "add" | "update" }) => {
    const updating = useAppSelector(selectUpdating)
    const text = updating ? (<><svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
    </svg>
        {mode == "add" ? "Adding..." : "Updating..."}</>) : mode == "add" ? "Add" : "Update"
    return <button
        type="submit"
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
        {text}
    </button>

}

type AvailableStatus = { id: string, title: string, description: string, value: OpportunityStatusEnum }

const availableStatus: AvailableStatus[] = [
    {
        id: "new",
        title: "New",
        description: "When a new opportunity is created.",
        value: OpportunityStatusEnum.new
    },
    {
        id: "closedLost",
        title: "Closed Lost",
        description: "When an opportunity is closed as lost.",
        value: OpportunityStatusEnum.closedLost
    },
    {
        id: "closedWon",
        title: "Closed Won",
        description: "When an opportunity is closed as won.",
        value: OpportunityStatusEnum.closedWon
    }
]
const OpportunityForm = () => {
    const customers = useAppSelector(selectCustomers)
    const [mode, setMode] = useState<"add" | "update">("add")
    const [optData, setOptData] = useState<{ id: string; name: string, status: OpportunityStatusEnum }>({
        id: "",
        name: "",
        status: OpportunityStatusEnum.new
    })
    const location = useLocation()
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const onAddOpportunityHandler = () => {
        const customerId = params.customerId as string
        return dispatch(addCustomerOpportunity({ customerId, name: optData.name, status: optData.status }))
    }

    const onUpdateOpportunityHandler = () => {
        const customerId = params.customerId as string
        const { id, name, status } = optData
        return dispatch(updateOpportunity({ id, customerId, name, status }))
    }

    const onNameChangeHandler = (event: FormEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value
        setOptData((prev) => ({ ...prev, name: value }))
    }

    const onStatusChangeHandler = (event: FormEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value as OpportunityStatusEnum
        setOptData((prev) => ({ ...prev, status: value }))
    }

    const onFormSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (mode === "add") {
            await onAddOpportunityHandler()
        } else {
            await onUpdateOpportunityHandler()
        }
        navigate(`/`)

    }

    useEffect(() => {
        if (location.pathname.includes("/add")) {
            setMode("add")
        } else {
            setMode("update")
        }
    }, [location])

    useEffect(() => {
        if (params.id) {
            const customerId = params.customerId as string
            const foundItem = customers.find((customer) => customer.id === customerId)?.opportunities.find((opportunity) => opportunity.id === params.id)
            if (!foundItem) return
            setOptData(() => ({ ...foundItem }))
        }
    }, [params])

    return (
        <form onSubmit={onFormSubmitHandler}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">{mode === "add" ? "New Opportunity" : "Update Opportunity"}</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">{mode === "add" ? "Add a new opportunity" : "Update current opportunity"}</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Opportunity Name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    value={optData.name}
                                    onChange={onNameChangeHandler}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Status</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Select a status for this opportunity.
                    </p>

                    <div className="mt-10 space-y-10">
                        <fieldset>

                            <div className="mt-6 space-y-6">
                                {availableStatus.map((status) => (
                                    <div key={status.id} className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id={status.id}
                                                name="status"
                                                type="radio"
                                                value={status.value}
                                                defaultChecked={status.value === optData.status}
                                                onChange={onStatusChangeHandler}
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor={status.id} className="font-medium text-gray-900">
                                                {status.title}
                                            </label>
                                            <p className="text-gray-500">{status.description}</p>
                                        </div>
                                    </div>
                                ))}


                            </div>
                        </fieldset>

                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link to="/" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </Link>
                <AddUpdateBtn mode={mode} />
            </div>
        </form>
    )
}

export default OpportunityForm
