import express from 'express';

import { solicitarInterfaces,solicitarCPU,test4,getTopology, hostname, int_ip, int_desc, motd,intv6_ip,v6_unicast,ip_route,ipv6_route,newUser,logginSyn,syslog,DHCPv4, sshAuth,sshTime,saveRunn,encryption, verifySSH, getData, vlan, shrun}from '../controllers/conf.js';

const router = express.Router(); 

// Rutas para conseguir datos importantes
router.post('/ShowIntShow', solicitarInterfaces);
router.post('/CPU', solicitarCPU);

// all routes in here are starting with /conf
router.get('/prueba', test4);

router.get('/GetData', getData);

router.post('/vlan', vlan);

router.post('/VerifySSH', verifySSH);
//1
router.get('/Topology', getTopology);
//2
router.post('/ChangeHostname',hostname);
//3
router.post('/InterfaceIP',int_ip);
//4
router.post('/InterfaceDescription', int_desc); 
//5
router.post('/ChangeMOTD',motd);
//6
router.post('/InterfaceIPv6',intv6_ip)
//7
router.post('/UnicastRouting',v6_unicast);
//8
router.post('/IPRoute',ip_route);
//9
router.post('/IPv6Route',ipv6_route); //no jala
//10
router.post('/NewUser',newUser);//no jala
//11
router.post('/LogginSyn',logginSyn);
//12
router.post('/Syslog',syslog);

//14
router.post('/SSHAuth',sshAuth);
//15
router.post('/SSHTime',sshTime);
//16
router.post('/Encryption',encryption);
//17
router.post('/run',shrun);

export default router;
