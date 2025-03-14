require("dotenv").config();
const express = require("express");
const { ethers } = require("ethers");
const contractABI = require("../ABI/VoteBlockABI.json");

const candidateModel = require("../models/candidateSchema")


const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

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
