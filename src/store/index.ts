import { configureStore } from '@reduxjs/toolkit'
import customerSlice from 'store/customer'
import uiSlice from 'store/UI'

export const store = configureStore({
  reducer: {
    customers: customerSlice,
    UI: uiSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
