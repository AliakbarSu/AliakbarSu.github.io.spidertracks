import { FormEvent, useEffect, useState } from "react"
import { OpportunityStatusEnum } from "types/Opportunity"
import { Link, useLocation, useParams, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "hooks/store"
import { addCustomerOpportunity, selectCustomers, updateOpportunity } from "store/customer"
import { selectUpdating } from "store/UI"
import LoadingSpinner from "components/UI/LoadingSpinner"


const AddUpdateBtn = ({ mode }: { mode: "add" | "update" }) => {
    const updating = useAppSelector(selectUpdating)
    const text = mode == "add" ? "Add" : "Update"
    const loadingText = mode == "add" ? "Adding..." : "Updating..."
    return <button
        type="submit"
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
        <LoadingSpinner loading={updating} text={text} loadingText={loadingText} />
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

    const isChecked = (value: OpportunityStatusEnum) => {
        return value === optData.status
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
                                                checked={isChecked(status.value)}
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
