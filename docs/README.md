## Audio Visualizer

For this project I will create an audio visualizer using Javascript, CSS, the HTML Canvas element, and the Web Audio API. The audio visualizer will be separted into three different parts of the same song.

## Funtionality and MVP

With my audio visualizer, users will be able to:

- Press play to start the visualizations.
- Basic sound bar visualization
- Pulse visualization
- Waveform visualization

In addition, this project will include:

- A production Readme

## Wireframes

There will be a drop down menu describing the page and a link to the github.


![wireframes](docs/wireframes/js_project.jpg)

## Architecture and Technologies

For this project I plan to use:

- Vanilla Javascript
- Canvas HTML element
- Web Audio API for extracting the data from the Audio file.
- Webpack to bundle and set up the files

The following scripts will be involved in this project:

`audio.js`: this is where the data for the audio will be stored. I will create methods and allow manipulation of the audio stream.

`pulse.js`: this is where a pulse type animation will be rendered

`soundBar.js`: this is where the classic sound bar animation will be rendered

`waveform.js`: this is where a wavefirm animation will be rendered

## Implementation Time

**Day 1**: set up file structure and test to make sure entry file is working.

- Go over the Web Audio API and set up my audio.js file so I can create and Audio Object with a sound file saved as a instance variable.
- Test that I can do some basic extraction of the audio data to render something to the page.
- By the end of the day have the basic layout of my webpage done and have canvas elements rendered to the page. 

**Day 2**: Get a basic sound bar visualizer rendered on the page

- implement the sine and cosine sound wave methods in my audio.js file. 

**Day 3**: Create a pulse audio visualization

- implement a method in the audio.js file that analyzes the audio file and creates specifies output

**Day 4**: Create two other rendered canvas objects based on the previous two methods. 

- Use CSS to style something that shows my interest in design and creativity.

## Bonus Features

- [ ] Allow the user to upload a sound file to be visualized.
