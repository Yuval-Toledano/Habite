
![](https://github.com/Yuval-Toledano/Habite/blob/main/src/images/logo.svg)

## HABITE 🍬 
<p><b>Social sugar consumption reduction application.</b></p>
<p>Habite helps young people who want to consume sugar more responsibly, to compete together with people whom they trust in nutrition challenges and by this, create themselves healthier habits.</>

<a href="https://habite-fd756.web.app">Try Habite</a>

### Why Habite? 🤩

<p>A common issue many face nowadays is the high sugar consumption found in most western countries. While many struggle to decrease their sugar intakes very few actually succeed.         <b>Habite</b> is a solution for adults and young adults who are interested in changing their sugar consumption habits, and do so by turning the unpleasant experience into a democratic   group challenge game.</p>
<p>We started with a user research. It revealed that people wish to have a positive empowering experience, rather than a failure-focused one. They want to share their nutrition         struggles with those who deal with similar issues, and we chose to target the section of that audience that responds well to competition, and use it to motivate them.
<br>Based on those conclusions, we designed the game structure and started developing the client side and later the server side.</p>

### Features:
Habite lets you:
- Communicate with group members in a competitional / encouraging manner
- Present personal progress and relative achievement to group
- Choose challenges by using a voting system and create the overall journey

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
</details>
  
<details>
  <summary><b>Main APIs 🛠️</b></summary>
  <br>
  Firebase was chosen as the server-side DB and it is Habite’s storage & hosting platform.<br>
  Firebase provides the tools and infrastructure we needed to develop Habite. With firebase we were able to authenticate and manage users who access our application. Firebase Storage     lets us upload and store user generated content, such as images. Finally, we were able to manage our DB at cloud firestore. Cloud firestore is a flexible, scalable database for       mobile, web, and server development from Firebase and Google Cloud Platform.
  <br><br>
  <i>firebaseTools.js</i> file includes the functions that communicate with the data base.<br>
  There are auth related functions such as <i>generateUserDocument, generateGroupDocument</i> that create new user/group document in the DB. You can also find getter and setter         functions such as <i>getUserDocument , getGroupMembersData </i> that return a promise of the document of the user or usable data.
  <br><br>
  At <i>AuthContext.jsx</i> we get the data from the DB and share it with the other components in the tree by calling functions such as those we mentioned before.
  <br><br>
  At <i>mobileInfoBox.jsx </i> and <i>overview.jsx </i> there is the function <i>fetchChallenge</i> inside useEffect. The function gets current challenge of the group, and it           validates it every time there is a change with the user data or the group data or a day has changed.
  
</details>

## Contributors ✨

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <!--<td align="center"><a href="https://github.com/Yuval-Toledano"><img src="" width="100px;" alt=""/><br /><sub><b>Yuval Toledano</b></sub></a><br /><a  title="code">💻</a></td>-->
    <td align="center"><a href="https://github.com/noamTzi"><img src="https://avatars.githubusercontent.com/u/39398826?v=4" width="100px;" alt=""/><br /><sub><b>Noam Tzi</b></sub></a><br /><a title="code">💻</a></td>
    <td align="center"><a href="https://github.com/IggieB"><img src="https://avatars.githubusercontent.com/u/82638159?v=4" width="100px;" alt=""/><br /><sub><b>Iggie B</b></sub></a><br /><a title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Tal-Rosenzvi"><img src="https://avatars.githubusercontent.com/u/81176209?v=4" width="100px;" alt=""/><br /><sub><b>Tal</b></sub></a><br /><a title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/slevitz"><img src="https://avatars.githubusercontent.com/u/58976078?v=4" width="100px;" alt=""/><br /><sub><b>Sarah Levitz</b></sub></a><br /><a title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
