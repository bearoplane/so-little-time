So Little Time
====

So Little Time is a basic To-Do app, the likes of which you are certainly familiar with.
It is built with the following technologies:

* react-redux
* Next.js
* redux-sagas
* Firebase
* material-ui
* jest

It is fully server-rendered
Sagas handle all of the async, which in this case is just requests to Firebase

`/pages` contains the next.js pages
`/components` is just React components
`/src` contains the rest: reducers, actions, sagas, the store, etc.

NB. being unfamiliar with next.js, the structure is a bit strange

Installation instructions
====
1. Run `npm install`
2. Then run `npm run dev` and you're off to the races

Still to-do
====
* listen to events other than `child_added` (`child_removed` and `child_changed`), just need to attach to some other events because currently delete and update operations don't live reload for other people
* there is a visible little jitter when adding, I was futzing with the todo creation given that Firebase generates an ID automatically, which is great, but I need the ID BEFORE sending it to firebase so I can optimistically add the item to the list
* just clean up code generally
* A handful of little things like clearing the text box when it submits (successfully), finishing the design
* `React attempted to reuse markup in a container but the checksum was invalid.` <-- this error. I think there is an extra div when rendering on the client versus the server

Next Steps
====
* Implement Immutable in reducers and pages' `mapStateToProps` method
* Put Firebase API stuff in torus :D
* Sort by timestamp (it's there, I'm just not using it)
