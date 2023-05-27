const {
  listCustomers,
  updateCustomerStatus: updateCustomerStatusFunc,
  addOpportunity,
  updateOpportunity: updateOpportunityFunc
} = require('./core/customers')
const uuid = require('uuid').v4

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true
}

const getCustomers = async (event) => {
  try {
    const customers = await listCustomers()
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify(customers.Items)
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: 'Something went wrong'
    }
  }
}

const updateCustomerStatus = async (event) => {
  try {
    const id = event.pathParameters.id
    const body = JSON.parse(event.body)
    const status = body.status
    if (!status) {
      throw new Error('No status provided')
    }
    await updateCustomerStatusFunc(id, status)
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: 'Customer status was updated'
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: 'Something went wrong'
    }
  }
}

const addOpportunityForCustomer = async (event) => {
  try {
    const id = event.pathParameters.id
    const body = JSON.parse(event.body)
    const opportunity = body
    if (!opportunity.name || !opportunity.status) {
      throw new Error('No opportunity provided')
    }
    const data = { ...opportunity, id: uuid() }
    await addOpportunity(id, data)
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ message: 'Opportunity was added', data })
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: 'Something went wrong'
    }
  }
}

const updateOpportunity = async (event) => {
  try {
    const id = event.pathParameters.id
    const opportunity = JSON.parse(event.body)
    if (!opportunity.name || !opportunity.status) {
      throw new Error('No data provided')
    }
    await updateOpportunityFunc(id, opportunity)
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: 'Opportunity was updated'
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: 'Something went wrong'
    }
  }
}

module.exports = {
  getCustomers,
  updateCustomerStatus,
  addOpportunityForCustomer,
  updateOpportunity
}
