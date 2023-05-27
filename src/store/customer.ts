import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'store/index'
import { Customer, CustomerStatusEnum } from 'types/Customer'
import {
  addOpportunityApi,
  getCustomers,
  updateCustomerStatusApi,
  updateOpportunityApi
} from 'libs/api'
import { OpportunityStatusEnum } from 'types/Opportunity'
import { setLoading, setUpdating } from './UI'

interface CustomerState {
  customers: Customer[]
}

const initialState: CustomerState = {
  customers: []
}

export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.customers = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(updateCustomerStatus.fulfilled, (state, action) => {
      const updatedCustomer = state.customers.map((customer) => {
        return customer.id === action.meta.arg.id
          ? { ...customer, status: action.meta.arg.status }
          : customer
      })
      state.customers = updatedCustomer
    })
    builder.addCase(updateOpportunity.fulfilled, (state, action) => {
      const { customerId } = action.meta.arg
      const { id, name, status } = action.meta.arg
      const customer = state.customers.find(({ id }) => id === customerId)
      if (!customer) return
      const opportunities = customer?.opportunities.map((opt) =>
        opt.id === id ? { id, name, status } : opt
      )
      state.customers = state.customers.map((customer) =>
        customer.id === customerId ? { ...customer, opportunities } : customer
      )
    })
    builder.addCase(addCustomerOpportunity.fulfilled, (state, action) => {
      const { customerId } = action.meta.arg
      const opotunity = action.payload.data
      state.customers = state.customers.map((customer) => {
        if (customer.id === customerId) {
          customer.opportunities.push(opotunity)
        }
        return customer
      })
    })
  }
})

export const updateCustomerStatus = createAsyncThunk(
  'customers/updateCustomerStatus',
  async (
    { id, status }: { id: string; status: CustomerStatusEnum },
    thunkAPI
  ) => {
    try {
      thunkAPI.dispatch(setUpdating(true))
      const result = await updateCustomerStatusApi({ id, status })
      return result
    } finally {
      thunkAPI.dispatch(setUpdating(false))
    }
  }
)

export const loadCustomers = createAsyncThunk(
  'customers/loadCustomers',
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true))
      const customers = await getCustomers()
      thunkAPI.dispatch(setCustomers(customers))
      return customers
    } finally {
      thunkAPI.dispatch(setLoading(false))
    }
  }
)

export const addCustomerOpportunity = createAsyncThunk(
  'customers/addCustomerOpportunity',
  async (
    {
      customerId,
      name,
      status
    }: { customerId: string; name: string; status: OpportunityStatusEnum },
    thunkAPI
  ) => {
    try {
      thunkAPI.dispatch(setUpdating(true))
      const result = await addOpportunityApi({ customerId, name, status })
      return result
    } finally {
      thunkAPI.dispatch(setUpdating(false))
    }
  }
)

export const updateOpportunity = createAsyncThunk(
  'customers/updateOpportunity',
  async (
    {
      customerId,
      id,
      name,
      status
    }: {
      id: string
      customerId: string
      name: string
      status: OpportunityStatusEnum
    },
    thunkAPI
  ) => {
    try {
      thunkAPI.dispatch(setUpdating(true))
      const result = await updateOpportunityApi({
        id,
        customerId,
        name,
        status
      })
      return result
    } finally {
      thunkAPI.dispatch(setUpdating(false))
    }
  }
)

export const { setCustomers } = customersSlice.actions

export const selectCustomers = (state: RootState) => state.customers.customers

export default customersSlice.reducer
