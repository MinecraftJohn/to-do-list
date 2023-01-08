# To Do List Changelog
All notable changes to this project will be documented in this file. Dates are displayed in UTC +8.


### v1.1.12
> January DAY, 2023
- Improved the name validation on the edit account form. It now supports first names only, the dash character ("-"), automatically removes unwanted whitespace, and automatically capitalizes the first letter of each word.
- Disabled autocomplete on the edit account name input.
- Changed the "Choose image from internet" button in the settings modal to a mini form.
- Modified some grammar in the about project modal.
- Added a feature where the text color on an accent color element changes based on the luminance of the element.
- Changed the data being saved in localStorage from a number (0 or 1) to a boolean (true or false).
- Added a Github API-based feature that displays the last updated date on the about project modal. It will automatically update the date based on the last commit on my To Do Github repository in a `Month dd, yyyy` format.
- Added a fallback color to the background image blocks in the settings modal in case they fail to load.
- Added an active state effect to buttons.

### v1.1.11
> November 2, 2022
- Modified the font family CSS file assets/css/fonts.css to use a local font instead of loading it from online.
- Added a fonts folder for the local fonts in `assets/fonts`.
- Made some minor modifications to `assets/css/library.css` and `assets/css/styles.css`.

### v1.1.10
> October 27, 2022
- Added a form modal for creating a new to-do list.

### v1.1.9
> October 24, 2022
- Made some minor modifications to the empty indicator in the to-do list section and task section.

### v1.1.8
> October 21, 2022
- Modified some CSS styles in `assets/css/library.css` and `assets/css/styles.css`.
- Added a hint/icon to indicate that the data is empty and nothing to show.

### v1.1.7
> October 20, 2022
- Fixed the issue where the edit account modal was blurred due to the `mix-blend-mode` CSS property.

### v1.1.6
> October 17, 2022
- Added a dedicated font family CSS file `assets/css/fonts.css` and changed the global font to 'Segoe UI'.
- Modified some CSS styles in library.css and styles.css.
- Fixed the time and date in the header section and settings modal not working.
- Changed the default profile picture to an inline SVG code.
- Optimized the code by using an array of data in `assets/js/script.js`.

### v1.1.5
> October 16, 2022
- Added a feature to allow users to choose a background image from the 6 default background images in the settings modal.
- Added a transition effect when the background image in the header section and the background image preview in the settings modal change.
- Added fallback text in the account section.

### v1.1.4
> October 15, 2022
- Added an effect when the buttons are in hover state.
- Added a secondary background color in the background preview section as a fallback if the image fails to load.
- Added a real-time preview of the time and date on the background image preview in the settings modal.
- Added 6 default background images to choose from in the settings modal.
- Dynamically changed the default profile picture colors based on the page theme.
- Added a button to customize the background image using a link.
- Optimized the code by using a reusable function in the accent color section of the settings modal.
- Removed the Save button in the settings modal.
- Added a feature where the settings will automatically change upon any changes made.
- Modified some CSS styles in library.css and styles.css.
- Converted the header section and settings background image preview shorthand background property to longhand properties for better data manipulation.
- Added a fallback placeholder in case the time and date are not working properly in the header section.

### v1.1.3
> October 12, 2022
- Added 6 default accent colors to choose from in the settings modal.
- Added support for customizable accent colors using the browser color picker, which will be saved in `localStorage`.
- The buttons and links now use the accent color.

### v1.1.2
> October 11, 2022
- Added a secondary background color in the header section as a fallback if the image fails to load.
- Added a border to the profile picture to make it visible when users use a transparent picture.
- Modified/adjusted some CSS properties in `assets/css/styles.css`.
- Added support for the 24-hour format.
- Added a dark mode on/off switch button.
- Removed the 6 default accent colors in the settings modal.
- Added a Save button in the settings modal.

### v1.1.1
> October 8, 2022
- Modified some CSS style properties at `assets/css/library.css`.
- Added an accent color CSS style.
- Converted the `function` into an arrow function for all modals.
- The close button on a modal will finally remove a modal section entirely in order to optimize the page using `document.getElementById("element").remove()`.
- Added 6 default accent colors to choose from in the settings modal.
- Added an About Project button to the footer section.
- Added an About Project modal with a dynamic logo that changes based on the page's theme.

### v1.1.0
> October 5, 2022
- Created a reusable style for any type of modal (e.g. form container, input, buttons, etc.).
- Added a default wallpaper in the header section.
- The time and date now update dynamically based on the user's system.
- Added a settings button to the footer section.
- Added a settings section.
- Added basic first name and last name validation `/([A-ZÑ][a-z-ñ.]+)$/` to the Edit Account form.
- Added a customizable profile feature where users can upload their profile picture and save it as a `base64` code in `localStorage`.
- Added a background image preview in the settings modal.

### v1.0.2
> October 3, 2022
- Separated the important CSS properties into a separate file `assets/css/library.css` to improve maintainability and make it easier to reuse these styles in other parts of the project.
- Separated JavaScript codes using comments to make it easier to distinguish.
- Made some minor modifications to the 'Edit Account' modal code base.

### v1.0.1
> October 1, 2022
- Modified edit account button and can now open modal.
- Modified Time and Date style (color & text shadow).
- Added a fade-in up transition when the 'Edit Account' modal is opened.
- Optimized page by using `document.createElement` when the 'Edit Account' modal is opened.

### v1.0.0
> September 30, 2022
- Added the page icon using an SVG file `assets/svg/favicon.svg`.
- Added CSS page attribute darkmode support (e.g. change in font color, background color, etc.).
- Added Time and Date placeholders (e.g. for displaying the current time and date).
- Added an account container with a profile placeholder and a username placeholder.
- Added a container of list of to do list.
- Added to do task section placeholder.