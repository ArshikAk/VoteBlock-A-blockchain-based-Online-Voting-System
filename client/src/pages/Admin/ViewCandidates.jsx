import { useEffect, useState } from "react";
import Sidebar from "../../components/SideBar"
import axios from "axios"



const ViewCandidates = () => {

    const [candidates, setCandidates] = useState(null)

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/user/getCandidateData")
        .then(response => {
            setCandidates(response.data)
            console.log(response.data)
        })
        .catch(error => {
            console.error(error);
        })
    },[])

  return (
    <div className="flex">
     
      <Sidebar />


      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">View Candidates</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {candidates &&
          candidates.map((candidate) => (
            <div
              key={candidate._id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center border border-black border-solid m-10 cursor-pointer"
            >
              
              <img
                src={candidate.profile}
                alt={candidate.name}
                className="w-24 h-24 rounded-full mb-3"
              />

              
              <h2 className="text-lg font-semibold">{candidate.name}</h2>

              
              <div className="flex items-center mt-2">
                <img
                  src={candidate.logo}
                  alt={candidate.party}
                  className="w-8 h-8 mr-2"
                />
                <p className="text-gray-600">{candidate.party}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewCandidates;

