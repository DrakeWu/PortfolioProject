

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
typeWriter("CO/2029 ECE Major at Temple University.", "aboutText", 50);