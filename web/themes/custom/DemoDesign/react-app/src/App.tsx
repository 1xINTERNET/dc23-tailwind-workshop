import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <>
      <h1 className='bg-brand-dark text-white rounded-full'>
        Design demo React app
      </h1>
      <div className='flex my-3'>
        <img
          alt='Vite Logo'
          className='block h-12 mx-auto'
          src={viteLogo}
        />
        <img
          alt='React Logo'
          className='block h-12 mx-auto'
          src={reactLogo}
        />
      </div>
      <p className='my-3'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
