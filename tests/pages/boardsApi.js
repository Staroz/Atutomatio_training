const axios = require('axios');

let boardId;

exports.BoardsApi = class BoardsApi {

    /**
   * @param {import('@playwright/test').Page} page
   */
    constructor() {

    }

    async getId( boardName, key, token) {
        const responseId = await axios.get(`https://api.trello.com/1/members/me/boards?key=${key}&token=${token}`);
        let arr = responseId.data;
        let ans = "";
        if (arr.filter(x=> x.name===boardName)) {
            ans = arr.filter(x=> x.name===boardName)[0].id;
        } else {
            ans = "ERROR, THIS BOARD NAME DOESN'T EXIT";
        }
        boardId = ans;
        return responseId;
    };

    async createBoardApi(boardName, key, token) {
        const response = await axios.post(`https://api.trello.com/1/boards/?name=${boardName}&key=${key}&token=${token}`);
        boardId = response.data.id;
        return response;
    };

    async deleteBoardApi( key, token) {
        const response = await axios.delete(`https://api.trello.com/1/boards/${boardId}?key=${key}&token=${token}`);
        return response;
    };
};
