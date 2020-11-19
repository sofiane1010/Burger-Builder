import axios from "axios";

const instance = axios.create({
	baseURL: "https://burger-builder-a4ec3.firebaseio.com/",
});

export default instance;
