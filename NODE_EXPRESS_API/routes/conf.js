import express from 'express';

import { getTopology, hostname, int_ip, int_desc, motd,intv6_ip,v6_unicast,ip_route,ipv6_route,newUser,logginSyn,syslog,DHCPv4, sshAuth,sshTime,saveRunn,encryption}from '../controllers/conf.js';

const router = express.Router(); 

// all routes in here are starting with /users
router.get('/', test );
//1
router.post('/Topology', getTopology);
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
router.post('/IPv6Route',ipv6_route);
//10
router.post('/NewUser',newUser);
//11
router.post('/LogginSyn',logginSyn);
//12
router.post('/Syslog',syslog);
//13
router.post('/DHCPv4',DHCPv4);
//14
router.post('/SSHAuth',sshAuth);
//15
router.post('/SSHTime',sshTime);
//16
router.post('/Encryption',encryption);

export default router;
