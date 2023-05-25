import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'store/index'

interface UIState {
  loading: boolean
  updating: boolean
}

const initialState: UIState = {
  loading: false,
  updating: false
}

export const UISlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload
    },
    setUpdating: (state, { payload }: PayloadAction<boolean>) => {
      state.updating = payload
    }
  }
})

export const { setLoading, setUpdating } = UISlice.actions

export const selectLoading = (state: RootState) => state.UI.loading
export const selectUpdating = (state: RootState) => state.UI.loading

export default UISlice.reducer
