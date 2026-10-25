window.CM = window.CM || {};

CM.TRACKS = [
  { id: 'html', name: 'HTML', icon: 'bi-filetype-html', color: '#e44d26', group: 'web', desc: 'Structure, forms, accessibility.', qs: [
    { q: 'Which attribute makes this image accessible to screen readers?', code: '<img src="logo.png">', o: ['alt', 'title', 'name', 'id'], a: 0, e: 'The alt attribute gives the image a text description.' },
    { q: 'Which tag creates the largest heading?', o: ['<h6>', '<head>', '<h1>', '<header>'], a: 2, e: '<h1> is the highest heading level.' },
    { q: 'How do you open a link in a new tab?', o: ['target="_blank"', 'new="tab"', 'open="blank"', 'href="_new"'], a: 0, e: 'target="_blank" opens the link in a new tab.' },
    { q: 'Which element is semantically correct for the main navigation links?', o: ['<div>', '<nav>', '<section>', '<span>'], a: 1, e: '<nav> is meant for navigation links.' },
    { q: 'What is wrong with this input?', code: '<input type="emial">', o: ['Missing closing tag', 'Typo: should be "email"', 'Needs a class', 'type is not allowed'], a: 1, e: '"emial" is a typo; the correct value is type="email".' },
    { q: 'Which attribute forces a form field to be filled in?', o: ['needed', 'mandatory', 'required', 'validate'], a: 2, e: 'required is the built-in HTML5 validation attribute.' },
    { q: 'Clicking the label does not focus the input. Why?', code: '<label for="n">Name</label>\n<input name="n">', o: ['Input needs id="n"', 'Label needs name', 'for is deprecated', 'Input needs type=label'], a: 0, e: 'The for attribute must match the input\'s id, not its name.' }
  ]},
  { id: 'css', name: 'CSS', icon: 'bi-filetype-css', color: '#2965f1', group: 'web', desc: 'Selectors, layout, responsive design.', qs: [
    { q: 'Why does the text stay black?', code: '.box { colour: red; }', o: ['Wrong selector', 'Property should be "color"', 'red is invalid', 'Missing !important'], a: 1, e: 'The correct property is color (American spelling).' },
    { q: 'Which centers a fixed-width block horizontally?', o: ['text-align: center', 'margin: 0 auto', 'float: center', 'align: middle'], a: 1, e: 'margin: 0 auto centers a block that has a width.' },
    { q: 'With display:flex, justify-content aligns items along the…', o: ['cross axis', 'z-axis', 'main axis', 'baseline only'], a: 2, e: 'justify-content works on the main axis; align-items works on the cross axis.' },
    { q: 'Which selector wins?', code: '#title { color: blue; }\n.title { color: red; }', o: ['.title', '#title', 'Whichever is last always', 'Neither'], a: 1, e: 'An ID selector has higher specificity than a class selector.' },
    { q: 'position:absolute is positioned relative to…', o: ['the viewport always', 'its nearest positioned ancestor', 'its previous sibling', 'the body only'], a: 1, e: 'It is positioned relative to the nearest ancestor whose position is not static.' },
    { q: 'What does box-sizing: border-box do?', o: ['Removes borders', 'Includes padding and border in width', 'Adds margin to width', 'Makes box square'], a: 1, e: 'Padding and border are included in the total width and height.' },
    { q: 'Which media query targets screens up to 600px wide?', o: ['@media (min-width: 600px)', '@media (max-width: 600px)', '@media screen = 600', '@responsive 600px'], a: 1, e: 'max-width: 600px matches screens 600px wide and below.' }
  ]},
  { id: 'js', name: 'JavaScript', icon: 'bi-filetype-js', color: '#f7b500', group: 'web', desc: 'Logic, types, debugging.', qs: [
    { q: 'What does this print?', code: 'console.log(typeof null);', o: ['"null"', '"undefined"', '"object"', '"number"'], a: 2, e: 'A well-known JavaScript quirk: typeof null is "object".' },
    { q: 'What does this print?', code: 'console.log("5" + 3);', o: ['8', '"53"', 'NaN', 'Error'], a: 1, e: 'Using + with a string does concatenation: "53".' },
    { q: 'What does this return?', code: '[1, 2, 3].map(x => x * 2)', o: ['[1,2,3]', '6', '[2,4,6]', '[2,4]'], a: 2, e: 'map returns a new array with each value transformed.' },
    { q: 'What is logged?', code: 'let a = 1;\n{ let a = 2; }\nconsole.log(a);', o: ['1', '2', 'undefined', 'Error'], a: 0, e: 'let is block-scoped, so the outer a is unchanged.' },
    { q: 'What does this evaluate to?', code: '0.1 + 0.2 === 0.3', o: ['true', 'false', 'NaN', 'Error'], a: 1, e: 'Floating-point precision: the sum is 0.30000000000000004.' },
    { q: 'What is the bug?', code: 'if (x = 5) { ... }', o: ['Missing else', 'Assignment used instead of comparison', 'x must be const', 'Missing semicolon'], a: 1, e: 'It should be == or ===; a single = is assignment.' },
    { q: 'What does this print?', code: 'console.log("5" - 2);', o: ['"52"', '3', 'NaN', '7'], a: 1, e: 'The - operator converts the string to a number: 3.' }
  ]},
  { id: 'php', name: 'PHP', icon: 'bi-filetype-php', color: '#777bb4', group: 'backend', desc: 'Server-side scripting and security.', qs: [
    { q: 'Which symbol starts every PHP variable?', o: ['@', '$', '&', '#'], a: 1, e: 'Every PHP variable starts with $.' },
    { q: 'What does the dot do?', code: 'echo "Hi " . $name;', o: ['Adds numbers', 'Concatenates strings', 'Accesses property', 'Ends statement'], a: 1, e: 'The dot is PHP\'s concatenation operator.' },
    { q: 'What happens here?', code: '$a = [1, 2, 3];\necho $a[3];', o: ['Prints 3', 'Prints 1', 'Warning: undefined array key', 'Prints 0'], a: 2, e: 'Only indexes 0 to 2 exist; index 3 is undefined.' },
    { q: 'How do you read a form field sent by POST?', o: ['$_GET["x"]', '$_POST["x"]', '$_FORM["x"]', 'post("x")'], a: 1, e: 'The $_POST superglobal holds POST data.' },
    { q: 'Best defense against SQL injection?', o: ['Prepared statements', 'Using echo', 'Hiding the form', 'Longer variable names'], a: 0, e: 'Prepared statements (PDO/mysqli) keep code and data separate.' },
    { q: 'Which function starts a session?', o: ['start_session()', 'session_begin()', 'session_start()', 'new_session()'], a: 2, e: 'session_start() is the correct function.' },
    { q: 'In PHP 8, what does this output?', code: 'var_dump("abc" == 0);', o: ['bool(true)', 'bool(false)', 'int(0)', 'Error'], a: 1, e: 'In PHP 8, "abc" == 0 is no longer true.' }
  ]},
  { id: 'sql', name: 'SQL', icon: 'bi-database-fill', color: '#00758f', group: 'backend', desc: 'Queries, joins, and data safety.', qs: [
    { q: 'Which query returns all rows of table users?', o: ['GET * users', 'SELECT * FROM users', 'SHOW users', 'FETCH users ALL'], a: 1, e: 'SELECT * FROM table is the standard form.' },
    { q: 'Which clause filters rows?', o: ['WHERE', 'FILTER', 'ORDER BY', 'LIMIT'], a: 0, e: 'WHERE filters rows before grouping.' },
    { q: 'What is wrong with this query?', code: 'SELECT name FROM users\nWHERE age > 18\nORDER age;', o: ['Missing BY after ORDER', 'WHERE is wrong', 'Needs GROUP', 'Nothing'], a: 0, e: 'The correct syntax is ORDER BY age.' },
    { q: 'What does COUNT(*) return?', o: ['Sum of columns', 'Number of rows', 'Highest value', 'Column names'], a: 1, e: 'It counts the rows.' },
    { q: 'INNER JOIN returns…', o: ['All rows from left only', 'Rows with matches in both tables', 'All rows from both', 'Only unmatched rows'], a: 1, e: 'It returns only the rows that match in both tables.' },
    { q: 'What does this do?', code: 'DELETE FROM users;', o: ['Deletes nothing', 'Deletes the table structure', 'Deletes ALL rows', 'Deletes first row'], a: 2, e: 'There is no WHERE, so every row is deleted.' },
    { q: 'Which clause filters groups after GROUP BY?', o: ['WHERE', 'HAVING', 'FILTER', 'WHEN'], a: 1, e: 'HAVING filters aggregate/group results.' }
  ]},
  { id: 'react', name: 'React', icon: 'bi-filetype-jsx', color: '#00b7d6', group: 'web', desc: 'Components, state, hooks.', qs: [
    { q: 'Which hook adds state to a function component?', o: ['useState', 'useRender', 'useData', 'useVar'], a: 0, e: 'useState provides a state variable and its setter.' },
    { q: 'What is the bug?', code: '<button onClick={handle()}>Go</button>', o: ['Missing quotes', 'handle runs immediately; use onClick={handle}', 'onClick is invalid', 'Needs class'], a: 1, e: 'handle() is called during render. Pass the function reference instead.' },
    { q: 'What do list items rendered with map() need?', o: ['A unique key', 'An id attribute only', 'A class', 'Nothing'], a: 0, e: 'The key helps React track each list item.' },
    { q: 'When does this effect run?', code: 'useEffect(() => { ... }, []);', o: ['Every render', 'Once after first render', 'Never', 'Before render'], a: 1, e: 'An empty dependency array means it runs once after the first render.' },
    { q: 'Which JSX attribute sets a CSS class?', o: ['class', 'cssClass', 'className', 'style-class'], a: 2, e: 'className is used because class is a reserved word in JavaScript.' },
    { q: 'Props in a component are…', o: ['Mutable by the child', 'Read-only', 'Always global', 'Stored in DOM'], a: 1, e: 'Props are read-only; state is what you change.' },
    { q: 'Why does the UI not update?', code: 'count++;', o: ['State was mutated directly; use setCount', 'count must be const', 'Missing return', 'Needs useEffect'], a: 0, e: 'Use the setter so React triggers a re-render.' }
  ]},
  { id: 'python', name: 'Python', icon: 'bi-filetype-py', color: '#3776ab', group: 'backend', desc: 'Syntax, data types, errors.', qs: [
    { q: 'What type is the result?', code: 'type(5 / 2)', o: ['int', 'float', 'str', 'double'], a: 1, e: 'In Python 3, / always returns a float (2.5).' },
    { q: 'What does this print?', code: 'print(7 // 2)', o: ['3.5', '4', '3', '2'], a: 2, e: '// is floor division: 3.' },
    { q: 'What error occurs?', code: 'def hi():\nprint("hi")', o: ['NameError', 'IndentationError', 'TypeError', 'No error'], a: 1, e: 'The body of a function must be indented.' },
    { q: 'What does this print?', code: 'print("abc"[::-1])', o: ['abc', 'cba', 'bca', 'Error'], a: 1, e: '[::-1] reverses a sequence.' },
    { q: 'What does this print?', code: 'print(2 ** 3)', o: ['6', '5', '8', '9'], a: 2, e: '** is the exponent operator: 2 to the power of 3 is 8.' },
    { q: 'What error is raised?', code: 'd = {"a": 1}\nd["b"]', o: ['IndexError', 'KeyError', 'ValueError', 'None'], a: 1, e: 'There is no key "b", so a KeyError is raised.' },
    { q: 'What is printed?', code: 'x = [1, 2, 3]\nx.append(4)\nprint(x)', o: ['[1, 2, 3]', '[4]', '[1, 2, 3, 4]', 'Error'], a: 2, e: 'append adds the item to the end of the list.' }
  ]},
  { id: 'java', name: 'Java', icon: 'bi-cup-hot-fill', color: '#f89820', group: 'backend', desc: 'OOP, types, and exceptions.', qs: [
    { q: 'Which is the correct entry point?', o: ['public static void main(String[] args)', 'void start()', 'public void main()', 'static int run()'], a: 0, e: 'This is the signature the JVM looks for.' },
    { q: 'What is the problem?', code: 'int x = "5";', o: ['Missing new', 'Incompatible types: String to int', 'x must be final', 'No problem'], a: 1, e: 'A String cannot be assigned to an int.' },
    { q: 'How should two Strings be compared for equal content?', o: ['s1 == s2', 's1.equals(s2)', 's1 = s2', 's1.same(s2)'], a: 1, e: '== compares references; equals() compares content.' },
    { q: 'What happens?', code: 'int[] a = new int[3];\na[3] = 1;', o: ['Sets a[3]', 'ArrayIndexOutOfBoundsException', 'Compiles with warning', 'Resizes array'], a: 1, e: 'Only indexes 0 to 2 are valid.' },
    { q: 'What is the value?', code: 'int r = 5 / 2;', o: ['2.5', '3', '2', '2.0'], a: 2, e: 'Integer division drops the decimal part: 2.' },
    { q: 'Which keyword creates inheritance?', o: ['inherits', 'extends', 'implements only', 'super'], a: 1, e: 'extends is used for class inheritance.' },
    { q: 'What does every statement end with?', o: [':', ';', '.', 'nothing'], a: 1, e: 'A semicolon ends a statement in Java.' }
  ]},
  { id: 'flutter', name: 'Flutter', icon: 'bi-phone-fill', color: '#02569b', group: 'app', desc: 'Dart widgets for mobile apps.', qs: [
    { q: 'Which language does Flutter use?', o: ['Kotlin', 'Dart', 'Swift', 'Java'], a: 1, e: 'Dart is Flutter\'s programming language.' },
    { q: 'Which widget type can change with setState?', o: ['StatelessWidget', 'StatefulWidget', 'InheritedOnly', 'ConstWidget'], a: 1, e: 'A StatefulWidget holds mutable state.' },
    { q: 'In Flutter, almost everything is a…', o: ['Component tag', 'Widget', 'Activity', 'Fragment'], a: 1, e: 'The widget tree is the structure of the UI.' },
    { q: 'Which widget lays children out vertically?', o: ['Row', 'Stack', 'Column', 'Wrap only'], a: 2, e: 'Column is vertical; Row is horizontal.' },
    { q: 'Why does the screen not refresh?', code: 'onPressed: () { count++; }', o: ['Missing setState', 'count is final', 'Wrong widget', 'Needs async'], a: 0, e: 'You need setState(() { count++; }) to trigger a rebuild.' },
    { q: 'Which file declares dependencies?', o: ['package.json', 'pubspec.yaml', 'build.gradle only', 'main.dart'], a: 1, e: 'pubspec.yaml is the project\'s configuration file.' },
    { q: 'Which function starts a Flutter app?', o: ['startApp()', 'runApp()', 'main()', 'launch()'], a: 1, e: 'runApp() inflates the root widget.' }
  ]}
];

