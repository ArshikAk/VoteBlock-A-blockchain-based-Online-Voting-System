import { useState } from "react";
import Sidebar from "../../components/SideBar";
import axios from "axios"

const AddCandidate = () => {
  const [candidate, setCandidate] = useState({
    name: "",
    party: "",
    logo: "",
    profile: "",
    about: "",
    policies: "",
  });

  const handleChange = (e) => {
    setCandidate({ ...candidate, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Hi")

    axios.post("http://127.0.0.1:8000/api/blockchain/addCandidate",{candidate})
    .then((response) => {
      console.log(response.data);
      if(response.status == 201)
      {
        alert("Candidate Added Successfully");
        setCandidate({
          name: "",
          party: "",
          logo: "",
          profile: "",
          about: "",
          policies: "",
        })
      }
    })
    .catch((error) => {
      console.error(error);
    })

  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex flex-col w-full p-6 justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">Add Candidate</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-lg shadow-2xl w-full max-w-lg border border-black border-solid"
        >

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={candidate.name}
              onChange={handleChange}
              className="w-full p-2 border border-solid border-black my-1 rounded-md"
              placeholder="Enter candidate's name"
              required
            />
          </div>

         
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Party</label>
            <input
              type="text"
              name="party"
              value={candidate.party}
              onChange={handleChange}
              className="w-full p-2 border border-solid border-black my-1 rounded-md"
              placeholder="Enter party name"
              required
            />
          </div>

          
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Party Logo URL</label>
            <input
              type="url"
              name="logo"
              value={candidate.logo}
              onChange={handleChange}
              className="w-full p-2 border border-solid border-black my-1 rounded-md"
              placeholder="Enter logo URL"
              required
            />
          </div>

          
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Profile Image URL</label>
            <input
              type="url"
              name="profile"
              value={candidate.profile}
              onChange={handleChange}
              className="w-full p-2 border border-solid border-black my-1 rounded-md"
              placeholder="Enter profile image URL"
              required
            />
          </div>

          
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">About</label>
            <textarea
              name="about"
              value={candidate.about}
              onChange={handleChange}
              className="w-full p-2 border border-solid border-black my-1 rounded-md"
              placeholder="Short description about the candidate"
              required
            ></textarea>
          </div>

          
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Policies</label>
            <textarea
              name="policies"
              value={candidate.policies}
              onChange={handleChange}
              className="w-full p-2 border border-solid border-black my-1 rounded-md"
              placeholder="Candidate's policies"
              required
            ></textarea>
          </div>

          
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
          >
            Add Candidate
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCandidate;
