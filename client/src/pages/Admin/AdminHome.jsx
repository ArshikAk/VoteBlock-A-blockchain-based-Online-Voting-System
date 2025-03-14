
import { useEffect } from "react";
import Sidebar from "../../components/SideBar";
import axios from "axios"

const AdminHome = () => {

  const totalVoters = 1200;
  const totalCandidates = 10;
  const totalVotes = 950;
  const voterTurnout = ((totalVotes / totalVoters) * 100).toFixed(2);


  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/admin/getDashBoardData')
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    })
  },[])



  return (
    <div className="flex">
     
      <Sidebar />

      
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-10">

          <div className="bg-white p-4 shadow-md rounded-lg text-center">
            <h2 className="text-lg font-semibold text-gray-700">Total Registered Voters</h2>
            <p className="text-3xl font-bold text-blue-600">{totalVoters}</p>
          </div>

         
          <div className="bg-white p-4 shadow-md rounded-lg text-center">
            <h2 className="text-lg font-semibold text-gray-700">Total Candidates</h2>
            <p className="text-3xl font-bold text-green-600">{totalCandidates}</p>
          </div>

         
          <div className="bg-white p-4 shadow-md rounded-lg text-center">
            <h2 className="text-lg font-semibold text-gray-700">Total Votes Cast</h2>
            <p className="text-3xl font-bold text-red-600">{totalVotes}</p>
          </div>

       
          <div className="bg-white p-4 shadow-md rounded-lg text-center">
            <h2 className="text-lg font-semibold text-gray-700">Voter Turnout (%)</h2>
            <p className="text-3xl font-bold text-purple-600">{voterTurnout}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
