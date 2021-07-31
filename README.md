
![](https://github.com/Yuval-Toledano/Habite/blob/main/src/images/logo.svg)

## HABITE 🍬 
<p><b>Social sugar consumption reduction application.</b></p>
<p>Habite helps young people who want to consume sugar more responsibly, to compete together with people whom they trust in nutrition challenges and by this, create healthier habits.</>

<a href="https://habite-fd756.web.app">To the App...</a>

### Why Habite? 🤩

<p>A common issue many face nowadays is the high sugar consumption found in most western countries. While many struggle to decrease their sugar intake very few actually succeed.         <b>Habite</b> is a solution for adults and young adults who are interested in changing their sugar consumption habits, and do so by turning the unpleasant experience into a democratic   group challenge game.</p>
<p>We started with a user research. It revealed that people wish to have a positive empowering experience, rather than a failure-focused one. They want to share their nutrition         struggles with those who deal with similar issues, and we chose to target the section of that audience that responds well to competition, and use it to motivate them.
<br>Based on those conclusions, we designed the game structure and started developing the client side and later the server side.</p>

### Features
Habite let you:
- Communicate with group members in a competitional / encouraging manner
- Present personal progress and relative achievement to group
- Choose challenges by using a voting system and create the overall journey

<details>
  <summary>Architectural overview</summary>
</details>
  
<details>
<summary>Main APIs</summary>
  <br>
  Firebase was chosen as the server-side DB and it is Habite’s storage & hosting platform.<br>
  Firebase provides the tools and infrastructure we needed to develop Habite. by firebase we were able to authenticate and manage users who access our application. Firebase Storage     lets us upload and store user generated content, such as images. Finally, we were able to manage our DB at cloud firestore. cloud firestore is a flexible, scalable database for       mobile, web, and server development from Firebase and Google Cloud Platform.
  <br><br>
  At firebaseTools.js file, you can find most of our functions that communicate with the data base.
  
  
</details>
