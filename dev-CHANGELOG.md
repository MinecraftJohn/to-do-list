# To Do List Development Changelog
All notable development changes to this project will be documented in this file. Dates are displayed in UTC +8.


### v23.3.9a
> March 8, 2023
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