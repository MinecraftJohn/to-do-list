# To Do List Development Changelog
All notable development changes to this project will be documented in this file. Dates are displayed in UTC +8.


### v23.2.2a
> February 2, 2023
- Added an autofocus in new list modal input.
- Changed input notice message when it didn't meet the requirement.
- Fixed todo section makes its child that has 100% height overflow.

### v23.2.3a
> February 3, 2023
- Fixed list container element showing a scroll even if the container is not overflowed yet on Firefox.
- Renamed the `createTodo()` function into `createList()`.
- Changed the list localStorage value from "" to "`[]`".
- Convert innerHTML or other that is using `+` string concatenation into `${...}` template literals.
- Partially added todo list, now able to display the todos.