const axios = require("axios")

const candidateData = ['Narendra Modi','Ragul Gandhi','Ather Jamal Lari','Kolisetty Shiva Kumar']

const stateUpdater = () => {

	axios.post("http://127.0.0.1:8000/api/blockchain/blockChainCandidateListUpdater",{candidateData})
	.then((response) => {
		console.log(response.data);
	})
	.catch((error) => {
		console.error(error);
	})
}

stateUpdater()
