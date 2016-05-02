Note
---
This isnt really for public consumption, I use it on my various chrome extensions, use at your own risk.

Setup
----
heroku create extension-services

Deploying
-----
1) cd server 
2) gulp release
3) commit all files in sourcetree
4) cd ..
5) git subtree push --prefix heroku heroku master
6) heroku open