import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {getStorage,ref,uploadBytes,getDownloadURL} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";
import {getFirestore, query,limit,where,collection, onSnapshot, deleteDoc,updateDoc,addDoc,doc,getDocs, serverTimestamp,orderBy,getDoc} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyAOcbh_oo100JmIPXlLucvv4UBTzmjhtQ0",
    authDomain: "chat-f366c.firebaseapp.com",
    projectId: "chat-f366c",
    storageBucket: "chat-f366c.appspot.com",
    messagingSenderId: "537670838635",
    appId: "1:537670838635:web:0c4e6984c562a32833c42e"
    };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)

export let downloadURL
export async function upload(file) {
        const snapshot = await uploadBytes(ref(storage,`perfil/${file.name}`), file); //subir archivo
        // Obtener la URL de descarga de la imagen
        downloadURL = await getDownloadURL(snapshot.ref);
        console.log('link: '+ downloadURL);
}

export const eliminar = (id) => deleteDoc(doc(db,'mensajes',id))

export const mostrarUsuarios = (callback) => onSnapshot(collection(db, 'usuarios'),callback)

export const insertar = (yo,id,mensaje,imagen,usuario) => addDoc(collection(db,'mensajes'),{
    emisor: yo,
    receptor: id,
    sms: mensaje,
    img: imagen,
    usuario:usuario,
    fecha: serverTimestamp()
})

export const mostrarMensajes = (uno,dos,callback) => {
    const q = query(collection(db, 'mensajes'),where("emisor","in",[uno,dos]),where("receptor","in",[uno,dos]),orderBy("fecha", "asc"))
    return onSnapshot(q, callback);
};

export const crearUsuario = (nombre,contraseña,imagen) => addDoc(collection(db,'usuarios'),{
    id:'',
    nombre:nombre,
    contraseña:contraseña,
    imagen:imagen,
    descripcion:''
})

//Registrar
export const existeContrasena = async (con) => {
    const querySnapshot = await getDocs(
        query(collection(db, 'usuarios'), where('contraseña', '==', con))
    );
    return !querySnapshot.empty;
};

//Login
export const obtenerUsuarioPorContrasena = async (con) => {
    const querySnapshot = await getDocs(
        query(collection(db, 'usuarios'), where('contraseña', '==', con))
    );
    if (!querySnapshot.empty) {  //empty dice se esta vacio /y si  hay contenido es por que la coincidencia de la contraseña encontrada
        const usuario = querySnapshot.docs[0].id;
        return usuario;
    } else {
        return null;
    }
};

export const persona = (id) => getDoc(doc(db,'usuarios',id))

export const eliminarUsuario = (id) => deleteDoc(doc(db,'usuarios',id))

export const editar = (id,obj) => updateDoc(doc(db,'usuarios',id),obj)

//MOSTRAR y ordenar por fecha
//export const mostrar = (callback) => onSnapshot(collection(db, 'mensajes', orderBy("fecha", "asc")),callback)








