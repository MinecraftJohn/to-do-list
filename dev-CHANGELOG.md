# To Do List Development Changelog
All notable development changes to this project will be documented in this file. Dates are displayed in UTC +8.


### v23.8.7a
> August 7, 2023
- Fixed deleting the last list do not update elements.
- Added `.vscode` folder and `.prettierignore` file.
- Updated `readme.md`.

### v23.6.9a
> June 9, 2023
- Fixed darkmode switch button not working properly.
- Updated `readme.md`.

### v23.4.10a
> April 10, 2023
- Updated the logo color to the new default accent color. `assets/svg/favicon.svg`.
- Tab title now show the current selected list.

### v23.4.9a
> April 9, 2023
- Converted some of the `.getElementsBy` to `querySelector` to improve future maintenance ease.
- Overhaul on-click codes for the menu button on mobile view.
- Selecting a list while on mobile view will now automatically navigate you to task section.
- Fixed task section disapear when the menu button on mobile view is on open list state.

### v23.4.8a
> April 8, 2023
- Added `flex-row` class on `library.css`.
- Fixed an error on compatibility issue. Missing `-webkit-user-select` before `user-select: none;` at `library.css`.
- Fixed an issue on buttons no type attribute declared.
- Added error and secondary button styles with element style state ready.
- Used query selector for close button to reduced code length on menus.
- Added delete message menu/confirmation dialogue when deleting a list or task.
- Turn the main execution of `load-todolist.js` into function, so I can reuse it again on creating a list/task.
- Changed the form error message from inline CSS to an already declared CSS property.
- The last list will automatically be selected when deleting a list.

### v23.4.3a
> April 3, 2023
- Fixed adding a task do not update the list automatically.
- Fixed a bug on renaming a todo name renames the other list instead of the active list.

### v23.3.31a
> March 31, 2023
- Converted some of backticks value from load-todolist into function/variable.
- Choosing and creating a list now auto update instead of reloading the page.
- Adding a task now auto update instead of reloading the page.

### v23.3.29a
> March 29, 2023
- Fixed autofocus on input element not working sometimes.
- Fixed rename todo input cursor starts at beginning instead of at end.
- Removed/Modified some codes that are not used.

### v23.3.27a
> March 27, 2023
- Fixed menu not closing and playing the close animation when client success edit the account.

### v23.3.24b
> March 24, 2023
- Seprated `settings`, `create-list`, `create-task`, and `load-todolist` event to a different JS-file.
- Removed button being disabled when client open the `create-list menu`.
- Fixed disabled button not working on setting menu `change-btn`.
- Fixed last update date not showing the exact result on about menu. 

### v23.3.24a
> March 24, 2023
- Fixed modal and setting body not occupied on it's parent form element.
- Fixed logo not resizing on small screen size.
- Added feature where clicking outside the menu will now close the menu.
- Optimized JS code by separating the about-project to a different file and convert some line of code into one reusable-function.

### v23.3.22a
> March 22, 2023
- Made some small changes to `mobile.css`.

### v23.3.19a
> March 19, 2023
- Added small screen sizes for menus and forms.

### v23.3.18a
> March 18, 2023
- Added small screen height support below `664px`.
- Fixed buttons shrinking on small height screen.
- Added auto update account section without reloading the page.
- Fixed fileReader.replace error.
- Separated account section script to a different file `username.js`.
- Optimized codes and made it reusable.

### v23.3.17a
> March 17, 2023
- Changed the default theme and accent to `Light Mode` & `#005366`.
- Replaced green accent `#177d1f` to dark blue green `#005366`.
- Added padding `64px 0` to `.empty_data_hint`.

### v23.3.13a
> March 13, 2023
- Added a closing animation to account modal form.

### v23.3.12a
> March 12, 2023
- Removed drop shadows on element section when client is on mobile view.
- Disabled user select on list button at `list_container`.
- Changed from scroll to element only to full page when on mobile view.
- Changed `.list_container` height to `32px`.
- Fixed a bug where rename a list do not show the origin name of list in the input element.

### v23.3.10a
> March 10, 2023
- Added media query for mobile view support.
- Added a burger menu when client is on mobile view.
- Fixed line divider being shrink on a flex parent.

### v23.3.9a
> March 9, 2023
- Added the ability to rename a todo group.

### v23.3.3a
> March 3, 2023
- Converted `innerHTML` that used string only into `innerText` to avoid bug exploit.
- Added the ability to delete a todo group.
- Disabled button text user selection.
- Added styles to todo menu in todo header.
- Todo menu now open and close when click outside the menu.

### v23.2.24a
> February 24, 2023
- Change main element width to `896px`.
- Added a menu for todo selected in todo header.

### v23.2.19a
> February 19, 2023
- Removed transition animation on task delete button.
- Added the ability to rename a task instantly.
- Added the ability to mark a task as completed.
- Added the ability to delete a task.

### v23.2.17a
> February 17, 2023
- Declaired class name to each element of `todoContainer`.
- Added styles to `todoContainer` list.
- Changed task delete button to show only when the task is being hovered.

### v23.2.10a
> February 10, 2023
- Remove empty list icon and changed with text only.
- Small changes to `add_task_btn`style properties.

### v23.2.9a
> February 9, 2023
- Changed default font family to `Segoe UI Variable Text`.
- Small changes to `add_task_btn`style properties.
- Changed the class name `svg_btns` to `icon_btns`.
- Converted SVG buttons to `Segoe Fluent Icon` icons.
- Changed `New list` button text and modal title to `Add a list`.

### v23.2.8a
> February 8, 2023
- Changed `.list_container` height to `32px`.
- Removed empty data on to do task list.
- Added an `Add a task` button on `todo_section`.

### v23.2.3a
> February 3, 2023
- Fixed list container element showing a scroll even if the container is not overflowed yet on Firefox.
- Renamed the `createTodo()` function into `createList()`.
- Changed the list localStorage value from "" to "`[]`".
- Convert innerHTML or other that is using `+` string concatenation into `${...}` template literals.
- Partially added todo list, now able to display the todos.

### v23.2.2a
> February 2, 2023
- Added an autofocus in new list modal input.
- Changed input notice message when it didn't meet the requirement.
- Fixed todo section makes its child that has 100% height overflow.