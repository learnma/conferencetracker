# conferencetracker
A conference management for automating scheduling of events. This document contains following details:

* Pre-requisite
* How to run?
* tooling
* npm commands
* Design
* Datamodel
* Scheduler
* Validation
* Todo

## Pre-requisite
The application is a node.js based app and needs *node 6.3.0 or above* . The dependent node_modules are installed using the npm install command.

## How to run?
1. Get the code by either cloning are unzip from githum.com https://github.com/madhanganesh/conferencetracker
2. Go to the folder where the source code is extracted (inside conferencetracker)
3. Open a console at this folder (this should contain package.json)
4. run *npm install* (ensure the proxy or networking settings are configured properly)
5. run *npm start* to run the scheduler for default input (the rsult will be displayed in console)
6. The test input files are kept in folder ./test/test.i/data/default-input.txt
7. You can supply any input file by running the command node index.js <input-file.txt> <output-file.txt>

## Tooling
* **language**     - JavaScript (ES6 version)
* **linting**      - ESLint (the rules are configured in ./eslintrc.json)
* **unit tests**   - Jasmine
* **integ tests**  - Jasmine

## Npm commands
* *npm install*    - Will install dependencies
* *npm start*      - Will run default input and show output
* *npm lint*       - Will run linting on source code
* *npm run test.u* - Will run all unit tests and show the results
* *npm run test.i* - Will run all integration tests and show the results

## Design
The conferencetracker is a console based application that helps to automate scheduling of a conference. The input is parsed into *Event*s and
*scheduled* to come up with the agenda. Following assumptions 
are made as part of the design:
* The conference schedule is required for one single day
* The lightining talks are less prioritized
* The design tries to fit-in as many slots

## Datamodel
**Conference** *---has--->* **Track** *---has--->* **Slot** *---has--->* **Event**

## Scheduler
The scheduler is the key component of ths application. Following logic is applied for scheduling the events:

* The events array is passed as input to scheduler
* The lightning talks are seperated from main events array
* The scheduler run until all main events are allocated
* The scheduler create tracks and assign slots to tracks
* The track has morning slot, lunch slot and noon slot
* As events are iterated, a slot is created and events are assigned to iterated
* If a slot has a gap, an optimizer is run to change events to fill the slot
* If slot has room, the lightining event is added
* Finally networking event is assigned for noon tasks

## Validation
The integration test validates the result for following conditions:
* All events are scheduled 
* The lunch event start at 12:00 PM
* There is no duplication of events
* There is no duplication of time slot

The integration test can be run by issuing following commands:

**npm run test.i**

This test will run multiple data input validating the constraints from the results

The output of running scheduler for default input will result in:

karma:conferencetracker madhanganesh$ npm start
```
> conferencetracker@0.0.1 start /Users/madhanganesh/src/github.com/madhanganesh/conferencetracker
> node index.js


Track 1 :: 
09:00AM Writing Fast Tests Against Enterprise Rails 60min
10:00AM Overdoing it in Python 45min
10:45AM Lua for the Masses 30min
11:15AM Ruby Errors from Mismatched Gem Versions 45min
12:00PM Lunch
01:00PM Common Ruby Errors 45min
01:45PM Communicating Over Distance 60min
02:45PM Accounting-Driven Development 45min
03:30PM Woah 30min
04:00PM Sit Down and Write 30min
04:30PM Programming in the Boondocks of Seattle 30min
05:00PM Networking

Track 2 :: 
09:00AM Rails Magic 60min
10:00AM Ruby on Rails: Why We Should Move On 60min
11:00AM Ruby on Rails Legacy App Maintenance 60min
12:00PM Lunch
01:00PM Clojure Ate Scala (on my project) 45min
01:45PM Ruby vs. Clojure for Back-End Development 30min
02:15PM Pair Programming vs Noise 45min
03:00PM A World Without HackerNews 45min
03:45PM User Interface CSS in Rails Apps 60min
04:45PM Rails for Python Developers lightning
04:50PM Networking
```

## Todo
Following items are required to be done in next refactoring:

1. The Event class need sub-classing of different events like LunchEvent, Talk, LightiningTalk, NetworkingEvent
2. The Slot class need sub-classing of different slots MorningSot, LunchSlot, NoonSlot
3. The Slot class need to be made immutable by returning the copy of the state rather that reference
4. Logging needs to be added
