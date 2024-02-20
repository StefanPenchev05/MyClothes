import Sidebar from "../components/Home/SideBar"
import "../components/Home/index.css"
import Header from "../components/UserStats/Header";


function UserStats() {

  return (
    <div className='grid h-screen'>
      <Sidebar/>
      <div>
        <Header/>
      </div>
    </div>
  )
}

export default UserStats;