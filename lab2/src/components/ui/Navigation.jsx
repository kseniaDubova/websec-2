import {Link} from 'react-router-dom'

function Navigation() {

  return (
    <nav className='UINavigation'>
        <Link to='/'>Главная</Link>
        <Link to='/two-stops'>Выбрать маршрут</Link>
    </nav>
  )
}

export default Navigation