require("dotenv").config();
const express = require("express");
const { ethers } = require("ethers");
const contractABI = require("../ABI/VoteBlockABI.json");

const candidateModel = require("../models/candidateSchema")


const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

const sortCandidatesDescending = (candidates) => {
  return candidates.sort((a, b) => b.voteCount - a.voteCount);
}

exports.addCandidate = async (req,res) => {
    try {
        const {candidate} = req.body

        const newEntry = {
            "name": candidate.name,
            "party": candidate.party,
            "logo": candidate.logo,
            "profile": candidate.profile,
            "about":candidate.about,
            "policies": candidate.policies
        }
        
        const candidateData = new candidateModel(newEntry)
        await candidateData.save()

        const tx = await contract.addCandidate(candidate.name, candidate.party);
        await tx.wait();
        
        res.status(201).json({message: "Candidate Added Successfully"})
    }
    catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"})
    }
}


// exports.addCandidates = async (req,res) => {
//   try {
//       const {candidate} = req.body

//       const newEntry = {
//           "name": candidate.name,
//           "party": candidate.party,
//           "logo": candidate.logo,
//           "profile": candidate.profile,
//           "about":candidate.about,
//           "policies": candidate.policies
//       }
      
//       const candidateData = new candidateModel(newEntry)
//       await candidateData.save()

//       const tx = await contract.addCandidates(candidate.name, candidate.party);
//       await tx.wait();
      
//       res.status(201).json({message: "Candidate Added Successfully"})
//   }
//   catch (error) {
//       console.log(error)
//       res.status(500).json({message: "Internal Server Error"})
//   }
// }


exports.castVote = async (req, res) => {
  try {
    
    const { voterId, item } = req.body;

    console.log(voterId, item.name)

    const tx = await contract.vote(voterId , item.name);
    await tx.wait();

    res.json({ message: "Vote casted successfully" });

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

exports.getResults = async (req,res) => {
  try {
    const candidates = await contract.getResults(); 
    
    const formattedCandidates = candidates.map(candidate => ({
      name: candidate.name,
      party: candidate.party,
      voteCount: Number(candidate.voteCount)
    }));

    const data = await candidateModel.find()
    
    const candidatesData = data.map(candidate => {
      const match = formattedCandidates.find(fc => fc.name === candidate.name);
      return {
        ...candidate.toObject(),
        voteCount: match ? match.voteCount : 0 
      };
    });
      

    res.json(sortCandidatesDescending(candidatesData));
  }
  catch (error) {
    console.log(error)
  }
}


exports.blockChainCandidateListUpdater = async (req,res) => {
  try {
      const {candidateData} = req.body
      
      const tx = await contract.addCandidates(candidateData);
      await tx.wait();
      
      res.json({ message: "Candidate added successfully" });

  } catch (error) {
      console.error("Error adding candidate:",error);
      return false;
  }
};


exports.hasVoted = async (req,res) => {
  try {
    
    const {voterId} = req.body;
    const hasVoted = await contract.hasVoted(voterId);

    res.json({hasVoted});
  }
  catch (error) {
    console.log(error)
  }
}

exports.getEncryptedVotes = async (req,res) => {
  try{
    const encryptedVotes = await contract.getEncryptedVotes();
    res.json(encryptedVotes);
  }
  catch (error) {
    console.log(error)
  }
}

exports.getVoteCount = async (req,res) => {
  try{
    const voteCount = await contract.getEncryptedVoteCount();
    res.json(Number(voteCount));
  }
  catch (error) {
    console.log(error)
  }
}