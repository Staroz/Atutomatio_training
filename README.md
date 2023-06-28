#Automation_training 

This Repository has Tests of the web of Trello, the libraries that were used in this project are:

~ Cypress
~ Playwright

I'd be happy if you leave me any observations or feedback, and if you want to fork this project and run this project in local, you should create a file "cypress/fixtures/credentials1.json" and fill these information:

{
  "email": "example@email.com",
  "pw": "Password",
  "token": "",
  "key": "",
  "boardName": "name 1",
  "newBoardName": "name 2",
  "userName": "username of Trello"
  "workSpaceName": "WS name",
  "listNameArray": ["listName 1", ....],
  "cardsNameArray": ["cardName1", ...],
  "descriptionText": "A text",
  "labelColor": {
          "red": "red",
          "yellow": "yellow",
          "green": "green"},
  "checklistName": "Name of a Checklist",
    "coverImageNumber": {
        "Cover0": 0,
        "Cover1": 1,
        "Cover2": 2,
        "Cover3": 3,
        "Cover4": 4,
        "Cover5": 5
    },
    "attachmentInfo": {
        "link": "A link",
        "linkName": "Name of link"
    },
    "copiedCardInfo": {
        "copyCardName": "Name of card copied",
        "positionOfCard": "The position you want the copied card to have.(example 1, 2, 3)"
    }
  
  }

  Thanks.



