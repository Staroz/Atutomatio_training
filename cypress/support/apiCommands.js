const axios = require('axios');
const credentials = require('../fixtures/credentials1.json');

const apiKey = credentials.key;
const apiToken = credentials.token;

async function deleteWorkspaces() {
  try {
    const response = await axios.get(
      `https://api.trello.com/1/members/me/organizations?key=${apiKey}&token=${apiToken}`
    );

    const organizations = response.data;
    for (const organization of organizations) {
      if (organization.idBoards.length > 0) {
        for (let index = 0; index < organization.idBoards.length; index++) {
          await axios.delete(
            `https://api.trello.com/1/boards/${organization.idBoards[index]}?&key=${apiKey}&token=${apiToken}`
          );
          
        }
        await axios.delete(
          `https://api.trello.com/1/organizations/${organization.id}?key=${apiKey}&token=${apiToken}`
        );
        console.log(`This workspace and board were deleted: ${organization.displayName} and ${organization.name}`);
      } else {
        await axios.delete(
          `https://api.trello.com/1/organizations/${organization.id}?key=${apiKey}&token=${apiToken}`
        );
        console.log(`This workspace was deleted: ${organization.displayName}`);
      }
      
    }
    console.log('All workspaces and boards were deleted');
  } catch (error) {
    console.error('This was the error when deleting the workspaces:', error);
  }
}

deleteWorkspaces();
