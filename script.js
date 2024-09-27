// Paths to image folders
const paths = {
    background: 'images/background/',
    head: 'images/head/',
    face: 'images/face/',
    hair: 'images/hair/'
};

// Image elements
const avatarElements = {
    background: document.getElementById('background'),
    head: document.getElementById('head'),
    face: document.getElementById('face'),
    hair: document.getElementById('hair')
};

// Image lists
const images = {
    background: ["bg1.png", "bg2.png", "bg3.png", "bg4.png", "bg5.png", "bg6.png", "bg7.png", "bg8.png" ],
    head: ["head1.png", "head2.png", "head3.png", "head4.png", "head5.png", "head6.png", "head7.png", "head8.png", "head9.png"],
    face: ["face1.png", "face2.png", "face3.png", "face4.png", "face5.png", "face6.png","face7.png", "face8.png", "face9.png"],
    hair: ["hair1.png", "hair2.png", "hair3.png","hair4.png", "hair5.png", "hair6.png","hair7.png", "hair8.png", "hair9.png","hair10.png", "hair11.png", "hair12.png"]
};

// Populate dropdowns
['background', 'head', 'face', 'hair'].forEach(type => {
    const select = document.getElementById(`${type}-select`);
    images[type].forEach(image => {
        const option = document.createElement('option');
        option.value = image;
        option.textContent = image.split('.')[0];
        select.appendChild(option);
    });

    select.addEventListener('change', function () {
        const value = this.value;
        if (value) {
            const imgPath = `${paths[type]}${value}`;
            avatarElements[type].src = imgPath;
            avatarElements[type].style.display = 'block';
        } else {
            avatarElements[type].style.display = 'none';
        }
        // Check if all categories have been selected
        checkSelections();
    });
});

// Download functionality
const downloadButton = document.getElementById('download-btn');
const canvas = document.getElementById('avatar-canvas');
const ctx = canvas.getContext('2d');

// Initially disable the download button
downloadButton.disabled = true;

downloadButton.addEventListener('click', () => {
    if (downloadButton.disabled) return; // Prevent action if button is disabled

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw each image onto the canvas in order
    const layers = ['background', 'head', 'face', 'hair'];
    layers.forEach(layer => {
        if (avatarElements[layer].style.display !== 'none') {
            ctx.drawImage(avatarElements[layer], 0, 0, canvas.width, canvas.height);
        }
    });

    // Create a link to download the image
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'avatar.png';
    link.click();
});

// Function to check if all image categories have been selected
function checkSelections() {
    const allSelected = ['background', 'head', 'face', 'hair'].every(type => {
        return avatarElements[type].style.display !== 'none';
    });

    // Enable or disable the download button based on selections
    downloadButton.disabled = !allSelected;
    if (allSelected) {
        downloadButton.style.cursor = 'pointer';
        downloadButton.style.backgroundColor = '#4CAF50'; // Change color to indicate it's active
    } else {
        downloadButton.style.cursor = 'not-allowed';
        downloadButton.style.backgroundColor = '#ccc'; // Change color to indicate it's inactive
    }
}