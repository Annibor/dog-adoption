# PawPal

[]()

# Introduction



![Am I Responsive Screenshot]()

## Table of Content

- [**PawPal**](#PawPal>)
  - [**Introduction**](#introduction)
  - [**Table of Content**](#table-of-content)
  - [**Planning & Development**](#planning--development)
    - [**Agile Planning**](#agile-planning)
    - [**Structuring Development with User Stories**](#structuring-development-with-user-stories)
    - [**Task Breakdown and Epic Creation**](#task-breakdown-and-epic-creation)
     - [**Prioritization with MoSCoW Method**](#prioritization-with-moscw-method)
    - [**Project Goals**](#project-goals)
    - [**User Stories**](#user-stories)
      - [**As a General User**](#as-a-general-user)
      - [**As a New User**](#as-a-new-user)
    - [**Epic Breakdowns**](#epic-breakdowns)
      - [**Epic 1: Home Page Experience**](#epic-1-home-page-experience)
      - [**Epic 2:**](#)
      - [**Epic 3: **](#)
      - [**Epic 4: Blog Interaction**](#)
      - [**Epic 5: s**](#)
    - [**Adaptive Development and Reflection**](#adaptive-development-and-reflection)
    - [**User-Centered Approach**](#user-centered-approach)
    - [**User Stories images**](#user-stories-images)
    - [**Database schema**](#database-schema)
    - [**Wireframes**](#wireframes)
      - [**Home Page**](#home-page)
    - [**Design Philosophy/ Features**](#design-philosophy-features)
      - [**Responsive Design**](#responsive-design)
      - [**Minimalistic Layout**](#minimalistic-layout)
      - [**Usability Enhancements**](#usability-enhancements)
      - [**Future-Proof and Scalable**](#future-proof-and-scalable)
    - [**Colors**](#colors)
    - [**Fonts**](#fonts)
    - [**Features**](#features)
    - [**Future Features**](#future-features)
  - [**Testing**](#testing)
  - [**Devtools**](#devtools)
    - [**Ligthouse**](#lighthouse)
    - [**JS Hint**](#js-hint)
  - [**Deployment**](#deployment)
  - [**Bugs**](#bugs)
  - [**Languages**](#languages)
  - [**Libraries and Installed Packages**](#libraries-and-installed-packages)
  - [**Software**](#software)
  - [**Media**](#media)
  - [**Usage**](#usage)
  - [**Modification**](#modification)
  - [**Distribution**](#distrubition)
  - [**Private Use**](#private-use)
  - [**Liability**](#liability)
  - [**Credits**](#credits)
  - [**Content**](#content)
  - [**Special thanks**](#special-thanks)
  - [**What I've learned**](#what-ive-learned)

## Planning & developmnet

## Agile Planning

The development of *PawPal* was meticulously planned and executed following agile methodologies. This section outlines the user stories and epics that guided the development process, ensuring that each feature not only meets the users' expectations but also enriches their interaction with the app.

### Structuring Development with User Stories

At the heart of my agile planning were the User Stories - the narratives that captured the essence of what the users, both general visitors and registered members, sought from *PawPal*. These stories facilitated a deep understanding of the audience's needs, guiding the development process from a user-centric perspective.

### Task Breakdown and Epic Creation

Each User Story sparked a series of tasks - specific, actionable steps designed to bring that story to life. 

### Prioritization with MoSCoW Method

To navigate the myriad of development tasks efficiently, I used the MoSCoW method of prioritization:

- **Must Have**: Core functionalities that were essential for the application's launch, such as the ability to view and interact with avaliable dogs.
- **Should Have**: .
- **Could Have**: Additional features that, while not critical, could further enrich the application, including enhanced styling and responsive design elements.
- **Won't Have (this time)**: Ideas that were put on hold for future development, allowing us to focus on the most impactful features first.

My project board can be found here: 
[Project borad](https://github.com/users/Annibor/projects/11/views/1)

- [Back to Top](#table-of-content)

### Project Goals

The primary goal of *PawPal* is to :
-  create a user-friendly platform where individuals can view, search, and apply for adopting dogs, while ensuring that the website is accessible, responsive, and easy to navigate.

- [Back to Top](#table-of-content)

### User Stories

**As a Visitor or Registered User:**

- **Access the Home Page**: As a user and visitor, I want to easily access the homepage and understand the purpose of the site.
- **View Dog Listings**: As a user, I want to browse through the list of available dogs to find one that I might be interested in adopting.
- **Filter Dogs by Breed and Age**: As a user, I want to filter dogs by breed and age to narrow down my search.
- **View Dog Details**: As a user, I want to click on a dog to view more detailed information about it.
- **View Event Details**: As a user, I want to browse through the events to find one that I want to apply to.
- **View Event and adoption Applications**: As a user, I want to be able to view all my applied events and adoptionapplications on my profile page in order to have a overview of them.


- [Back to top](#table-of-content)

#### As a General user

**As a General User:**

- As a general user, I want to see information about the rescue center and their dogs.
- As a general user, I want to be able to apply for adoption and events, like dogs, unlike dogs and unapply from events and adoptionapplications.
- As a general user, I want to be able to update my profiel with my address, pgone number and name.


- [Back to Top](#table-of-content)

#### As a New User

**As a New User:**

- As a new user, I need to quickly understand how to navigate the app to start searching and save/like dogs.
- As a new user, I want to register and create a profile so I can save my favorite dogs and apply for adoption.


- [Back to Top](#table-of-content)

### Epic Breakdowns

**Epic 1: Pages**
- *Must Have*: Good layout for the pages so that visitors and users can easily navigate and understand what they need to do.
- **Tasks Included:**
  - Create home page structure with components.
  - Create dogs page with components.
  - Create profile page with components.
  - Create login page with components.
  - Create register page with components.

**Epic 2: Writing Tests**
- *Should Have*: Write tests for the code to ensure functionality.
- **Tasks Included:**
  - Write tests for frontend code.
  - Write tests for backend code.

**Epic 3: Health Records**
- *Should Have*: Manage health records for each dog, making them viewable to registered users.
- **Tasks Included:**
  - Frontend: View a health records list for each dog on their page.
  - Backend: Users can retrieve health records for a specific dog. Admin can create, update, and delete health records.

**Epic 4: Adoption Events**
- *Should Have*: Allow users to view and list adoption events.
- **Tasks Included:**
  - Frontend: Display a list of adoption events.
  - Backend: Allow admins to create, update, and delete events.

**Epic 5: Documentation**
- *Must Have*: Document the backend API development and frontend development of the app.
- **Tasks Included:**
  - Document the backend API.
  - Document the frontend components and design.

**Epic 6: Adoption Application**
- *Must Have*: Create an adoption application form for users to book visits with potential adoption dogs.
- **Tasks Included:**
  - Backend: Create a model for the adoption form.
  - Frontend: Create an adoption form that auto-fills user information from their profile.

**Epic 7: Profiles**
- *Must Have*: Comprehensive management system for users to manage profiles and show liked/saved dogs.
- **Tasks Included:**
  - Backend: Establish secure and scalable API endpoints for profile-related operations.
  - Frontend: Design user-friendly interfaces for profile management and displaying liked/saved dogs.

**Epic 8: Basic Dogs Management**
- *Must Have*: Core functionality for listing dogs available for adoption.
- **Tasks Included:**
  - Frontend: Design components for displaying dogs and allowing users to add dogs to their save list.
  - Backend: Create a dog model and add filtering and search functionality.
  

  - [Back to Top](#table-of-content)

### Adaptive Development and Reflection



- [Back to Top](#table-of-content)

### User-Centered Approach



**Accessibility**
- Universal Design: 


- Accessibility Features:


**Engagement and Interaction**
- Community Engagement: 


- User Feedback:


**Intuitive Navigation**
- 

- Discoverability:

- [Back to Top](#table-of-content)

### User Stories images
Here are the user stories and epics connected to the project:

![User stories 1]()

### Database schema
- **User Model (Django AllAuth)**: Serves as the central model, linking to other models like posts, comments, and likes for comprehensive user interaction within the platform.



- ![Database schema]()

### Wireframes

I've created my wireframes for the website by using [Balsamiq](https://balsamiq.com/). I created one wireframe for mobile, tablet and desktop on each page of the website.

#### **Home page**
- ![Homepage mobile]()
- ![Homepage tablet]()
- ![Homepage desktop]()

- [Back to Top](#table-of-content)


- [Back to Top](#table-of-content)

#### **Not logged in**
- ![Not logged in mobile]()
- ![Not logged in tablet]()
- ![Not logged in tablet]()

- [Back to Top](#table-of-content)

#### **Login**

- ![Login page mobile]()
- ![Login page tablet]()
- ![Login page desktop]()

- [Back to Top](#table-of-content)

#### **Register**

- ![Register page]()

- [Back to Top](#table-of-content)

#### **Logout**

- ![Logout page mobile]()
- ![Logout page tablet]()
- ![Logout page desktop]()

- [Back to Top](#table-of-content)

### Design Philosophy/ Features


- [Back to Top](#table-of-content)

#### **Responsive Design**
- Fluid Layouts:


- [Back to Top](#table-of-content)

#### **Minimalistic Layout**
- Clutter-Free Interface: 

- [Back to Top](#table-of-content)

#### **Usability Enhancements**
- Navigation and Accessibility: 

Interactive Elements: 


- [Back to Top](#table-of-content)

#### **Future-Proof and Scalable**
- Built to Evolve: 


- [Back to Top](#table-of-content)

### Fonts
**Typography and Colors**


- [Back to Top](#table-of-content)

### Colors
- Palette Choices:


- [Back to Top](#table-of-content)

### Features

- **Header**:
- ![Header mobile](/documentation/testingimages/feature-header-mobile.png)

- [Back to Top](#table-of-content)

### Future Features

Planned enhancements for the website to further enrich user experience include:



**Save Posts for Later**
- **User Story**:
- Acceptance Criteria:
 - 

**Enhanced User Profile Management**
- *User Story*:
- *Acceptance Criteria*:
 - 

**About Page for Blog and Creators**
- *User Story*: 
- *Acceptance Criteria*:
 - 


- [Back to Top](#table-of-content)

## Testing

- Throughout the whole development of the webpage, I've made tests in:

### Wc3

- Homepage

- [Back to Top](#table-of-content)

### DevTools

- Troughout the development I've used Devtools to inspect and test the website to be able to make the best I could for it.

- [Back to Top](#table-of-content)

### Lighthouse

- ![Lighthouse Homepage mobile]()

- [Back to Top](#table-of-content)

### JS HINT

- JSHint test for Javascript code.

- ![Js hint test for javascript](/documentation/testingimages/jshint-test.png)

- [Back to Top](#table-of-content)

### CI Python Linter

- CI Python Linter tests are all okey



### Jigsaw

- Jigsaw testing is clear


### Manual testing

I tested the website manualy throughout the whole developing progress. The website is tested in Safari, Google Chrome and Brave. The website is also tested from an Iphone.

- [Back to Top](#table-of-content)

#### Manual testing

<table>
  <thead>
   <tr>
     <th>Testing Description</th>
     <th>Expected Action</th>
     <th>Actual Output</th>
     <th>Result</th>
   </tr>
 </thead>
  <tbody>
  <tr>
     <th></th>
     <th></th>
     <th>As expected</th>
     <th>Pass</th>
   </tr>
  <tr>
     <td></td>
     <td></td>
     <th>As expected</th>
     <th>Pass</th>
   </tr>
   <tr>
     <td></td>
     <td></td>
     <th>As expected</th>
     <th>Pass</th>
   </tr>
   
  </tbody>
</table>

- [Back to Top](#table-of-content)

## Deployment

This section guides you through the deployment of an project on Heroku, including handling different branches and deployment preferences.

### Preparing for Deployment

Ensure your project includes a `requirements.txt` and a `Procfile`, which are essential for Heroku to understand how to run your application.

1. **requirements.txt**: Generate this file using `pip freeze > requirements.txt` to list all necessary Python packages.
2. **Procfile**: Create this file in your project's root directory with the content: `web: gunicorn your_project_name.wsgi`, replacing `your_project_name` with the name of your Django project.

### Deploying to Heroku

1. **Create a Heroku Account**: Sign up at [Heroku's website](https://signup.heroku.com/).
2. **Create a Heroku App**: Use `heroku create your-app-name`, substituting `your-app-name` with your desired app name.
3. **Set Config Vars**: Navigate to your app's settings on the Heroku dashboard, under "Config Vars", set:
    - `SECRET_KEY`: Your Django secret key.
    - `DATABASE_URL`: The database URL, typically provided by Heroku Postgres.
    - `CLOUDINARY_URL`: If using Cloudinary for media storage, your Cloudinary URL.

### Managing Branches and Deployment Options

1. **Branch Management**: If your development involves multiple branches, Heroku deploys from the main branch by default. To deploy from a different branch, use `git push heroku your-branch-name:main`, replacing `your-branch-name` with the name of your branch.

2. **Automatic vs. Manual Deployment**:
   - **Automatic Deployment**: In the Heroku dashboard, under the "Deploy" tab, you can connect your GitHub repository and enable automatic deploys from your chosen branch. This means any push to the selected branch automatically triggers a deployment.
   - **Manual Deployment**: If you prefer more control over when your changes go live, stick with manual deployments using the `git push heroku main` command for the main branch, or the appropriate branch name if deploying from a non-main branch.

3. **Deployment Preference**: You can switch between automatic and manual deployments based on your project's needs. For instance, automatic deployments are convenient for continuous delivery environments, while manual deployments offer more control for testing and final approvals before going live.

### Final Steps

1. **Run Migrations**: Execute `python3 manage.py makemigrations` `python3 manage.py migrate` to apply database migrations.
2. **Access Your App**: Open your app in a browser with `heroku open` or by visiting `https://your-app-name.herokuapp.com`.

### Forking and Cloning (Optional)

- **Forking**: Click 'Fork' on the GitHub repository page to copy the project under your account.
- **Cloning**: Use `git clone copied-url` with the URL from the 'Code' button on GitHub to clone the repository for local development.

My link is: []()

- [Back to Top](#table-of-content)

## Bugs

- When first trying to connect the frontend app to the api, and add a new user, I got an 404 error. This lead to a lot of googling the issues and error messages, for me to figure out what was wrong in the code, and what I had to do in order to fix it.

## Languages

- Python and the Django framework were used for backend development, data manipulation, and application logic.

- HTML was utilized to structure the content on web pages.

- CSS was employed for styling, including layout designs, colors, and fonts, to enhance the user interface.

- JavaScript may have been used to add interactive elements to the web pages, in conjunction with libraries or frameworks like Bootstrap for responsive design.

- SQL, through Django models, facilitated database management and operations, handling data storage, retrieval, and manipulation.

- Django Template Language enabled dynamic data insertion into HTML, allowing for a seamless integration of backend and frontend elements.

This project showcases a full-stack web development approach, leveraging the strengths of each technology to create a comprehensive and interactive web application.

- [Back to Top](#table-of-content)

## Libraries and Installed Packages

- Cloudinary: A cloud-based service for hosting videos and images. Used in conjunction with dj3-cloudinary-storage for managing static and media files in the cloud.
- crispy-bootstrap5: An extension of django-crispy-forms specifically for Bootstrap 5.
- django-allauth: Provides authentication, registration, account management, and third-party (social) account 

- [Back to Top](#table-of-content)

## Software

- I've used Visual Studio Code to write the code.
- I've used Git to load and push my code to Github and for version control.
- I've used GitHub for repository management.
- I've used preinstalled app called "Preview" to edit the sizes of the photos.
- I've used Coolors.co to find a color palette for the website.
- I've also used Coolors.co to contrast check text colors and background colors.
- I've used maketintsandshades.com to find evetuals tints and shadow colors as a complement for the color palette.
- I've used Balsamiq when I made the wireframes for the website.
- I've used cssgradient.io to make the background gradient.
- I've used Chat GPT and google translate for some translations and questions.

- [Back to Top](#table-of-content)

## Media

- I've used Chat GPT for making images that would fit the project.
- I've used unsplash for images.

- [Back to Top](#table-of-content)

## Usage

- This project is available for viewing and can be used for educational purposes.

- [Back to Top](#table-of-content)

## Modification

- Any modification, transformation, or extension of this project for commercial or public purposes is not allowed without explicit permission.

- [Back to Top](#table-of-content)

## Distrubition

- The redistribution of this project, wheter in its original form or with modifications, is sricktly prohibited without prior consent.

- [Back to Top](#table-of-content)

## Private Use

- Feel free to use this project for private purposes, sush as personal reference or study.

- [Back to Top](#table-of-content)

## Liability

- The creator of this project shall not be held liable for any adverse outcomes or damages resulting from the use or misapplication of this project. Users are advised to exercise due care and discretion when utilizing the project's resources and functionalities.

- [Back to Top](#table-of-content)

## Credits

### Content

- This README is based upon three sourses for guidance: one by Davis Calikes, available at [GitHub](https://github.com/davidcalikes/portfolio-project-one#readme), one by Victoria Traynor, avaliable at [Github](https://github.com/VictoriaT87/P4-Aventine-Wellness/blob/main/README.md), and another authored by me, available at [GitHub](https://github.com/Annibor/EarthEcho-Studios/blob/main/README.md)
- Usage, Modification, Distrubition, Private Use and Liability Content: The guidelines pertaining to usage, modification, distribution, private use, and liability are directly derived from my project, accessible at [GitHub](https://github.com/Annibor/EarthEcho-Studios/blob/main/README.md)
- This project is inspired by the I Think Before I Blog form code institue. 

- [Back to Top](#table-of-content)

### General Credits


- [Back to Top](#table-of-content)

### Special Thanks

I would like to express my gratitude to the following individuals who have made a meaningful impact on this project:

- **Michel**: My wonderful boyfriend, whose unwavering support and encouragement have been my constant motivation.
- [Back to Top](#table-of-content)

## What I've Learned


In developing this project, I've embarked on a journey that was both challenging and immensely rewarding. Here are some reflections on what I've learned along the way:

- **Problems**:


- **Adaptability in Problem-Solving**: 
