const AWS = require('aws-sdk')

const dynamo = new AWS.DynamoDB.DocumentClient()

const CUSTOMERS_TABLE = process.env.TABLE_NAME

const listCustomers = async () => {
  const params = {
    TableName: CUSTOMERS_TABLE
  }
  return dynamo.scan(params).promise()
}

const getCustomerById = async (id) => {
  const params = {
    TableName: CUSTOMERS_TABLE,
    Key: {
      id
    }
  }
  return dynamo.get(params).promise()
}

const updateCustomerStatus = async (id, status) => {
  const customer = await getCustomerById(id)
  const params = {
    TableName: CUSTOMERS_TABLE,
    Item: { id, ...customer.Item, status }
  }

  return await dynamo.put(params).promise()
}

const addOpportunity = async (id, opportunity) => {
  const customer = await getCustomerById(id)
  const params = {
    TableName: CUSTOMERS_TABLE,
    Item: {
      ...customer.Item,
      opportunities: [...(customer.Item?.opportunities || []), opportunity]
    }
  }

  return await dynamo.put(params).promise()
}

const updateOpportunity = async (customerId, opportunity) => {
  const customer = await getCustomerById(customerId)
  const { opportunities } = customer.Item
  const updatedOpportunities = opportunities.map((op) => {
    return op.id === opportunity.id ? opportunity : op
  })
  const params = {
    TableName: CUSTOMERS_TABLE,
    Item: { ...customer.Item, opportunities: updatedOpportunities }
  }

  return await dynamo.put(params).promise()
}

module.exports = {
  listCustomers,
  addOpportunity,
  updateCustomerStatus,
  updateOpportunity
}
