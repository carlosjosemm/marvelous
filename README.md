# Try it out!
Project deployed at :rocket: **[marvelous-project.vercel.app](https://marvelous-project.vercel.app/)**
----
# Main features
----
## Hero landing page :house:
Upon navigation to the root page, the user is redirected to the **Hero page** and is shown the info from a random Hero.
This behaviour is meant to allow the integration of a proper landing page. Per the current requirements, no landing page besides the Hero page was requested.
## Search functionality :mag:
Searches can be done with the use of the generic input or the advanced search inputs (when enabled) at the **Header**. Enabling advanced search limits the comics shown by the "comics" parameters used (i.e. searching for any hero and "avengers" comics will only show comics with title starting with "avengers" where that hero appears). 

These "comics" parameters are not necessary even when advanced search is enabled. Open up any hero you want by **clicking on its card** and browse the latest comics where they appear that matches your search parameters (or latest comics in general in case you didn't provide any).

Try multiple hero and comics parameters by separating them with a comma! (",").

Also, you could use the simple search feature to look for specific comics if you provide the full marvel's site URL of said comic.
## Favorite functionality :star:
Try saving you favorite searches using the Fav icon on any hero! This will save the hero and the comics you searched for at the same time. Don't worry, your favorites will persist as long as your browser allows it.

Visit your favorite searches at anytime at the **fav icon** in the upper right corner of the page.
## Dark theme :moon:
If you're a nocturnal creature, try out the **dark theme** by switching it at the bottom of any page. Your eyes will appreciate it!

# Developers
----
## Deployment :airplane:
To deploy this page on vercel front-end cloud, connect your vercel project to your repo and provide it with your Marvel API public key with the variable name "**NEXT_PUBLIC_API_PUBLICKEY**". This must be done in the Vercel page at the moment of setting up a new deployment of the project.

## Themeing :art:
If you'd like to quickly change the appearance or look & feel of the page, try modifying the values at the theme object for both **light** and **dark** theme. There you can change the values of colors for many things from text to icons, back- and fore-ground!

## Testing :construction:
Testing of components is a work on progress... :hammer: :wrench: