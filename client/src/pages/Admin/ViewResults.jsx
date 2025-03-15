import { useEffect, useState } from "react";
import Sidebar from "../../components/SideBar";
import axios from "axios"

const ViewResults = () => {

  const [results, setResults] = useState(null)

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/blockchain/getResults')
    .then(response => {
      setResults(response.data)
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
        <h1 className="text-2xl font-bold mb-6">Election Results</h1>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-3 text-left">Candidate</th>
                <th className="border border-gray-300 p-3 text-left">Party</th>
                <th className="border border-gray-300 p-3 text-center">Votes</th>
              </tr>
            </thead>
            <tbody>
              {results &&
              results.map((candidate, index) => (
                <tr key={index} className="border border-gray-300 hover:bg-gray-100">
                  <td className="border border-gray-300 p-3 flex items-center space-x-2">
                    <img src={candidate.logo} alt="Party Logo" className="w-8 h-8 rounded-full"/>
                    <span>{candidate.name}</span>
                  </td>
                  <td className="border border-gray-300 p-3">{candidate.party}</td>
                  <td className="border border-gray-300 p-3 text-center font-bold">{candidate.voteCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewResults;
