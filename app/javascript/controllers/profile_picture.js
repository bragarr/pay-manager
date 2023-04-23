import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../context/firebase.js";

const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
const formulario = document.querySelector(".formulario");
const buttonSubmit = document.querySelector(".button-submit-picture");
const containerPicture = document.querySelector(".profile-picture");
const currentProfilePicture = document.querySelector(".current-profile-picture");
const newProfilePicture = document.querySelector(".profile-url");
const containerProgrsssBar = document.querySelector(".progress");
const progressBar = document.querySelector(".progress-bar");


const handleUpload = (event) => {
	event.preventDefault();

	const file = event.target[0]?.files[0];
	const fileType = file["type"];
	if (!file || !validImageTypes.includes(fileType)) return;

	containerProgrsssBar.classList.remove("d-none");

	const storageRef = ref(storage, `images/${file.name}`);
	const uploadTask = uploadBytesResumable(storageRef, file);

	uploadTask.on(
		"state_changed",
		(snapshot) => {
			const progress =
				(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			progressBar.classList.add(`w-${progress}`);
		},
		(error) => {
			alert(error);
		},
		() => {
			if(progressBar.classList.contains("w-100")) {
				containerProgrsssBar.classList.add("d-none");
			}
			getDownloadURL(uploadTask.snapshot.ref).then((url) => {
				currentProfilePicture.src = url;
				newProfilePicture.value = url;
			});		
		}
	);           
};

if(formulario) {
	formulario.addEventListener("submit", () => {
		handleUpload(event);
	});
}