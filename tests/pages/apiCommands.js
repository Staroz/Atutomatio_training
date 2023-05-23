const { expect } = require('@playwright/test');
const axios = require('axios');

let boardId;

exports.ApiCommands = class ApiCommands {

    /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page) {
        this.page = page;
    }

    async getId( boardName, key, token) {
        const responseId = await axios.get(`https://api.trello.com/1/members/me/boards?key=${key}&token=${token}`);
        expect(responseId.status).toBe(200);
        let arr = responseId.data;
        let ans = "";
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            if (element.name === boardName) {
                ans = element.id;
                break;
            } else {
                ans = "ERROR, THIS BOARD NAME DOESN'T EXIT";
            }
        }
        boardId = ans;
    };

    async createBoardApi(boardName, key, token) {
        const response = await axios.post(`https://api.trello.com/1/boards/?name=${boardName}&key=${key}&token=${token}`);
        expect(response.status).toBe(200);
        boardId = response.data.id;
    };

    async deleteBoardApi( key, token) {
        const response = await axios.delete(`https://api.trello.com/1/boards/${boardId}?key=${key}&token=${token}`);
        expect(response.status).toBe(200);
    };
};
