export enum OpportunityStatusEnum {
  new = 'new',
  closedWon = 'closedWon',
  closedLost = 'closedLost'
}

export interface Opportunity {
  id: string
  name: string
  status: OpportunityStatusEnum
}