CM.BADGES = [
  { id: 'first', icon: 'bi-flag-fill', name: 'First Pass', desc: 'Pass your first track', test: function (s) { return CM.passedCount(s) >= 1; } },
  { id: 'three', icon: 'bi-trophy-fill', name: 'Triple Threat', desc: 'Pass 3 tracks', test: function (s) { return CM.passedCount(s) >= 3; } },
  { id: 'six', icon: 'bi-rocket-fill', name: 'Full Stack Rising', desc: 'Pass 6 tracks', test: function (s) { return CM.passedCount(s) >= 6; } },
  { id: 'all', icon: 'bi-award-fill', name: 'CODEMIND Master', desc: 'Finish all 9 tracks and 4 systems', test: function (s) { return CM.passedCount(s) >= CM.ALL.length; } },
  { id: 'perfect', icon: 'bi-bullseye', name: 'Perfect Round', desc: 'Score 5/5 in one round', test: function (s) { return s.perfect > 0; } },
  { id: 'xp500', icon: 'bi-lightning-charge-fill', name: 'XP 500', desc: 'Reach 500 XP', test: function (s) { return s.xp >= 500; } },
  { id: 'streak3', icon: 'bi-fire', name: '3-Day Streak', desc: 'Practice 3 days in a row', test: function (s) { return s.streak >= 3; } }
];

