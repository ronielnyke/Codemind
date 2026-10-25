CODEMIND — Developer Thinking Lab

Train Your Mind. Think Like a Developer.

CODEMIND is an interactive programming quiz platform designed to help learners improve their programming knowledge, logical thinking, debugging skills, and understanding of code. It provides short challenges across nine programming topics, with instant feedback, progress tracking, experience points, achievements, and a certificate of completion.

Table of Contents

- "Project Overview" (#project-overview)
- "Main Features" (#main-features)
- "Programming Tracks" (#programming-tracks)
- "Quiz Rules and Scoring" (#quiz-rules-and-scoring)
- "Learning Flowchart" (#learning-flowchart)
- "Progress Tracking" (#progress-tracking)
- "Achievements and Badges" (#achievements-and-badges)
- "Certificate of Completion" (#certificate-of-completion)
- "User Interface" (#user-interface)
- "Technologies Used" (#technologies-used)
- "Project Structure" (#project-structure)
- "Data Storage and Limitations" (#data-storage-and-limitations)
- "Credits" (#credits)
- "License" (#license)

Project Overview

CODEMIND provides a practice environment where learners answer programming questions and receive feedback about their answers.

The platform focuses on three learning activities:

1. Code Analysis — Understand code snippets and predict their output.
2. Debugging — Identify mistakes and improve understanding of programming logic.
3. Knowledge Assessment — Test programming knowledge through multiple-choice questions.

The system combines learning activities with a progress and achievement system to encourage learners to continue practicing.

CODEMIND runs in a web browser and uses client-side technologies. It does not require a backend server or database for its current browser-based progress features.

Main Features

1. Interactive Dashboard

The dashboard provides an overview of the learner's progress.

It includes:

- Learner name.
- Total experience points (XP).
- Current level.
- Answer accuracy.
- Practice streak.
- Number of programming tracks passed.
- Topics that may need additional practice.

The dashboard helps learners review their performance and decide which programming track to practice next.

2. Programming Track Selection

The platform provides nine programming tracks. Learners can select a topic and begin a quiz.

Each track has its own question bank and records its own passing status and best score.

3. Multiple-Choice Quizzes

Each quiz round contains five questions.

Questions may involve identifying programming mistakes, understanding code behavior, or predicting output. The learner selects an answer from the available choices.

After submitting an answer, the system displays feedback and an explanation. Answer buttons are disabled after the selection to prevent multiple answers to the same question.

4. Instant Answer Feedback

CODEMIND provides feedback after each answer.

- Correct answer: Displays positive feedback, an explanation, and the applicable XP reward.
- Incorrect answer: Displays corrective feedback and an explanation of the question.

The quiz then allows the learner to continue to the next question.

5. Experience Points and Levels

The platform uses experience points to represent learning activity.

- A correct answer earns 10 XP.
- Completing a passing quiz round awards 50 bonus XP.
- The displayed level is calculated from accumulated XP.

The level calculation used by the certificate is:

"Level = floor(Total XP / 100) + 1"

For example, a learner with 250 XP is displayed at Level 3.

XP, levels, and achievements are gamification features. They do not represent an official assessment of professional programming ability.

6. Track Results

The system records the best score and passing status for each programming track.

A track is considered passed when the learner scores at least four correct answers out of five.

Learners can revisit tracks to practice again and improve their understanding.

7. Achievements and Badges

CODEMIND includes seven achievement badges.

The achievement system recognizes milestones associated with learning activity and quiz performance. The badges page also includes a results table for the programming tracks.

Badges are intended to encourage continued practice. They are platform achievements, not professional certifications.

8. Certificate of Completion

The certificate page tracks completion of the nine programming tracks.

The certificate becomes available when:

- All nine programming tracks have been passed.
- A learner name has been saved.

The certificate is generated as an image and includes information such as:

- Learner name.
- Issue date.
- Certificate ID.
- Completed programming tracks.
- Total XP.
- Accuracy.
- Level.
- Developer and sponsor credits.

Available certificate actions include downloading a PNG image and printing the certificate or saving it as a PDF through the browser's print dialog.

The certificate is issued by the CODEMIND platform. It is not an accredited academic degree, government-issued qualification, or professional license. Its Certificate ID does not have an online verification service.

9. Dark and Light Themes

The interface supports dark and light themes to provide different viewing preferences.

The selected theme is handled by the browser-based interface and its associated client-side logic.

10. Animated Introduction

The introductory sequence presents the system through animated visual scenes.

The documented sequence includes:

1. System name.
2. Developer information.
3. Sponsor information.
4. Programming tracks.
5. Technologies used.
6. A call to action.

The introduction includes visual effects, a progress indicator, a Skip control, automatic sound with no mute button, and keyboard controls. It is designed to appear on the first visit of a browser session and can be replayed through the Intro control in the navigation.

11. Responsive Interface

The interface uses responsive layout components and CSS styling to adapt its content to different screen sizes.

The design includes cards, navigation, tables, progress indicators, gradients, animations, and other visual effects.

12. Reset Progress

The interface includes a Reset Progress feature for clearing saved learning progress.

Use this action carefully because resetting progress may remove previously saved results and achievements.

Programming Tracks

CODEMIND contains nine programming tracks.

No.| Track| Learning Focus
1| HTML| Web page structure and HTML concepts
2| CSS| Styling, layout, and presentation concepts
3| JavaScript| Programming logic and code behavior
4| PHP| Server-side programming concepts
5| SQL| Database query concepts
6| React| Component-based interface concepts
7| Python| General programming concepts
8| Java| Programming syntax and logic
9| Flutter| Cross-platform application development concepts

These descriptions explain the general subjects of the tracks. The actual questions available in each track depend on the question bank included in the project.

Quiz Rules and Scoring

The quiz uses the following rules:

Rule| Description
Questions per track in the question bank| 7
Questions per round| 5
Minimum passing score| 4 out of 5
XP per correct answer| 10 XP
Passing-round bonus| 50 XP
Total programming tracks| 9
Total questions in the question bank| 63

The system shuffles answer choices and avoids repeating a question within the same round. It prioritizes unseen questions in later rounds when available.

Because each track has a limited question bank, questions can appear again in later rounds.

Learning Flowchart

The following flowchart explains the main learning process, from opening CODEMIND to unlocking the certificate.

flowchart TD
    A([Open CODEMIND]) --> B[Enter and Save Learner Name]
    B --> C[Choose a Programming Track]
    C --> D[Start a Quiz Round]
    D --> E[Answer Five Questions]
    E --> F[Review Feedback and Explanations]
    F --> G{Score at Least 4 out of 5?}
    G -- No --> H[Review Mistakes and Practice Again]
    H --> C
    G -- Yes --> I[Mark Track as Passed]
    I --> J[Update XP, Results, and Achievements]
    J --> K{Have All Nine Tracks Been Passed?}
    K -- No --> C
    K -- Yes --> L{Is Learner Name Saved?}
    L -- No --> B
    L -- Yes --> M[Unlock Certificate]
    M --> N[Download PNG or Print as PDF]
    N --> O([Learning Milestone Completed])

Flowchart note: This is a documentation diagram written in Mermaid syntax. It explains the learning workflow; it is not a separate interactive feature inside the application. It renders in Markdown viewers that support Mermaid.

Progress Tracking

CODEMIND saves learning information in browser storage.

The recorded information supports features such as:

- Total XP.
- Current level.
- Answer statistics.
- Practice streak.
- Track passing status.
- Best track scores.
- Achievement progress.
- Saved learner name.
- Certificate information.

Progress is stored locally in the browser rather than in an online user account.

As a result, progress does not automatically synchronize across different browsers or devices. Clearing the browser's stored site data may remove saved progress.

Achievements and Badges

The achievements page provides a visual summary of earned badges and track results.

Badges are intended to reward milestones and encourage learners to continue practicing. Track results provide additional information about performance in individual programming subjects.

The exact badge conditions are defined by the achievement logic included in the project.

Certificate of Completion

The certificate is generated through the browser's Canvas API.

It displays the learner's saved name, completion information, selected statistics, issue date, certificate ID, and project credits.

The certificate can be downloaded as a PNG image. The print option allows the learner to use the browser's print dialog to print the certificate or save it as a PDF.

Important: The certificate confirms completion according to CODEMIND's own quiz rules. It does not prove professional competency through an independently verified examination. The project does not provide an online certificate-validation service.

User Interface

The project uses separate pages for its major sections.

Page| Purpose
"index.html"| Main dashboard and introductory experience
"tracks.html"| Displays the programming tracks
"quiz.html"| Presents quiz questions and round results
"badges.html"| Displays achievements and track results
"certificate.html"| Shows certificate progress and certificate actions
"about.html"| Presents project information, technologies, and credits

The shared interface includes navigation and footer areas, while CSS and JavaScript provide styling and page behavior.

Technologies Used

Technology| Purpose
HTML5| Defines the structure and content of the pages
CSS3| Provides layout, responsive styling, animations, gradients, and visual effects
Vanilla JavaScript (ES6+)| Handles quiz behavior, scoring, progress, achievements, and interactive features
Bootstrap 5.3| Provides responsive layout components and interface elements
Bootstrap Icons| Supplies icons used in the interface
Canvas API| Supports visual drawing for the introduction and certificate
Web Audio API| Plays the introductory sound automatically
LocalStorage| Stores learner progress and other persistent browser-side information
sessionStorage| Remembers session-specific information, such as whether the introduction has been shown

PHP, SQL, React, Python, Java, and Flutter are subjects covered by the quiz. They are not the primary technologies used to build the CODEMIND interface.

Project Structure

The documented project organization is:

CODEMIND/
├── index.html, tracks.html, quiz.html, badges.html, certificate.html, about.html
├── style.css
├── data.js, common.js, intro.js, home.js, tracks.js, quiz.js, badges.js, certificate.js
├── LICENSE
└── README.md

File Responsibilities

- "index.html" — Main dashboard and introductory experience.
- "tracks.html" — Track selection interface.
- "quiz.html" — Quiz interface and results.
- "badges.html" — Achievement badges and track results.
- "certificate.html" — Certificate progress, preview, download, and print controls.
- "about.html" — Project description, technologies, and credits.
- "css/style.css" — Shared visual styling, responsive layout, and animations.
- "js/data.js" — Programming question bank and badge definitions.
- "js/common.js" — Shared state, browser storage, navigation, footer, theme, and notification logic.
- "js/intro.js" — Introductory animation and related controls.
- "js/home.js" — Dashboard behavior.
- "js/tracks.js" — Track selection behavior.
- "js/quiz.js" — Quiz engine, scoring, and round results.
- "js/badges.js" — Achievement page behavior.
- "js/certificate.js" — Certificate drawing, download, and print behavior.

File structure note: This is the structure documented for the project. Confirm that every listed file exists in the actual project folder and that its filename and path match the references in the HTML files before treating the structure as verified.

Data Storage and Limitations

CODEMIND is a client-side learning application. Its current design has the following limitations:

- It does not provide user accounts or authentication.
- It does not use a cloud database for learner progress.
- Progress is stored in the current browser and does not automatically sync between devices.
- Clearing browser storage may erase saved progress.
- Quiz questions are multiple-choice questions.
- The application does not execute submitted code in an isolated programming sandbox.
- The question bank contains 63 questions, so questions may repeat in later rounds.
- Certificate IDs do not have an online verification system.
- Bootstrap and Bootstrap Icons are loaded from a CDN, so an internet connection may be needed to load those external assets.

These limitations describe the current documented design and should not be interpreted as features that have already been implemented.

Credits

Project Name: CODEMIND — Developer Thinking Lab

Tagline: Train Your Mind. Think Like a Developer.

Developer / System Owner: Roniel Nyke Gonzales

Role: System Owner / Web Development

Sponsor: Iloilo Tech Company — Iloilo City

License

This project is licensed under the MIT License.

Copyright (c) 2026 Roniel Nyke Gonzales

The MIT License permits use, copying, modification, distribution, sublicensing, and sale of copies of the software, provided that the copyright notice and permission notice are included in substantial portions of the software.

The software is provided without warranty, as described in the full MIT License.

See the "LICENSE" file for the complete license text.

Current Rules (latest update)

- A run contains up to 50 problems (or all problems in the track if fewer). All answers must be correct.
- A wrong answer is not recorded: it shows a clue only (never the answer) and is replaced by a different problem, so progress is never lost; a correct answer shows why it is right and how it works.
- 9 tracks + 4 systems (Login, REST API + Database, Scalable Backend, Debug Lab) = 13. All 13 must be completed to unlock the certificate.
- Debug Lab shows complete system code with one hidden bug; the learner types the corrected line.
- Licensed under the MIT License (see LICENSE).
