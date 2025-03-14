// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract VoteBlock {
    struct Candidate {
        string name;
        string party;
        uint voteCount;
    }

    struct Voter {
        bool hasVoted;
    }

    address public admin;
    mapping(string => Voter) public voters;
    Candidate[] public candidates;

    event CandidateAdded(string name, string party);
    event VoteCasted(string userId);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    function addCandidate(string memory _name, string memory _party) public onlyAdmin {
        candidates.push(Candidate(_name, _party, 0));
        emit CandidateAdded(_name, _party);
    }

    function vote(string memory _userId, string memory _name) public {
        require(!voters[_userId].hasVoted, "Already voted!");

        voters[_userId].hasVoted = true;

        for(uint i = 0; i < candidates.length; i++)
        {
            if(keccak256(abi.encodePacked(candidates[i].name)) == keccak256(abi.encodePacked(_name)))
            {
                candidates[i].voteCount++;
            }
        }
        

        emit VoteCasted(_userId);
    }

    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getCandidateVotes(uint _candidateIndex) public view returns (uint) {
        require(_candidateIndex < candidates.length, "Invalid candidate!");
        return candidates[_candidateIndex].voteCount;
    }
}
