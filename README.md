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

If you want to run this project as a image in Docker you need to do a fork of this repository, then clone this repository in your local directory  and create a file in this directory "../cypress/fixtures/credentials1.json", it must be as the example shown before. You also could download the mu_24 branch of this repository and copy it to a local directory. 

When you have that file, you only need to open a terminal (git, linux, or another one) into the directory and writhe these commands in the command line. You remember to have Docker Desktop installed previously on your computer.  
    
    // Requirements 
  * Install Docker desktop ('https://docs.docker.com/desktop/') 
    
    //download base images of cypress and playwright.
  $ docker pull mcr.microsoft.com/playwright:v1.36.0-jammy
  $ docker pull cypress/included:12.17.1
    // run docker compose to turn project on 
  $ docker-compose up

  Thanks.



