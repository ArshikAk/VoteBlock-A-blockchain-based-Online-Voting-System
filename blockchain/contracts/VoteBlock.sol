// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract VoteBlock {
    struct Candidate {
        string name;
        uint voteCount;
    }

    struct Voter {
        bool hasVoted;
    }

    struct EncryptedVote {
        string encryptedVoterId;
        string votedCandidate;
    }

    address public admin;

    mapping(string => Voter) public voters;
    mapping(string => uint) public candidateIndex;

    Candidate[] public candidates;
    EncryptedVote[] public encryptedVotes;

    event CandidateAdded(string name);
    event VoteCasted(string candidateName);
    event EncryptedVoteRecorded(string encryptedVoterId);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }


    function addCandidate(string memory _name) public onlyAdmin {
        require(candidateIndex[_name] == 0 && (candidates.length == 0 || keccak256(abi.encodePacked(candidates[0].name)) != keccak256(abi.encodePacked(_name))), "Candidate already exists");
        candidates.push(Candidate(_name, 0));
        candidateIndex[_name] = candidates.length - 1;
        emit CandidateAdded(_name);
    }


    function addCandidates(string[] memory _nameList) public onlyAdmin {
        for (uint i = 0; i < _nameList.length; i++) {
            string memory _name = _nameList[i];
            require(candidateIndex[_name] == 0 && (candidates.length == 0 || keccak256(abi.encodePacked(candidates[0].name)) != keccak256(abi.encodePacked(_name))), "Candidate already exists");
            candidates.push(Candidate(_name, 0));
            candidateIndex[_name] = candidates.length - 1;
            emit CandidateAdded(_name);
        }
    }


    function vote(string memory _userId, string memory _candidateName, string memory _encryptedVoterId) public {
        
        require(!voters[_userId].hasVoted, "You have already voted!");
        require(candidates.length > 0, "No candidates available");

        uint index = candidateIndex[_candidateName];
        require(index < candidates.length && keccak256(abi.encodePacked(candidates[index].name)) == keccak256(abi.encodePacked(_candidateName)), "Candidate not found");

        voters[_userId].hasVoted = true;
        candidates[index].voteCount++;

        encryptedVotes.push(EncryptedVote(_encryptedVoterId, _candidateName));

        emit VoteCasted(_candidateName);
        emit EncryptedVoteRecorded(_encryptedVoterId);
    }

    function hasVoted(string memory _userId) public view returns (bool) {
        return voters[_userId].hasVoted;
    }

    function getResults() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getEncryptedVotes() public view returns (EncryptedVote[] memory) {
        return encryptedVotes;
    }

    function getEncryptedVoteCount() public view returns (uint) {
        return encryptedVotes.length;
    }
}
