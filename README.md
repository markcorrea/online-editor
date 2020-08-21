# Online Editor

The online version can be seen here: https://onlineeditor.netlify.app

<em>If you are from `Veezo` and have intentions to evaluate this test, check the bugs I found! You can find them at the very end, in the `Notes from the dev` section.</em>

Online Editor is a test designed to see the qualifications of a candidate for a React Front End Engineer at Veezo. It is a code editor which should allow the user to list the available files in a tree format, load the contents of a chosen file, edit its content and save it. Also, the user should be able to delete a file. Below you can see specific details about installation, requirements, and features.

## 📦 Installation

- In order to run this project, you need NodeJS version 12 or higher. I used `v12.13.0`.
- Clone the project to your machine (link above).
- Open Terminal and `cd` to the root of the project.
- Run `npm ci` (yes, `ci`. Not `npm install`).
- Once `npm ci` finishes, run `npm start`.

## 🚀 How to use

As soon as the page is loaded (or you click the link above), the main page will show you a menu on the left side and an empty screen on the right side. The menu will take a second and then load the Tree of folders and files. You can expand the folders and, when clicking a file, it will be loaded on the empty screen inside an editor.

<img alt='initial' src='https://github.com/markcorrea/online-editor/blob/master/readme/initial.png' />

### 📄 Editing files

At the moment, once we have only files in `Java`, the editor only edits this type of file. That can be easily improved in the future. In the header, an option will be displayed to `Delete` the current file. Once you change the file, two more options will be displayed in the header: `Discard Changes`, and `Save`. Have in mind that, before you open another file, you have to save or discard the changes you made in the current one.

<img alt='code' src='https://github.com/markcorrea/online-editor/blob/master/readme/code.png' />

### :last_quarter_moon: Dark Mode

For your eyes health, `Online Editor` allows you to switch between `Dark` and `Light` themes. Above the `Files` tree in the Side Menu, there is a switch where you can switch anytime.

<img alt='light' src='https://github.com/markcorrea/online-editor/blob/master/readme/light.png' />

### :iphone: Mobile

Nonetheless, you can use the `Online Editor` on a mobile device. It is totally responsive, and even in your cellphone it is possible to work on those files. When you load the app, you will see a `list icon` in the header. Click on it and the `Side Menu` will slide in.

<img alt='mobile' src='https://github.com/markcorrea/online-editor/blob/master/readme/mobile.png' />

### :left_right_arrow: Resizable menu

Suppose your menus are deep, with files inside folders inside more folders, or have those huge names like `calculate_how_many_beers_we_can_drink_in_a_night_at_the_oktoberfest.java`. `Online Editor`'s menu is resizable. You can grab the margin of the menu and resize it as much as you can, turning the names in the tree more visible. Note that this feature is available only on the Desktop version.

<img alt='resizable' src='https://github.com/markcorrea/online-editor/blob/master/readme/resizable.png' />

## :books: Libraries

- React
- React Router
- React Scripts
- Material-UI
- Axios
- Clsx
- Node-sass
- ESLint
- Notistack
- React-Ace

## :coffee: Notes from the dev

We have an issue with the PUT and DELETE endpoints. I imagine they may be intentional, once we have one API for many candidates, but here they are:

- The <strong>PUT</strong> endpoint doesn't really save the current changes in the file. It returns `200 OK`, sends the payload and returns the response, but the actual changes are not there when we re-fetch the file by its <strong>ID</strong>.

- The <strong>DELETE</strong> endpoint also doesn't really delete the register. it returns `200 OK` and returns the response, but when re-fetching the file tree, the deleted files are still there.
