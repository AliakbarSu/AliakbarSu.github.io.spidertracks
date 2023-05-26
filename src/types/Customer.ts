import { Opportunity } from './Opportunity'

export enum CustomerStatusEnum {
  active = 'Active',
  inactive = 'Non-Active',
  lead = 'Lead'
}

export interface Customer {
  id: string
  name: string
  email: string
  created_at: string
  status: CustomerStatusEnum
  opportunities: Opportunity[]
}
