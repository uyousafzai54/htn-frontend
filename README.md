# Hack the North 2021 Frontend Challenge - Umar Yousafzai

Hi! I'm Umar and this is my submission for Hack the North 2021 Frontend Challenge. To view the project, visit https://htn-frontend-umar.herokuapp.com/ or clone this repo as instructed below.

## How to Run the Application

1. Install Node.js from https://nodejs.org/en/ if you don't have it installed.
2. Clone the project by running `$git clone https://github.com/uyousafzai54/htn-frontend.git`.
3. Cd into the project and run `$npm i` to install all dependencies.
4. Run `$npm start` to open the application on http://localhost:3000.

## Writeup

1. Walk us through your development process as you worked on this project. How did you plan out the structure and design of it? How did decide on the tools you've used? Did you encounter any problems? And if so, how did you solve them? Are there any areas of your code that you're particularly proud of or want to point out?

## Development Process

When I first decided to create this project, I wanted to implement as much of the required funtionality as possible. For this web app, the most basic version included displaying the list of events on page with each event displayed on some sort of card component. I also decided on what important features I needed to implement such as a user authentication, nav bar, buttons for login and logout, and a router to link different pages. I then broke down the UI into as many components as I could and implemented them using external libraries such as Bootstrap. After I was able to implement user authentication with Auth0, display the events based on start time and hide private events for users not logged in, I decided to implement the search bar and dropdown menu for filtering events. For these two features I decided to use a useEffect hook in React that would filter the events and store them in a new array based on the text inputted in the search bar and the event type option chosen from the drop down menu. This was based on an onClick function implemented for both the search bar and the drop down menu so that the useEffect hook was only called when either of these changed. The new filtered array was then displayed as the list of events. I also made sure to set default values for when the page was loaded for the first time. After the search and filter events functionality was implemented, I implemented the last requirement which was the ability to link and view each related event. I did this by creating a separate page for each event that displayed all the details for the event including a list of related events. This required storing the list of all events locally while also creating protected routes for events that were private.

## Tools

For the tools, I decided to use React as it is a very popular frontend framework that I am most comfortable with and is increadibly versatile in increasting extensive and interactive UIs. React's simplicity, great performance, reusable components and the ability to integrate numerous libraries make it a great choice for creating web apps.

Some of the others libraries I decided to use include Auth0, React-Router, LocalStorage, Bootstrap. I used Auth0 for login as without Auth0, I would have to implement user login and registration with JWT authentication and create a server to store users in a database. This is usually done in the backend of a project and since this is a frontend challenge, I instead decided to use Auth0. Auth0 takes care of the entire login and registration process by allowing users to either sign up or login in with other social accounts (such as Google or Facebook). With Auth0 you can also easily implement protected routes for your apps to check if a user is logged in before private pages.

I used React-Router to manage navagating between different pages on my app, LocalStorage to save the list of events fetched from the HTN API and Bootstrap to use their prestyled navbar, card, search bar and dropdown menu components.

## Problems

While creating this app, I ran into numerous problems some of which are listed below.

1. The first problem I had was when I wanted to create a separate page for each event that the user could visit. Unfortunately, I wasn't able to pass a specific event as prop to the event page that I had created. Therefore, I decided to instead make another call to the HTN API on the Event Page and a fetch a specific event using its id property.

2. The second problem I faced was with related events. I wanted to display the names of the related events on the Event Page with hyperlinks to the pages of those events. However, the HTN API only returned the ids of the related events, not the events themselves. I didn't want to make more API calls as I was already making another API call everytime the user visited the page of a specific event. Thus, I looked for options to store the array of events I got when I made the first API call to get all the events locally. I tried to implement useContext from React which allows multiple components in different heiarchical levels to access data that they might need however, after being unsuccessful I decided to use localStorage which is often used to persist state in React. I used localStorage to cache the result of fetching data from the HTN API. This meant that I only had to call the HTN API once when I was getting the entire list of events and on a specific event's page I was able to use localStorage to get the event and the list of its related events. This was a really great solution as I didn't have to make any redundant API calls, thus improving the efficiency of my app.

