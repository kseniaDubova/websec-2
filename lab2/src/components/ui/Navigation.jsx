// import { useState } from 'react'
// import '../App.css'
import {Link} from 'react-router-dom'

function Navigation() {
  // const [station, getStation] = useState(Array, null)

  return (
    <nav className='UINavigation'>
        <Link to='/'>Главная</Link>
        {/* <Link to='/one-stop'>Остановка</Link> */}
        <Link to='/two-stops'>Выбрать маршрут</Link>
    </nav>
  )
}

export default Navigation