CM.SYSTEMS = [
  { id: 'sys-login', name: 'Login System', level: 'Web Dev', icon: 'bi-box-arrow-in-right', color: '#00c2a8', group: 'system', desc: 'Form, validation, session.', qs: [
    { q: 'Find the bug in this password field.', code: '<input id="pw" type="text">', o: ['type should be "password"', 'Needs a class', 'id is invalid', 'Needs action'], a: 0, h: 'Look at what the screen shows while typing.', e: 'type="password" masks the characters so nobody can read them over your shoulder.' },
    { q: 'The page reloads and the data is lost on submit. Fix?', code: 'form.addEventListener("submit", () => { check(); });', o: ['Call e.preventDefault() in the handler', 'form.stop()', 'Remove the form', 'Use CSS'], a: 0, h: 'The browser has a default action for submit events.', e: 'The handler receives the event (e). e.preventDefault() cancels the default full-page submit so JavaScript can validate first.' },
    { q: 'Biggest problem?', code: 'if (user.password == input) login();', o: ['Plain-text password; store a salted hash (bcrypt/argon2)', '== must be ===', 'Wrong function name', 'No semicolon'], a: 0, h: 'Should the app ever know the real password?', e: 'Store only a salted hash and compare hashes on the server. A database leak then does not expose real passwords.' },
    { q: 'Why is this weak authentication?', code: 'localStorage.setItem("loggedIn", "true");', o: ['Users can edit it in DevTools', 'localStorage is too small', 'It deletes itself', 'Needs JSON'], a: 0, h: 'Who controls the browser storage?', e: 'Anything in the browser can be changed by the user. The server must issue and verify a session or token.' },
    { q: 'Is this client-side check enough?', code: 'const ok = /^\\S+@\\S+$/.test(email);', o: ['No, the server must validate too', 'Yes', 'Only for emails', 'Only in React'], a: 0, h: 'Can an attacker skip your JavaScript?', e: 'Attackers can send requests directly. Client validation is for user experience; server validation is for security.' }
  ]},
  { id: 'sys-api', name: 'REST API + Database', level: 'Full Stack', icon: 'bi-hdd-network-fill', color: '#ff6d3a', group: 'system', desc: 'Endpoints, SQL, status codes.', qs: [
    { q: 'What vulnerability is this?', code: 'db.query("SELECT * FROM users WHERE id=" + req.query.id)', o: ['SQL injection', 'XSS', 'Memory leak', 'None'], a: 0, h: 'What if id is "1 OR 1=1"?', e: 'User input is glued into SQL. Use parameters: db.query("SELECT * FROM users WHERE id = ?", [id]) so input stays data, not code.' },
    { q: 'Which status code fits a successful POST that created a resource?', o: ['200', '201', '204', '301'], a: 1, h: 'The code starts with 2 and means "Created".', e: '201 Created tells the client a new resource exists (usually with a Location header).' },
    { q: 'What is the problem?', code: 'res.json(user); // user has password_hash', o: ['Leaks password_hash to the client', 'json is deprecated', 'Needs res.send', 'Nothing'], a: 0, h: 'Check which fields leave the server.', e: 'Return only needed fields (id, name, email). Never expose hashes.' },
    { q: 'The server returns 500. What happens here?', code: 'fetch("/api/todos").then(r => r.json())', o: ['fetch still resolves; check r.ok first', 'fetch always throws', 'json() fixes it', 'Nothing runs'], a: 0, h: 'fetch only rejects on network failure.', e: 'HTTP errors do not reject. Use if (!r.ok) throw new Error(r.status) before r.json().' },
    { q: 'This query is slow on 1M rows. Best fix?', code: 'SELECT * FROM orders WHERE user_id = 5;', o: ['Add an index on user_id', 'Add DISTINCT', 'Add LIMIT 0', 'Rename the table'], a: 0, h: 'How does a book find a topic quickly?', e: 'An index lets the database jump to matching rows instead of scanning the whole table.' }
  ]},
  { id: 'sys-scale', name: 'Scalable Backend', level: 'Senior Dev', icon: 'bi-diagram-3-fill', color: '#b388ff', group: 'system', desc: 'Performance, concurrency, security.', qs: [
    { q: 'What is the performance issue?', code: 'for (const u of users) { u.posts = await db.posts(u.id); }', o: ['N+1 queries; batch with WHERE user_id IN (...)', 'await is banned', 'for-of is slow', 'Nothing'], a: 0, h: 'Count the database round trips for 1000 users.', e: 'One query per user is N+1. Fetch all posts in one query and group them in memory, or use a JOIN.' },
    { q: 'Two requests run at once. What is the bug?', code: 'bal = read(); bal -= 100; write(bal);', o: ['Race condition; use an atomic update in a transaction', 'Needs const', 'Use floats', 'None'], a: 0, h: 'What if both read before either writes?', e: 'Both read the same balance, so one update is lost. Use UPDATE ... SET balance = balance - 100 WHERE balance >= 100 inside a transaction.' },
    { q: 'A 24h cache serves profile data that users edit often. Best approach?', o: ['Invalidate/update the cache on write, keep a TTL as safety net', 'Never cache', 'Raise TTL to 7 days', 'Clear the browser'], a: 0, h: 'Stale data is the risk.', e: 'Invalidating on write keeps data fresh; the TTL protects against missed invalidations.' },
    { q: 'Retrying a failed payment may charge twice. Fix?', o: ['Idempotency key', 'Retry faster', 'Remove logging', 'Switch to GET'], a: 0, h: 'The server must recognize the same request again.', e: 'The client sends a unique key; the server stores the first result and returns it for repeats instead of charging again.' },
    { q: 'Why pass the algorithms option?', code: 'jwt.verify(token, secret, { algorithms: ["HS256"] })', o: ['Stops algorithm-confusion attacks (e.g. "none")', 'Makes it faster', 'Hides the secret', 'Required for JSON'], a: 0, h: 'Never let the token choose how it is verified.', e: 'Pinning the algorithm means an attacker cannot swap it to "none" or another algorithm to forge tokens.' }
  ]}
];
CM.ALL = CM.TRACKS.concat(CM.SYSTEMS);
CM.size = function (t) { return Math.min(50, t.qs.length); };

