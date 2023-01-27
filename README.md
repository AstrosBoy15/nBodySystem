# n-Body System
This webpage displays a simple <a href=https://en.wikipedia.org/wiki/N-body_problem>n-Body simulation</a>. This is a problem often studied in astrophysics as it relates to how celestial bodies are gravitationally attracted to one another. The system is governed by a system of ordinary differential equations. As the number of bodies in the system increases, the problem becomes extremely difficult, or even impossible, to solve analytically. This project seeks to provide a visualization of the solution as it is solved.

## Usage
The simulation can be found <a href=https://astrosboy15.github.io/nBodySystem/>here</a>. To add new bodies to the system, simply click anywhere in the black canvas area. Options for how future bodies are created can be found in the side panel. The mass and velocity of new bodies can be modified here. Curve paths for the bodies can also be changed. Finally, the simulation can be paused or reset entirely.

## Project Details
This project was done in November of 2020. It uses p5.js for rendering the graphics to the screen. To compute each time step of the simulation, Euler's method is used as an approximation to the solution.

## Future Work
This simulation loses accuracy over time. This could be fixed by decreasing the time step--which will slow down the simulation--or by implementing a more accurate method of approximating the solution at each time step. In the future, it could be beneficial to implement a method such as Runge-Kutta 4 instead of Euler's to improve accuracy. The GUI is also fairly minimal, so improving the UI and adding more options for the user to choose from could also increase the usability of the simulation.
