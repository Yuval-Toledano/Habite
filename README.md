
<!-- ![](https://github.com/Yuval-Toledano/Habite/blob/main/src/images/logo.svg) -->

## <img src='https://github.com/Yuval-Toledano/Habite/blob/main/src/images/logo.svg' width="90px" type='image'> 🍬 
<p><b>Social sugar consumption reduction application.</b></p>
<p align="justify" >Habite helps young people who want to consume sugar more responsibly, to compete together with people whom they trust in nutrition challenges and by this, create themselves healthier habits.</>
<p align="justify" >Habite works both on mobile and desktop. Feel free to try out both versions by changing the window size.</>

<b><a href="https://habite-fd756.web.app">Try Habite</a></b>

<p align="center">
  <img src='https://github.com/Yuval-Toledano/Habite/blob/main/src/images/cover.png' width="1000px" type='image'>
</p>


### Why Habite? 🤩

<p align="justify">A common issue many face nowadays is the high sugar consumption found in most western countries. While many struggle to decrease their sugar intakes very few actually succeed.         <b>Habite</b> is a solution for adults and young adults who are interested in changing their sugar consumption habits, and do so by turning the unpleasant experience into a democratic   group challenge game.</p>
<p align="justify">We started with a user research. It revealed that people wish to have a positive empowering experience, rather than a failure-focused one. They want to share their nutrition         struggles with those who deal with similar issues, and we chose to target the section of that audience that responds well to competition, and use it to motivate them.
<br>Based on those conclusions, we designed the game structure and started developing the client side and later the server side.</p>

### Features:
Habite lets you:
- Communicate with group members in a competitional / encouraging manner
- Present personal progress and relative achievement to group
- Choose challenges by using a voting system and create the overall journey

### Setup

Prerequisites:

* NodeJS v14.16.0 and up - Install Node JS from its [download page](https://nodejs.org/en/download/).
* NPM (Node package manager) - npm is installed along with NodeJS. Our version at the time of commit was v14.16.0.

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

* First Git clone the repo into your computer
```
git clone https://github.com/Yuval-Toledano/Habite.git
```

To get started developing right away:

* Open your terminal
```
$ npm install
```
* This should install all the dependencies. Once done
* Run 
``` 
$ npm start
```
* to start the app locally in your development environment, by default it will be in http://localhost:3000.

<details>
  <br>
  <summary><b>Screenshots 👀</b></summary>
  <img width="230px" src="https://github.com/Yuval-Toledano/Habite/blob/main/src/images/home.png" />
  <img width="237px" src="https://github.com/Yuval-Toledano/Habite/blob/main/src/images/signup.png" />
  <img width="237px" src="https://github.com/Yuval-Toledano/Habite/blob/main/src/images/overview.png" />
  <img width="233px" src="https://github.com/Yuval-Toledano/Habite/blob/main/src/images/challenges.png" />
</details>

<details>
  <summary><b>Architectural overview 📐</b></summary>
  <br>
  <p align="justify">We choose to use Cloud Firestore as our Database, it is a NoSQL document database. our storage contains 5 collections, 4 of them are updated on realtime and 1 that     contains static data for the app.</p> 
<br>
  <p><u>Collections:</u></p>
  <ul align="justify">
    <li><b>Users:</b> personal information of each user, generated for each user in the signup process.
      Contains- name, email, profile picture, score, level, group id and list of notifications.</li>
    <br>
    <li><b>Groups:</b> information of each group, keeps track of the current challenge of each group and the future approved challenge. The document is generated when a group is          created and is updated if user joins group and all changes in challenges.
  Contains- user Id’s in group, number of group members, current challenge Id, start timestamp of current challenge, end timestamp of current challenge, list of approved       challenges and list of past challenges.</li>
    <br>
  <li><b>Votes:</b> a vote document is generated for each challenge that one of the group members has voted for. If another group member votes for a challenge that’s been voted for,    their vote will be added to the document the exists for that challenge. 
    Contains- challenge Id, group Id, counter of votes and voters Id.</li>
    <br>
  <li><b>ChallengeLog:</b> for each current challenge that’s created for a group a challenge log is generated for each group member with the current challenge Id. The challenge log   keeps track of the success of each user during the current challenge and is updated based on the success reported by the user. At the end of the current challenge the user   score is updated based on the challenge log.</li>
    <br>
  <li><b>Challenges-autogenerated-ids:</b> static documents, contains all the information on the challenges in the app. 
    Contains- challenge name, challenge XP, description, level, and rewards.</li>
  </ul
  <br>
  <img width="1000px" src="https://github.com/Yuval-Toledano/Habite/blob/main/src/images/architectural overview.jpeg" />
    
  <a href="https://github.com/Yuval-Toledano/Habite/blob/f1f335d6911bd836743dbbfa6ec8d03f3f22c0b1/src/Habite%20user%20and%20app%20research%20documentation.pdf"><b>Click here to UX documentation</b></a>
</details>
  
<details>
  <summary><b>Main APIs 🛠️</b></summary>
  <br>
  <p align="justify"> Firebase was chosen as the server-side DB and it is Habite’s storage & hosting platform.<br>
  Firebase provides the tools and infrastructure we needed to develop Habite. With firebase we were able to authenticate and manage users who access our application. Firebase Storage     lets us upload and store user generated content, such as images. Finally, we were able to manage our DB at cloud firestore. Cloud firestore is a flexible, scalable database for       mobile, web, and server development from Firebase and Google Cloud Platform.
  <br><br>
  <i>firebaseTools.js</i> file includes the functions that communicate with the data base.<br>
  There are auth related functions such as <i>generateUserDocument, generateGroupDocument</i> that create new user/group document in the DB. You can also find getter and setter         functions such as <i>getUserDocument , getGroupMembersData </i> that return a promise of the document of the user or usable data.
  <br><br>
  At <i>AuthContext.jsx</i> we get the data from the DB and share it with the other components in the tree by calling functions such as those we mentioned before.
  <br><br>
  At <i>mobileInfoBox.jsx </i> and <i>overview.jsx </i> there is the function <i>fetchChallenge</i> inside useEffect. The function gets current challenge of the group, and it           validates it every time there is a change with the user data or the group data or a day has changed.</p>
  
</details>

## Contributors ✨

Contribution by these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/Yuval-Toledano"><img src="https://avatars.githubusercontent.com/u/82638638?v=4" width="100px;" alt="profile_pic_yuval"/><br /><sub><b>Yuval Toledano</b></sub></a><br /><a  title="code">💻</a></td>
    <td align="center"><a href="https://github.com/noamTzi"><img src="https://avatars.githubusercontent.com/u/39398826?v=4" width="100px;" alt="profile_pic_noam"/><br /><sub><b>Noam Tzi</b></sub></a><br /><a title="code">💻</a></td>
    <td align="center"><a href="https://github.com/IggieB"><img src="https://avatars.githubusercontent.com/u/82638159?v=4" width="100px;" alt="profile_pic_iggie"/><br /><sub><b>Iggie B</b></sub></a><br /><a title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Tal-Rosenzvi"><img src="https://avatars.githubusercontent.com/u/81176209?v=4" width="100px;" alt="profile_pic_tal"/><br /><sub><b>Tal</b></sub></a><br /><a title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/slevitz"><img src="https://avatars.githubusercontent.com/u/58976078?v=4" width="100px;" alt="profile_pic_sarah"/><br /><sub><b>Sarah Levitz</b></sub></a><br /><a title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
