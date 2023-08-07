# To Do List Changelog
All notable changes to this project will be documented in this file. Dates are displayed in UTC +8.


### v1.4.2
> August 7, 2023
- Fixed deleting the last list do not update elements.

### v1.4.1
> June 9, 2023
- Fixed darkmode switch button not working properly.

### v1.4.0
> April 10, 2023
- Separated the script files to organize and reduce line of codes.
- Page now auto update content, instead of force reload the page.
- Added more screen sizes support for better user experience.
- Fixed bugs on button including on mobile view.
- Removed button being disabled when client opens a menu.
- Added feature where clicking outside of menu closes the menu.
- Added closing animation to all menu.
- Menus now look different on mobile view to support small screen height.
- Fixed logo not resizing on small screen size.
- Fixed last update date not showing the exact result on about menu.
- Fixed autofocus on input element not working sometimes.
- The last list will automatically be selected when deleting a list.
- Added delete message menu/confirmation dialogue when deleting a list or task.
- Selecting a list while on mobile view will now automatically navigate you to task section.
- Updated the logo color to the new default accent color. `assets/svg/favicon.svg`.
- Tab title now show the current selected list.
- Fixed error and issues, optimized codes.

### v1.3.0
> March 17, 2023
- Added the ability to delete a todo group.
- Added the ability to rename a todo group.
- Changed the default theme and accent to `Light Mode` & `#005366`.
- The new default accent color was came from Bing Chat precise mode that also match most of the default wallpaper color that's why I chose it :).
- Replaced green accent `#177d1f` to dark blue green `#005366`.
- Added a closing animation to account modal form.
- Added media query for mobile view support.
- Added a burger menu when client is on mobile view.
- Fixed line divider being shrink on a flex parent.
- Disabled user select on list button at `list_container`.
- Changed `.list_container` height to `32px`.
- Converted `innerHTML` that used string only into `innerText` to avoid bug exploit.
- Disabled button text user selection.
- Added a menu for todo selected in todo header.
- Change main element width to `896px`.

> The new default accent color was came from Bing Chat precise mode that also match most of the default wallpaper color that's why I chose it :).

### v1.2.0
> February 19, 2023
- Added the ability to rename a task instantly.
- Added the ability to mark a task as completed.
- Added the ability to delete a task.
- Remove empty list icon and changed with text only.
- Changed `add_task_btn`style properties and now separated to task list.
- Changed default font family to `Segoe UI Variable Text`.
- Converted SVG buttons to `Segoe Fluent Icon` icons.
- Changed `New list` button text and modal title to `Add a list`.
- Changed `.list_container` height to `32px`.
- Removed empty data message on to do task list.
- Fixed list container element showing a scrollbar even if the container is not overflowed yet on Firefox.
- Changed the list localStorage value from "" to "`[]`".
- Convert innerHTML that is using `+` string concatenation into `${...}` template literals.
- Now able to display the todo list.
- Fixed todo section makes its child that has 100% height overflow issue.

### v1.1.12
> January 29, 2023
- Improved the name validation on the edit account form. It now supports first names only, the dash character ("-"), automatically removes unwanted whitespace, and automatically capitalizes the first letter of each word.
- Disabled autocomplete on the edit account name input.
- Changed to autofocus list and todo input.
- Changed the "Choose image from internet" button in the settings modal to a mini form.
- Modified some grammar in the about project modal.
- Added a feature where the text color on an accent color element changes based on the luminance of the element.
- Changed the data being saved in localStorage from a number (0 or 1) to a boolean (true or false).
- Added a Github API-based feature that displays the last updated date on the about project modal. It will automatically update the date based on the last commit on my To Do Github repository in a `Month dd, yyyy` format.
- Added a fallback color to the background image blocks in the settings modal in case they fail to load.
- Added an active/disable state effect to buttons.
- Added a response status message on custom image url from settings modal and add list modal.
- Improved add list modal.
- List container now displays the list.
- Added a `todo-selected` localStorage to save the last active selected todo list.

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