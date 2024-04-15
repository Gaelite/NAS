const axios = require('axios');
const { Client } = require('ssh2');
//buscar acerca esas dos librerias

//https://www.cisco.com/c/en/us/td/docs/routers/csr1000/software/restapi/restapi/RESTAPIntp.html
//https://developer.cisco.com/docs/nso/#!common-use-cases/nso-for-qos-management


// Configuración de la dirección IP del dispositivo Cisco, nombre de usuario y contraseña
const deviceIP = '192.168.1.1';
const username = 'tu_usuario';
const password = 'tu_contraseña';

// Nuevo nombre del host que deseas configurar
const newHostName = 'nuevo_nombre_del_host';

// URL base de la API REST de Cisco IOS XE
const baseURL = `https://${deviceIP}/restconf`;

// Configuración de la solicitud HTTP con Axios
const axiosInstance = axios.create({
  baseURL,
  auth: {
    username,
    password
  },
  headers: {
    'Content-Type': 'application/yang-data+json',
    'Accept': 'application/yang-data+json'
  }
});

// Función para cambiar el nombre del host
async function changeHostName() {
  try {
    const response = await axiosInstance.patch('/data/Cisco-IOS-XE-native:native/hostname', {
      "Cisco-IOS-XE-native:hostname": newHostName
    });
    console.log('Nombre del host cambiado exitosamente:', response.data);
  } 
  catch (error) {
    console.error('Error al cambiar el nombre del host:', error);
  }
}

// Llamar a la función para cambiar el nombre del host
changeHostName();
