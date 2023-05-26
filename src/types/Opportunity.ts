export enum OpportunityStatusEnum {
  new = 'New',
  closedWon = 'Closed Won',
  closedLost = 'Closed Lost'
}

export interface Opportunity {
  id: string
  name: string
  status: OpportunityStatusEnum
}
