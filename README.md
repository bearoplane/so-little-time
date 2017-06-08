So Little Time
====

So Little Time is a basic To-Do app, the likes of which you are certainly familiar with.
It is built with the following technologies:

Next.js
redux-sagas
Firebase
torus

It is fully server-rendered

Sagas handle all of the async, which in this case is just requests to Firebase

The `firebase` reducer handles all the errors coming from the API, but doesn't touch the data
The `todos` reducer just handles the data

All `todo`s need to have an `id` property. This should be added to the object right before it gets passed to Firebase, thus the entities in Firebase should all have the `id` property, so we can assume that anything coming back from Firebase has this set.

`Todo` is an entity with the following shape:
```
{
  id:
  text:
  done:
  timestamp:
}
```


Still to-do
====
Visual design
listen to events other than 'child_added' (for deleting and stuff)
there is a visible little jitter when adding, clean up transitions and stuff
just clean up code generally

Next Steps
====
Implement Immutable in reducers and pages' `mapStateToProps` method
