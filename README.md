![GitHub repo size](https://img.shields.io/github/repo-size/GlenDorner221358/Whirlpool?color=lightblue)
![GitHub watchers](https://img.shields.io/github/watchers/GlenDorner221358/Whirlpool?color=lightblue)
![GitHub language count](https://img.shields.io/github/languages/count/GlenDorner221358/Whirlpool?color=lightblue)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/GlenDorner221358/Whirlpool?color=lightblue)

<h5 align="center" style="padding:0;margin:0;">Christian Krahtz | Glen Dorner | Hannah Naidoo | Tsebo Ramonyalioa </h5>
<h5 align="center" style="padding:0;margin:0;">221198 | 221358 | 21100366 | 200200</h5>
<h6 align="center">DV200 | Term 4</h6>

<p align="center">
  <a href="https://github.com/GlenDorner221358/Whirlpool"><img src="/whirlpool/client/Assets/Whirlpool.svg" width="200px"></a>
  <h3 align="center">Whirlpool</h3>
  <p align="center">This is a MERN Stack Q&A</p>
</p>

## Table of Contents

- [About the Project](#about-the-project)
    - [Project Description](#project-description)
    - [Built With](#built-with)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Concept Process](#concept-process)
    - [Ideation](#ideation)
    - [Wireframes](#wireframes)
- [Development Process](#development-process)
    - [Implementation Process](#implementation-process)
        - [Highlights](#highlights)
        - [Challenges](#challenges)
    - [Future Implementation](#future-implementation)
- [Final Outcome](#final-outcome)
    - [Mockups](#mockups)
    - [Walkthrough](#walkthrough)
- [License](#license)
- [Acknowledgements](#acknowledgements)

# About the Project
## Project Description
Welcome to Whirlpool! This is a developer's Q&A platform, something you probably have seen on sites like Stack Overflow. This is exactly the same thing, except we took our own spin on it! Users can ask and answer questions, receive achievements based on user scores, and much, much more. This application was built with the MERN Stack

## Built With
[<img src="https://www.svgrepo.com/show/331488/mongodb.svg" width="5%" height="5%">](https://www.mongodb.com/cloud/atlas/lp/try4?utm_source=google&utm_campaign=gs_emea_south_africa_search_core_brand_atlas_desktop&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624560&adgroup=115749711783) 
<br />
[<img src="https://www.vectorlogo.zone/logos/expressjs/expressjs-icon.svg" width="5%" height="5%">](https://expressjs.com/) 
<br />
[<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" width="6%" height="6%">](https://reactjs.org/) 
<br />
[<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/590px-Node.js_logo.svg.png?20170401104355" width="7%" height="7%">](https://nodejs.org/en/)

# Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites
For development, the latest version of Node.js is required. The latest version can be downloaded from [Node.js](https://nodejs.org/en/download/)

## Installation
Here are a couple of ways to clone this repo:
1.  GitHub Desktop </br>
    Enter `https://github.com/GlenDorner221358/Whirlpool.git` into the URL field and press the `Clone` button.

2.  Clone Repository </br>
    Run the following in the command line to clone the project:
    
        git clone https://github.com/GlenDorner221358/Whirlpool.git
 
4.  Install Dependencies </br>
    Run the following in the command line to install all the required dependencies:

        npm install

# Concept Process

We really went with a simple and minimalistic UI design. Whirlpool is there to be functional and helpful to any newcomer or veteran of Whirlpool. Where they can simply ask, answer, and view questions in a quick, concise, and effective way. We stick to a simple yellow with accents of a baby blue palette. A UI trend that really started to rise among web apps was rounded corners, so we also incorporated that into our design, just to round it off even further.

## Ideation

We wanted to replicate Stack Overflow. You can view the web page <a href="https://stackoverflow.com/">here</a>.

## Wireframes

### Login
![image1](./Wireframes/Login.jpeg)
### Home/Landing
![image2](./Wireframes/Home.jpeg)
### Question
![image3](./Wireframes/Question.jpeg)
### Single Question
![image4](./Wireframes/Single.jpeg)

# Development Process

The `Development Process` is the technical implementations and functionality done for the app.

## Implementation Process

- I used `npx create-react app` to create this React project. I implemented component-based development instead of classes. By doing this, I will be able to easily inject and eject components and sub-components into my project, making it refactorable and reusable instead of writing up classes I have to do every time making it tedious and redundant

- I obeyed the `saas` styling of my project which is slightly different from `scss` as the manner in which indentation has been applied is important and semi-colons are not allowed 

- `Axios` was implemented so that I can make HTTP requests to the BallDontLie API so that I can dynamically display these datasets on a magic chart called charts.js version 5

### Highlights

stipulated the highlight you experienced with the project

- The search functionality was surprisingly easy to implement
- Cursor with gpt4 makes the workload painlessly efficient
- Working in a group allowed us to efficiently split the workload so no one was overwhelmed

### Challenges

stipulated the challenges you faced with the project and why you think you faced them or how you think you'll solve them (if not solved)

- Updating all of the data entries in our database when we made a change to the models
- The routes were a massive pain to get working
- Image uploading was a nightmare
- The styling was also quite a challenge, some components did not cooperate no matter the amount of CSS we threw at them
- one thing we had an issue with was Mac and Windows compatibility when addressing the node modules as we had to delete and reinstall the modules every time someone committed their changes on Github


## Future Implementation

stipulate functionality and improvements that can be implemented in the future.

- We would love to make our Front-end better than it is 

# Final Outcome

## Mockups

### Profile Page
![image5](./Mockup/Mockup1.png)
### Home/Landing
![image6](./Mockup/Mockup2.png)
### Question
![image7](./Mockup/Mockup3.png)
### Single Question
![image8](./Mockup/Mockup4.png)
### Single Questions Filter
![image9](./Mockup/Mockup5.png)
### Login 
![image10](./Mockup/Mockup6.png)
### Register 
![image10](./Mockup/Mockup7.png)

## Walkthrough
<p>You can view the walkthrough video <a href="https://drive.google.com/file/d/1xgmkC0OvS-_fuqtiHQIZKY5BHqz9ktbV/view?usp=sharing">here</a></p>

# Author
- **Christian Krahtz** - [Github](https://github.com/CWKrahtz)
- **Glen Dorner** - [Github](https://github.com/GlenDorner221358)
- **Hannah Naidoo** - [Github](https://github.com/HannahAmaria)
- **Tsebo Ramonyalioa** - [Github](https://github.com/Tsebo200)

# License

Distributed under the MIT License. See `LICENSE` for more information.\

- **Original Project Link** - https://github.com/GlenDorner221358/Whirlpool

# Acknowledgements

- [Stack Overflow](https://stackoverflow.com/)
- [Figma](https://www.figma.com/)
- [ChatGPT](https://chat.openai.com/)
- [Cursor](https://cursor.sh/)
