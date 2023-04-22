import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../context/firebase.js";

const formulario = document.querySelector(".formulario");

let profUrl = "";

const handleUpload = (event) => {
    event.preventDefault();

    const file = event.target[0]?.files[0];
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
            alert(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                profUrl = url;
            });
        }
    );
};

if(formulario) {
    formulario.addEventListener("submit", () => {
        handleUpload(event);
    });
}
