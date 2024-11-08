// cypress/integration/api_spec.js

describe('API Tests', () => {

  let accessToken;

  before(() => {
    cy.request({
      method: 'POST',
      url: 'https://api-homologacao.getnet.com.br/auth/oauth/v2/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('67823c6d-58de-494f-96d9-86a4c22682cb:c2d6a06f-5f31-448b-9079-7e170e8536e4')
      },
      body: 'scope=oob&grant_type=client_credentials'
    }).then((response) => {
      expect(response.status).to.eq(200);
      accessToken = response.body.access_token;
    });
  });

  it('Valida o Status Code', () => {
    cy.request({
      method: 'GET',
      url: 'https://developers.getnet.com.br/api',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  
  it('Valida Campos Obrigatórios', () => {
    cy.request({
      method: 'POST',
      url: 'https://developers.getnet.com.br/api/resource',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: {
       
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404); 
      
    });
  });

  
  it('Valida o Contrato da API', () => {
    cy.request({
      method: 'GET',
      url: 'https://developers.getnet.com.br/api',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      
      
      
    });
  });

});
