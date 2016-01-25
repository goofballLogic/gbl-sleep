Feature: Save a thing
	As a user of a client application
	I want to send things to sleep
	So that I can come back later and collect them

	Scenario: Save and retrieve a thing
		Given I put a thing
			| app      | user		| domain       | category | id    | value    | type       |
			| features | test-user  | save-a-thing | test-1   | 12345 | yo momma | text/plain |
		When I get the last thing
		Then the value should be "yo momma"
