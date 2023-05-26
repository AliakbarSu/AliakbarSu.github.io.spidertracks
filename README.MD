# Spidertracks Customer Management Mock App

This is a React SPA application with a backend built using the Serverless Framework.

## Description

This is a react application that allows the user to filter through a list of customers, add sales opportunity to a specific customer, and update the status of a customer.

## Features

- Filter and sort customers
- Update customer status
- Add sales opportunities to customers
- Update sales opportunity's status

## Technologies Used

- ReactJS
- Serverless Framework
- Redux toolkit
- React Router

## Getting Started

### Prerequisites

- Node.js (version 16.x.x)
- Serverless Framework CLI
- Yarn (or you could use npm)

### Installation

1. Clone the repository:

   ```shell
      git clone git@github.com:AliakbarSu/AliakbarSu.github.io.spidertracks.git
   ```

2. Clone the repository:

   ```shell
       cd Spidertracks
       yarn install
   ```

### Configuration

`NOTE` This project already comes with a deployed backend so only do the next steps if you want to deploy the backend on a different AWS account

1. Configure your aws credentials in order to deploy your backend on AWS

   ```shell
      serverless config credentials \
      --provider aws \
      --key YOUR_ACCESS_KEY \
      --secret YOUR_SECRET_KEY
   ```

2. Navigate to the `server` folder
   ```shell
   cd server
   ```
3. Deploy the backend
   ```shell
   serverless deploy
   ```
4. Update the `VITE_API_URL` inside the `.env` with the new api url

### Development

1. Start the development server:

   ```shell
    npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173` to see the application running.

### Usage

1. View a customer's sales opportunities by clicking on the customer email address
2. To update a customer's status, click on menu icon next to the customer status and select "Update Status"
