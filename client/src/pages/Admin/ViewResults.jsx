import Sidebar from "../../components/SideBar";

const ViewResults = () => {
  const results = [
    { 
      name: "John Doe", 
      party: "Democratic Party", 
      logo: "https://via.placeholder.com/50", 
      votes: 3500 
    },
    { 
      name: "Jane Smith", 
      party: "Republican Party", 
      logo: "https://via.placeholder.com/50", 
      votes: 2800 
    },
    { 
      name: "Alex Johnson", 
      party: "Independent", 
      logo: "https://via.placeholder.com/50", 
      votes: 1200 
    }
  ];

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
              {results.map((candidate, index) => (
                <tr key={index} className="border border-gray-300 hover:bg-gray-100">
                  <td className="border border-gray-300 p-3 flex items-center space-x-2">
                    <img src={candidate.logo} alt="Party Logo" className="w-8 h-8 rounded-full"/>
                    <span>{candidate.name}</span>
                  </td>
                  <td className="border border-gray-300 p-3">{candidate.party}</td>
                  <td className="border border-gray-300 p-3 text-center font-bold">{candidate.votes}</td>
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
