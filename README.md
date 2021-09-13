# [Encryptographs](https://encryptographs.com)
![Website](https://img.shields.io/website?label=Website&up_message=encryptographs.com&url=https%3A%2F%2Fencryptographs.com)
![GitHub last commit](https://img.shields.io/github/last-commit/zoranbajic/encryptographs?logo=GitHub)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/zoranbajic/encryptographs/etebase?label=Etebase)
![GitHub top language](https://img.shields.io/github/languages/top/zoranbajic/encryptographs?logo=GitHub)
![GitHub repo size](https://img.shields.io/github/repo-size/zoranbajic/encryptographs?logo=GitHub)
![Chromium HSTS preload](https://img.shields.io/hsts/preload/encryptographs.com)
![Mozilla HTTP Observatory Grade](https://img.shields.io/mozilla-observatory/grade/encryptographs.com?logo=Mozilla)

Encryptographs is an end-to-end encrypted single page app that allows users to securely share photo albums with friends and family. It utilizes Etebase, an SDK developed by EteSync which ensures that users are in complete control of their data.

## Features

* **Security:** All photos are end-to-end encrypted using [Etebase](https://www.etebase.com) and can only be viewed by you and users you share them with.
* **Privacy:** Minimal information is needed to sign up. An email address is required but this is not shared with 3rd parties and only used for registration and updates regarding Encryptographs.
* **No Tracking:** We do not use cookies and instead keep your session information stored locally. To further strengthen against XSS attacks, this information is always encrypted and deleted as soon as you close your browser tab.
* **Lossless Storage:** Photos are not compressed when uploaded so all the original data is preserved when uploaded and viewed.
* **Google-Free:** We do not use any Google services or assets.

## How to Share an Album

Once you've created an album and are ready share it with another user, click on the share button of that album view to open the Share dialog.

--- Show dialog opening --

Enter the username of the person you would like to send the invite to, select the level of access you would like them to have, and click on Send. There are three levels of access you can choose from:

* **Admin:** Users with this level of access will be able to share the album with other users, delete the album, and add/delete images
* **View and Add/Delete:** Users with this level of access will be able to delete the album and add/delete images
* **View Only:** Users with this level of access will only be ablve to view images


If the username exists, you will see a message stating that the invite was successfully sent.

--- Show successfully sent snackbar

## How to Accept a Share Invite



--- Show gif of clicking on the envelope icon and going to the invite view

Click on the envelope icon to view your invites and then click on the profile image to view the public key of the user who sent the invite. Compare this with the public key of the user in-person, over a secure messenger app like [Signal](https://www.signal.org/), through encrypted email such as [ProtonMail](https://www.protonmail.com), etc. Once you've verified the public key, click on Accept to accept the invite. Once you navigate back to your albums you will then see the shared album.

## Technologies

* Front-End
	* React, React Hooks, Material UI, HTML & CSS
* Back-End
	* Node.js, Etebase
* Libraries
	* Cryptico, Base64.js, React Image Gallery

## Future Roadmap

* Better integration with mobile devices
* Email notification of invites
* Shared user management - Be able to view all users an album is shared with and remove users
* Shared album management - Be able to leave a shared album
* Increased performance/speed of rendering large albums
