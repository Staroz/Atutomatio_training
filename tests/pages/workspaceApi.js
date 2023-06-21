const axios = require('axios');

let workspaceId;

exports.WorkspaceApi = class WorkspaceApi {

    /**
   * @param {import('@playwright/test').Page} page
   */
    constructor() {

    }

    async getWorkspaceId(displayName, key, token) {
        const responseId = await axios.get(`https://api.trello.com/1/members/me/organizations?key=${key}&token=${token}`);
        let arr = responseId.data;
        let ans = "";
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            if (element.displayName === displayName) {
                ans = element.id;
                break;
            } else {
                ans = "ERROR, THIS WORK SPACE NAME DOESN'T EXIT";
            }
        }
        workspaceId = ans;
        return responseId;
    };

    async createWorkspacesApi(workspaceName, key, token) {
        const response = await axios.post(`https://api.trello.com/1/organizations/?displayName=${workspaceName}&key=${key}&token=${token}`);
        workspaceId = response.data.id;
        return response;
    };

    async deleteWorkspaceApi( key, token) {
        const response = await axios.delete(`https://api.trello.com/1/organizations/${workspaceId}?key=${key}&token=${token}`);
        return response;
    };
};
