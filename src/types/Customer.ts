import { Opportunity } from './Opportunity'

export enum CustomerStatusEnum {
  active = 'active',
  inactive = 'inactive',
  lead = 'lead'
}

export interface Customer {
  id: string
  name: string
  email: string
  created_at: string
  status: CustomerStatusEnum
  opportunities: Opportunity[]
}
