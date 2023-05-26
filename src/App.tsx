import './App.css'
import Customers from './views/Customers'

function App() {

  return (
    <>
      <div className="border-b border-gray-200 pb-5">
        <h3 className="text-base font-semibold leading-6 text-gray-900">Customers</h3>
      </div>
      <Customers />
    </>
  )
}

export default App
