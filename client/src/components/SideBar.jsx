/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";


const Sidebar = () => {

    const navigate = useNavigate();

    return (
      <div className="w-64 bg-gray-800 text-white h-screen p-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <ul>
          <li className="py-2 hover:bg-gray-700 px-3 cursor-pointer" onClick={() => navigate("/adminHome")} >Dashboard</li>
          <li className="py-2 hover:bg-gray-700 px-3 cursor-pointer" onClick={() => navigate("/viewCandidates")} >View Candidates</li>
          <li className="py-2 hover:bg-gray-700 px-3 cursor-pointer" onClick={() => navigate("/addCandidate")} >Add Candidate</li>
          <li className="py-2 hover:bg-gray-700 px-3 cursor-pointer" onClick={() => navigate("/viewResults")} >Election Results</li>
        </ul>
      </div>
    );
  };

  export default Sidebar