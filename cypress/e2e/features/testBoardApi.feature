Feature: Tests of Trello with API
    Scenario: Manipulate of boards of Trello with API
        Given I created a new board in Trello
        When I modify the name of this Board whit API
        Then I should delete this board