(function () {
  var F = {
html: `Which tag defines a hyperlink?|<a>|The anchor tag with an href attribute creates a link.
Which tag inserts an image?|<img>|<img> embeds a picture using its src attribute.
Which tag creates a bulleted list?|<ul>|<ul> holds <li> items shown with bullets.
Which tag creates a numbered list?|<ol>|<ol> numbers its <li> items automatically.
Which tag defines a table row?|<tr>|<tr> groups the cells of one row.
Which tag defines a table header cell?|<th>|<th> marks a header cell, bold and centered by default.
Which tag inserts a line break?|<br>|<br> is a void element: it has no closing tag.
Which tag sets the title shown in the browser tab?|<title>|<title> lives inside <head>.
Which tag links an external CSS file?|<link>|<link rel="stylesheet" href="style.css"> goes in the head.
Which tag embeds or loads JavaScript?|<script>|<script> holds code or loads a .js file.
Which tag creates a form?|<form>|<form> groups inputs and sends them on submit.
Which tag is a multi-line text box?|<textarea>|<textarea> accepts several lines of text.
Which tag creates a dropdown list?|<select>|<select> with <option> children makes a dropdown.
Which tag is the semantic page footer?|<footer>|<footer> marks the footer of a page or section.
Which declaration starts every HTML5 page?|<!DOCTYPE html>|It puts the browser in standards mode.
Which attribute shows faded hint text in an empty input?|placeholder|placeholder disappears when the user types.
Which tag makes a clickable button?|<button>|<button> triggers an action on click.
Which tag marks emphasized text semantically?|<em>|<em> means stress; browsers show it in italics.
Which tag marks very important text semantically?|<strong>|<strong> means strong importance; shown bold.
Which meta name makes a page scale on phones?|viewport|content="width=device-width, initial-scale=1" fits the layout to the device.`,
css: `Which property changes text color?|color|color sets the foreground (text) color.
Which property sets the background color?|background-color|It fills the element background.
Which property changes text size?|font-size|font-size sets the size of the text.
Which property adds space INSIDE an element, between content and border?|padding|Padding pushes the content away from the border.
Which property adds space OUTSIDE an element?|margin|Margin separates the element from its neighbors.
Which property rounds corners?|border-radius|A larger value gives rounder corners; 50% makes a circle.
Which property controls stacking order?|z-index|A higher z-index appears on top (on positioned elements).
Which declaration makes a flex container?|display: flex|Children become flex items laid out along the main axis.
Which declaration hides an element AND removes its space?|display: none|The element is removed from the layout.
Which declaration hides an element but KEEPS its space?|visibility: hidden|The space stays reserved.
Which property makes text bold?|font-weight|Values such as 400 or 700 control thickness.
Which property sets spacing between lines of text?|line-height|It controls the height of each line.
Which property adds a shadow to a box?|box-shadow|Takes offsets, blur and a color.
Which property animates changes between states smoothly?|transition|It interpolates property changes over time.
Which at-rule defines a keyframe animation?|@keyframes|It describes steps that animation-name plays.
Which declaration makes a grid container?|display: grid|It enables rows and columns layout.
Which unit is relative to the root font size?|rem|1rem equals the html element font size.
Which pseudo-class styles an element under the mouse?|:hover|It applies while the pointer is over the element.
Which property controls content that overflows its box?|overflow|Values: visible, hidden, scroll, auto.
Which declaration pins an element to the viewport?|position: fixed|It stays in place while scrolling.`,
js: `Which method adds an item to the END of an array?|push()|push appends and returns the new length.
Which method removes the LAST item of an array?|pop()|pop removes and returns the last item.
Which method joins array items into a string?|join()|[1,2].join("-") gives "1-2".
Which method keeps only items that pass a test?|filter()|filter returns a new array of matching items.
Which method reduces an array to a single value?|reduce()|It combines items with an accumulator function.
Which keyword declares a variable that cannot be reassigned?|const|const blocks reassignment of the binding.
Which operator compares value AND type?|===|Strict equality does no type conversion.
Which function converts a JSON string into an object?|JSON.parse()|It reads JSON text into a JS value.
Which function converts an object into a JSON string?|JSON.stringify()|It serializes a value to JSON text.
Which method selects an element by its id?|document.getElementById()|It returns the element or null.
Which method attaches an event handler?|addEventListener()|It registers a function for an event such as click.
Which function runs code ONCE after a delay?|setTimeout()|The delay is in milliseconds.
Which function runs code REPEATEDLY on an interval?|setInterval()|Stop it with clearInterval.
Which keyword waits for a Promise inside an async function?|await|It pauses that function until the Promise settles.
Which method returns the FIRST item that passes a test?|find()|It returns undefined if nothing matches.
Which function converts a string to an integer?|parseInt()|parseInt("42px") gives 42.
Which property gives the number of characters in a string?|.length|"abc".length is 3.
Which method makes a string uppercase?|toUpperCase()|"hi".toUpperCase() is "HI".
Which statement handles runtime errors?|try...catch|Code in try that throws jumps to catch.
Which syntax copies items of an array into another array?|... (spread)|[...a, 4] copies a and adds 4.`,
php: `Which language construct outputs text?|echo|echo prints one or more strings.
Which function counts array elements?|count()|count([1,2,3]) is 3.
Which function returns string length?|strlen()|strlen("abc") is 3.
Which superglobal reads URL query parameters?|$_GET|$_GET holds values from the URL.
Which superglobal stores data between page loads for one user?|$_SESSION|It needs session_start() first.
Which function hashes a password securely?|password_hash()|It adds a salt and uses a strong algorithm.
Which function checks a password against a hash?|password_verify()|It compares the plain password with the stored hash.
Which statement includes a file and stops if it is missing?|require|include only warns; require is fatal.
Which function escapes HTML to help prevent XSS?|htmlspecialchars()|It turns < and > into harmless entities.
Which function prints a variable type and value?|var_dump()|Great for debugging.
Which function converts an array to JSON?|json_encode()|json_decode does the reverse.
Which function checks a variable exists and is not null?|isset()|It returns true only if the variable is set.
Which function sends a raw HTTP header such as a redirect?|header()|header("Location: page.php") redirects.
Which operator returns the left value unless it is null?|??|The null coalescing operator gives a default.
Which function splits a string into an array?|explode()|explode(",", "a,b") gives ["a","b"].
Which function joins array items into a string?|implode()|implode("-", [1,2]) gives "1-2".
Which tag opens PHP code?|<?php|The server runs code after this tag.
Which keyword defines a class?|class|class Name { } creates a blueprint for objects.`,
sql: `Which statement adds new rows?|INSERT INTO|INSERT INTO table (cols) VALUES (...).
Which statement changes existing rows?|UPDATE|Always add WHERE or every row changes.
Which clause sorts results?|ORDER BY|ASC is ascending, DESC is descending.
Which clause groups rows for aggregates?|GROUP BY|It makes one result row per group.
Which function averages values?|AVG()|AVG(price) returns the mean.
Which function finds the largest value?|MAX()|MAX(score) returns the highest.
Which keyword removes duplicate results?|DISTINCT|SELECT DISTINCT city returns each city once.
Which keyword limits rows returned in MySQL?|LIMIT|LIMIT 5 returns at most 5 rows.
Which constraint uniquely identifies each row?|PRIMARY KEY|It is unique and never NULL.
Which constraint links to another table key?|FOREIGN KEY|It enforces valid references between tables.
Which JOIN keeps ALL rows from the left table?|LEFT JOIN|Unmatched right side values become NULL.
Which operator matches a text pattern?|LIKE|WHERE name LIKE 'A%' finds names starting with A.
Which condition tests for NULL?|IS NULL|= NULL never works; use IS NULL.
Which statement creates a table?|CREATE TABLE|It defines columns and types.
Which statement removes a whole table?|DROP TABLE|It deletes structure and data.
Which function adds numbers in a column?|SUM()|SUM(amount) totals the column.
Which operator tests a value against a list?|IN|WHERE id IN (1,2,3).
Which keyword merges two SELECT results without duplicates?|UNION|UNION ALL keeps duplicates.`,
react: `Which hook runs side effects such as fetching data?|useEffect|It runs after render, controlled by its dependency array.
Which hook shares data without prop drilling?|useContext|It reads the nearest Context value.
Which hook keeps a value without causing re-renders?|useRef|Changing ref.current does not re-render.
Which hook caches an expensive calculation?|useMemo|It recomputes only when dependencies change.
Which hook caches a function between renders?|useCallback|It keeps the same function reference.
What is the HTML-like syntax inside React code called?|JSX|JSX compiles to React.createElement calls.
How must a component name start?|a capital letter|Lowercase names are treated as HTML tags.
Which JSX attribute handles input changes?|onChange|It fires when the input value changes.
What groups siblings without adding a DOM node?|Fragment <></>|A Fragment returns many elements without a wrapper div.
What passes data from parent to child?|props|Props are read-only inputs.
Which hook manages complex state with a reducer?|useReducer|dispatch(action) updates state through a reducer function.
Which method renders the app in React 18?|createRoot().render()|It replaces ReactDOM.render.
What is React in-memory copy of the UI called?|Virtual DOM|React diffs it to update only what changed.
Which special prop must be unique among siblings in a list?|key|It helps React match items between renders.
Which tool quickly scaffolds a modern React app?|Vite|npm create vite@latest starts a project.`,
python: `Which function prints output?|print()|print("hi") shows text.
Which function returns the length of a sequence?|len()|len([1,2,3]) is 3.
Which keyword defines a function?|def|def name(): starts a function.
Which keyword imports a module?|import|import math loads the math module.
Which type is an ordered, immutable collection written with ()?|tuple|Tuples cannot be changed after creation.
Which type stores only unique items?|set|Duplicates are removed automatically.
Which type stores key-value pairs?|dict|d["a"] looks up the value for key a.
Which function reads user input as text?|input()|It always returns a string.
Which keyword starts a loop over a sequence?|for|for x in items: runs once per item.
Which statement handles exceptions?|try/except|Errors in try jump to except.
Which list method adds an item to the end?|append()|x.append(4) adds 4.
Which function creates a sequence of numbers?|range()|range(3) gives 0, 1, 2.
Which keyword makes a one-line anonymous function?|lambda|lambda x: x*2 doubles x.
Which function converts a value to an integer?|int()|int("7") is 7.
Which symbol starts a comment?|#|Python ignores the rest of the line.
Which function returns a NEW sorted list?|sorted()|The original is unchanged.
Which statement opens a file and closes it automatically?|with open()|The context manager closes the file even on errors.
Which keyword defines a class?|class|class Dog: defines a blueprint.`,
java: `Which keyword creates an object?|new|new Car() allocates a Car.
Which keyword prevents reassignment or inheritance?|final|A final variable cannot change.
Which type stores true or false?|boolean|It has only two values.
Which class reads console input?|Scanner|new Scanner(System.in) reads typed text.
Which collection is a resizable array?|ArrayList|It grows as you add items.
Which keyword makes a class follow an interface?|implements|The class must provide the interface methods.
Which modifier makes a member belong to the class itself?|static|It is shared and needs no object.
Which statement prints a line?|System.out.println()|It prints text and a newline.
Which keyword refers to the current object?|this|this.name is the current object field.
Which block ALWAYS runs after try/catch?|finally|It runs whether or not an error occurred.
Which access modifier is visible everywhere?|public|Any class can use it.
Which type stores decimals with double precision?|double|double holds 64-bit decimals.
Which method returns the length of a String?|length()|"abc".length() is 3.
Which keyword throws an exception?|throw|throw new IllegalArgumentException().
Which keyword exits a loop immediately?|break|Execution continues after the loop.
Which collection stores key-value pairs?|HashMap|map.get(key) returns the value.`,
flutter: `Which widget shows text?|Text|Text("Hello") displays a string.
Which widget adds space around a child?|Padding|It wraps a child with insets.
Which widget lays children out horizontally?|Row|Column is the vertical version.
Which widget scrolls a long list efficiently?|ListView|ListView.builder builds items on demand.
Which widget overlaps children on top of each other?|Stack|Positioned places children inside it.
Which widget gives a basic page structure with app bar and body?|Scaffold|It provides appBar, body and floatingActionButton.
Which widget shows the top title bar?|AppBar|It is used in Scaffold appBar.
Which widget makes a child tappable with a ripple?|InkWell|It reacts to taps with a Material ripple.
Which constructor loads an image from assets?|Image.asset|The asset must be listed in pubspec.yaml.
Which command runs the app?|flutter run|It builds and launches on a device.
Which command downloads dependencies?|flutter pub get|It reads pubspec.yaml.
Which widget creates fixed empty space?|SizedBox|SizedBox(height: 16) adds a gap.
Which method describes the UI of a widget?|build()|It returns the widget tree.
Which widget makes a child fill free space in Row or Column?|Expanded|It shares the remaining space.
Which class moves between screens?|Navigator|Navigator.push opens a new screen.
Which widget is a text input?|TextField|Use a controller to read its value.`
  };
  function cat(s) { return s.charAt(0) === '<' ? 't' : s.charAt(0) === '$' ? 'v' : 'o'; }
  CM.TRACKS.forEach(function (t) {
    var rows = (F[t.id] || '').split('\n').map(function (l) { return l.split('|'); }).filter(function (r) { return r.length === 3; });
    var answers = rows.map(function (r) { return r[1]; });
    rows.forEach(function (r) {
      var pool = answers.filter(function (a) { return a !== r[1] && cat(a) === cat(r[1]); });
      if (pool.length < 3) pool = answers.filter(function (a) { return a !== r[1]; });
      var d = pool.sort(function () { return Math.random() - 0.5; }).slice(0, 3);
      t.qs.push({ q: r[0], o: [r[1]].concat(d), a: 0, e: '"' + r[1] + '" is correct. ' + r[2] });
    });
  });
})();

