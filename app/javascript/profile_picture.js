import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./context/firebase.js";

const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
const formulario = document.querySelector(".formulario");
const buttonSubmit = document.querySelector(".button-submit-picture");
const containerPicture = document.querySelector(".profile-picture");
const currentProfilePicture = document.querySelector(".current-profile-picture");
const newProfilePicture = document.querySelector(".profile-url");

formulario.addEventListener("submit", (event) => {
	event.preventDefault();

	const file = event.target[0]?.files[0];
	const fileType = file["type"];
	if (!file || !validImageTypes.includes(fileType)) return;

	const storageRef = ref(storage, `images/${file.name}`);
	const uploadTask = uploadBytesResumable(storageRef, file);

	uploadTask.on(
		"state_changed",
		(snapshot) => {
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			currentProfilePicture.style.background = `conic-gradient(#00B4FF ${(360*progress)/100}deg, #ededed 0deg)`
			progressBar.textContent = `${progress.toFixed(0)}%`;

		},
		(error) => {
			alert(error);
		},
		() => {
			
			currentProfilePicture.style.background = "conic-gradient(#00B4FF 0deg, #ededed 0deg)";

			getDownloadURL(uploadTask.snapshot.ref).then((url) => {
				currentProfilePicture.src = url;
				newProfilePicture.value = url;
			});
		}
	);
});

