

function typeWriter(text, elementId, delay = 100) {
    const element = document.getElementById("aboutText");
    let i = 0;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, delay);
        }
    }
    type();
}
typeWriter("Hello, I'm Drake, a student at Temple University", "aboutText", 50);

const projects = [
    {
        title: "In-Class Incubator Project",
        image: "incubator.jpg",
        description: "A project where we designed and built a class incubator using a microcontroller, sensors, and a heating element to maintain certain temperature states."
    },
    {
        title: "Posture Detector",
        image: "posturephoto.jpg",
        description: "Posture detector that uses sensors to provide feedback on sitting posture."
    }
];

const projectsContainer = document.getElementById("projects");
let currentprojects = 0;

function cycleProjects() {
    currentprojects++;
    if (currentprojects >= projects.length) {
        currentprojects = 0;
    }
    const project = projects[currentprojects];
}