CM.SYSTEMS.push({ id: 'sys-debug', name: 'Debug Lab', level: 'All Levels', icon: 'bi-bug-fill', color: '#ff5252', group: 'system', desc: 'Complete system code, one hidden bug. Type the fix.', qs: [
  { q: 'Cart total shows "2030" instead of 50. Type the corrected line that starts the sum.', code: 'function total(items) {\n  let sum = "";\n  for (const i of items) sum += i.price * i.qty;\n  return sum;\n}', fix: ['let sum = 0;'], h: 'The starting value has the wrong type for adding numbers.', e: 'Starting with "" makes += join strings ("" + 20 + 30 = "2030"). let sum = 0 keeps it numeric, so 20 + 30 = 50.' },
  { q: 'The login runs the moment the page loads. Type the corrected line.', code: 'const btn = document.getElementById("btn");\nbtn.onclick = login();\nfunction login() { alert("Welcome"); }', fix: ['btn.onclick = login;', 'btn.addEventListener("click", login);'], h: 'You are calling the function instead of handing it over.', e: 'login() runs immediately and gives its result to onclick. login (no parentheses) passes the function so it runs on click.' },
  { q: 'Any password logs in. Type the corrected condition (use the safe way).', code: '<?php\nsession_start();\n$row = $stmt->fetch();\nif ($_POST["pass"] = $row["pass"]) {\n  $_SESSION["user"] = $row["name"];\n}', fix: ['if (password_verify($_POST["pass"], $row["pass"])) {', 'if ($_POST["pass"] == $row["pass"]) {', 'if ($_POST["pass"] === $row["pass"]) {'], h: 'One symbol assigns instead of compares. The safest fix uses a built-in password function.', e: '= assigns, so the condition is always true. Compare instead; best is password_verify() against a stored hash.' },
  { q: 'Every user became admin. Type the corrected SQL for user id 7.', code: "UPDATE users SET role = 'admin';", fix: ["UPDATE users SET role = 'admin' WHERE id = 7;"], h: 'Which rows does this change right now?', e: 'Without WHERE, UPDATE changes every row. WHERE id = 7 limits it to one user.' },
  { q: 'The first item is never printed. Type the corrected loop line.', code: 'items = ["a", "b", "c"]\nfor i in range(1, len(items)):\n    print(items[i])', fix: ['for i in range(len(items)):', 'for i in range(0, len(items)):'], h: 'Python counts from 0.', e: 'range(1, n) starts at index 1 and skips index 0. range(len(items)) starts at 0.' },
  { q: 'The counter on screen never changes. Type the corrected onPressed body.', code: 'onPressed: () {\n  count++;\n},', fix: ['setState(() { count++; });', 'setState(() => count++);', 'setState(() { count += 1; });'], h: 'Flutter must be told to rebuild.', e: 'Changing a variable alone does not redraw. setState(() { ... }) updates it and schedules a rebuild.' },
  { q: 'Admin check always fails even for "admin". Type the corrected condition.', code: 'String name = scanner.nextLine();\nif (name == "admin") {\n  System.out.println("Welcome admin");\n}', fix: ['if (name.equals("admin")) {', 'if ("admin".equals(name)) {'], h: '== compares references for objects, not their text.', e: 'equals() compares the characters. == only checks whether both variables point to the same object.' }
]});
CM.ALL = CM.TRACKS.concat(CM.SYSTEMS);