3. The third major problem I faced was with authentication for pages of private events. The way that Auth0 authenticates private routes is that the entire component is wrapped in an Auth0 component that checks if a user is logged in. Otherwise, it directs them to the Auth0 login/registration page. However, since my entire `EventPage.js` page was wrapped by the Auth0 component, this meant that public events also led a user who wasn't logged in to the Auth0 login/signup page. To fix this, I tried looking into a way to conditionally restrict a user to an event's page depending on if the event was public or private. However, after being unable to do so, I decided to create two separate pages for events called `PrivateEventPage.js` and `PublicEventPage.js` to show the details of a private and public page, respectively. This was not the best solution as the code for the two pages is nearly identical. This also created some ambiguity as to whether a logged in user should see the private page for only the private events or the private page for both private and public events. However, this solution allowed anyone to access public events. Furthermore, if a private event was one of the related events for a public event, clicking on it would lead the user to the Auth0 login/signup page as it was a protected route.

4. The last major problem I faced was with styling. Since I wanted to implement as much functionality as I could, I left the styling minimal so that in the future if this app was to be used, it could be styled according to HTN's guidelines. I used bootstrap's styled components along with my own CSS in order to have a basic level of styling. However, there are still some styling issues such the styling for `PrivateEventPage.js` and `PublicEventPage.js` pages are slightly different from each other.

## Proud Areas of my Code

I'm really proud of the Auth0 integration with my project as it makes user registration and login extremely easy and secure. Furthermore, in the future if other protected routes are needed, they can be easily implemented by wrapping those pages with the Auth0 component. I'm also really proud of my search bar functionality and the ability to filter events using a dropdown menu. Apart from that, I'm really proud of how responsive and visually minimalistic my application is.

2. Given additional time, how would you extend your application to become a fully functional product that thousands of hackers and the general public would use at Hackathon Global Inc.™'s next event?

I would first focus on improving the UI by implementing a consistent styling theme that is used by Hack the North. Then I would try to make my code more modular by creating more components in order to remove duplicate code. For example, the search bar and drop down menu could be made into a separate component instead of being implemented directly on the `Events.js` page. I would also work on improving the UI on other devices such as phones as currently some of event cards are squished together and don't look great. I would also try to implement other features such as the ability to save and register for an event which would be visible on a dashboard for the hacker and fully implement the Profile page as right now, it only shows the name, email and avatar of the user logged in. I would also try to make my app more accessible for users with impairments and implement the ability to switch languages for hackers from other countries.

## Considerations

\*\*Is the code written and documented such that a developer who is unfamiliar with the code can understand it relatively quickly?

While writing my code, I organized it in such a way that any developer would be able to look at the different files and understand how the entire project is structured. For example, I stored components, pages, styles and assets in separate folders and gave each file descriptive names in order for another developer to understand their purpose. I also created multiple smaller, reusable components such as `nav-bar.js` and `authentication-button.js` in order to shorten the amount of code I wrote.

\*\*Is your project structured in a way that is extensible and scalable? For example, if we wanted to add more events or event types, would it be possible to do so easily?
When creating my project, I kept in mind scalability as I didn't want to write code that would cause the app to be inefficient if for example more events were added. This is why I decided to cache all the events returned by the HTN API in localStorage. If in the future the HTN API returned more information, this could simply be handled by editing for the `Event.js` component which returns a card with information to include extra fields. By breaking down the structure of the code into smaller components, I ensured that in the future these components could be reused with other new components to implement new features without making the app inefficient.

\*\*Are you following best practices to make sure the project is maintainable if development were to continue on it?
I made sure to follow best practices my organizing my files in specific folders, hiding my environment variables in a dotenv file, implementing proper security with Auth0 and breaking the UI into multiple different reusable components.

\*\*Is the styling and appearance of your application consistent and appealing?
While creating this app, I made sure to keep the styling appealing but minimal. This was to ensure that if in the future development were to continue on it, the app could be easily styled by UI designers according to the themes and styles used by Hack the North without having to replace the old styling. I also saved all the styling in one place so that it could be easily referenced in the future.
