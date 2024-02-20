import Sidebar from "../components/Home/SideBar"
import "../components/Home/index.css"
import Navbar from "../features/NavBar/NavBar"

function Home() {

  return (
    <div className='grid h-screen'>
      <Sidebar/>
      <div>
        <Navbar/>
      </div>
    </div>
  )
}

export default Home