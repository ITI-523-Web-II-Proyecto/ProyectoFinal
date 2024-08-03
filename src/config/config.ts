/*
----------------------------------------------------------------------------------------
  Este archivito config lo que hace es almacenar unas variables constantes, porque
  a la hora de yo generar un Token la jwt me pide una palabra secreta para poder
  encriptar y desencriptar el Token, a la hora de resetear o refrescar puede ser
  que yo tenga otras palabras secretas para encriptar y desencriptar o me genere
  el Token o validarlo.
----------------------------------------------------------------------------------------
*/

export default {
  jwtSecret: 'BDPEK@',
  jwtSecretReset:'BDPEK@123',
  jwtSecretRefresh:'BDPEK@123456',

};
