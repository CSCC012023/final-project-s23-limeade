# GoGo / Limeade

 > _Note:_ This document is meant to be written during (or shortly after) your initial planning meeting.     
 > It does not really make sense for you to edit this document much (if at all) while working on the project - Instead, at the end of the planning phase, you can refer back to this document and decide which parts of your plan you are happy with and which parts you would like to change.


## Iteration 4

 * Start date: 2023 July 24
 * End date: 2023 August 4

## Process

Quick Introduction to the process

#### Changes from previous iteration

List the most significant changes you made to your process (if any).

 * At most 3 items
 * Start with the most significant change
 * For each change, explain why you are making it and what you are hoping to achieve from it
 * Ideally, for each change, you will define a clear success metric (i.e. something you can measure at the end of the iteration to determine whether the change you made was successful)

 > *Note:* If you are not making any changes to your process, it means that you are happy with all of the decisions you made in the previous iterations.
 > In this case, list what you consider to be the most significant process decisions your team made. For each decision, explain why you consider it successful, and what success metric you are using (or could use) to assert that the decision is successful.

We removed inviting people to chats as a potential feature, this is because events are tied one to one with chat rooms so it would be redundant to do this feature. We have an invite to event feature that will basically cover both invite to event and chat room. Our clear defined success metric is that we will have this feature done and not the other feature. 

We removed chat listing feature since chat rooms are tied to events so it is redundant just as described previously. A success metric is that this feature will be done but not the other one. 

We are adding a feature to unblock users. Users should be able to unblock a user after they have been blocked. 


#### Roles & responsibilities

Describe the different roles on the team and the responsibilities associated with each role.

 * Amy: implementing event interest filtering + premium user event advertising
 * Kai: implementing event cost covering feature + making the website look nicer, if there’s time
 * Youngjae: filter users using interests
 * Lukas: invite people to events
 * Gary: unblock users + documentation


#### Events

Describe meetings (and other events) you are planning to have:

 * When and where? In-person or online?
 * What's the purpose of each meeting?
 * Other events could be coding sessions, code reviews, quick weekly sync' meeting online, etc.

5 online standup meetings using messages on discord 

#### Artifacts

List/describe the artifacts you will produce in order to organize your team.       

 * Artifacts can be To-do lists, Task boards, schedule(s), etc.
 * We want to understand:
   * How do you keep track of what needs to get done?
   * How do you prioritize tasks?
   * How do tasks get assigned to team members?
   
Jira Board
* assigning story points and members to tasks

#### Git / GitHub workflow

Describe your Git / GitHub workflow.     
Essentially, we want to understand how your team members share a codebase and avoid conflicts.

 * Be concise, yet precise.      
For example, "we use pull-requests" is not a precise statement since it leaves too many open questions - Pull-requests from where to where? Who reviews the pull-requests? Who is responsible for merging them? Etc.

 * If applicable, specify any naming conventions or standards you decide to adopt.

 * Don't forget to **explain why** you chose this workflow.

We have a main branch and a development branch. During the sprint, any features and fixes should be merged to the development branch and then at the end of the sprint, the main branch should merge with the development branch. This is to protect the integrity of the main branch during the sprint and while changes are still being made. Changes are made to the development branch by creating a new branch per feature (Jira story) or bug fix and using pull-requests to merge. People review pull requests and merge them by themselves. As for naming conventions we name them after our tickets on Jira. This is so we can track our branches based on ticket number. 


## Product

_This entire section is mandatory._


#### Goals and tasks

 * Describe your goals for this iteration and the tasks that you will have to complete in order to achieve these goals.
 * Order the items from most to least important.
 * Feel free (but not obligated) to specify some/all tasks as user stories.

-----

 * Premium user event advertising
 * Event interest filtering  
 * Event cost covering feature
 * Unblock users
 * Invite users to events



#### Artifacts

List/describe the artifacts you will produce in order to present your project idea.

 * Artifacts can be text, code, images, videos, interactive mock-ups and/or any other useful artifact you can think of.
 * Make sure to explain the purpose of each artifact (i.e. Why is it on your to-do list? Why is it useful for your team?)
 * Be concise, yet precise.         
   For example: "Build the website" is not precise at all, but "Build a static home page and upload it somewhere, so that it is publicly accessible" is much clearer.

-----

 * Build an interactive website demo that can be deployed using a CI/CD pipeline
