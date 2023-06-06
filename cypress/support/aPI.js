const axios = require('axios');
const credentials = require('../fixtures/credentials.json');

const apiKey = credentials.key;
const apiToken = credentials.token;

async function deleteWorkspaces() {
  try {
    const response = await axios.get(
      `https://api.trello.com/1/members/me/organizations?key=${apiKey}&token=${apiToken}`
    );

    const organizations = response.data;

    for (const organization of organizations) {
      // console.log(organization);
      // console.log(organization.boardId);
      await axios.delete(
        `https://api.trello.com/1/boards/${organization.idBoards}?&key=${apiKey}&token=${apiToken}`
      );
      await axios.delete(
        `https://api.trello.com/1/organizations/${organization.id}?key=${apiKey}&token=${apiToken}`
        
      );

      console.log(`Se eliminó el workspace: ${organization.displayName}`);
    }

    console.log('Todos los workspaces fueron eliminados.');
  } catch (error) {
    console.error('Ocurrió un error al eliminar los workspaces:', error);
  }
}

deleteWorkspaces();