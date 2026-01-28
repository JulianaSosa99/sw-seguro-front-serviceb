import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8443',
  realm: 'CoreManager',
  clientId: 'coremanager-api'
});

export default keycloak;
