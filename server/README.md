# :recycle: Ecoleta NodeJS API (Back-end)

## :information_source: About

This is the backend code for the app created in the **Next Level Week** from **Rocketseat**. For information about complete application, view the `README.md` in root of the repository.

## :flags: Future

Some features, that i want to add to this server was not in this version and, in this section, i decided to list each of this features for a mental helper for next changes in this code.

### Send errors informations for front-end

Using the `response.status(400)` or other codes as response in error handlers, the JavaScript front-end can't receive this. In the future i want to change the information return (in all routes) to support sending error as optionally data information and send all as `200` status code.

### Add support to authentication and edit informations

Add, in the future, password field in create point form and add authentication support to edit information.
