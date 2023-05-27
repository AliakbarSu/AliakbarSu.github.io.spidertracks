import { CustomerStatusEnum } from 'types/Customer'
import { Opportunity, OpportunityStatusEnum } from 'types/Opportunity'
import axios from 'axios'

export const updateCustomerStatusApi = async ({
  id,
  status
}: {
  id: string
  status: CustomerStatusEnum
}): Promise<string> => {
  const result = await axios.put(
    `${import.meta.env.VITE_API_URL}/customers/${id}/update`,
    { status },
    {
      headers: { 'Content-Type': 'application/json' }
    }
  )
  return result.data
}

export const addOpportunityApi = async ({
  customerId,
  name,
  status
}: {
  customerId: string
  name: string
  status: OpportunityStatusEnum
}): Promise<{ message: string; data: Opportunity }> => {
  const result = await axios.post(
    `${import.meta.env.VITE_API_URL}/customers/${customerId}/opportunities/add`,
    { name, status },
    {
      headers: { 'Content-Type': 'application/json' }
    }
  )
  return result.data
}

export const updateOpportunityApi = async ({
  customerId,
  id,
  name,
  status
}: {
  customerId: string
  id: string
  name: string
  status: OpportunityStatusEnum
}): Promise<string> => {
  const result = await axios.put(
    `${
      import.meta.env.VITE_API_URL
    }/customers/${customerId}/opportunities/update`,
    { id, name, status },
    {
      headers: { 'Content-Type': 'application/json' }
    }
  )
  return result.data
}

export const getCustomers = async () => {
  const result = await axios.get(`${import.meta.env.VITE_API_URL}/customers`, {
    headers: { 'Content-Type': 'application/json' }
  })
  return result.data
}
