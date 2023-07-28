const color1 = document.getElementById("color-1");
const color2 = document.getElementById("color-2");
const download = document.getElementById("download-btn");
const share = document.getElementById("share-btn");
const qrContainer = document.querySelector("#qr-code");
const URLInput = document.getElementById("url-input");



// EVENT LISTENERS
color1.addEventListener('input', handleColor1);
color2.addEventListener('input', handleColor2);
URLInput.addEventListener('input', handleURLInput);
share.addEventListener('click', handleShare);


// LET CONSTS
let color1Black = "#fff",
    color2White = "#000",
    size = 300;
    text = ''

// HANDLE COLOR 1
function handleColor1(e) {
    color1Black = e.target.value;

    generateQRCode();
}
// HANDLE COLOR 2
function handleColor2(e) {
    color2White = e.target.value;

    generateQRCode();
}

// HANDLE INPUT VALUE
function handleURLInput(e) {
    const value = e.target.value;
    text = value;

    generateQRCode();
}

// HANDLE SIZE 
function handleSize(e) {
    size = e.target.value;

    generateQRCode();
}

// HANDLE SHARE  https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
async function handleShare() {
    setTimeout(async() => {
        try {
            const base64url = await resolveDataUrl();
            const blob = await (await fetch(base64url)).blob();
            const file = new File([blob], "QRCode.png",{
                type: blob.type,
            });
            await navigator.share({
                files: [file],
                title: text,
            });
        } catch (error) {
            alert("Your browser doesn't alow sharing.");
        }
    }, 100);
}

// QR CODE GENERATOR FUNCTION
async function generateQRCode() {
    qrContainer.innerHTML = "";
    new QRCode('qr-code', {
        text,
        color1Black,
        color2White,
        height: size,
        width: size,
    });
    download.href = await resolveDataUrl();
}

// URL DATA RESOLVE FUNCTION
function resolveDataUrl() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const img = document.querySelector('#qr-code img')
            if (img.currentSrc) {
                resolve(img.currentSrc);
                return;
            }
            const canvas = document.querySelector('canvas');
            resolve(canvas.toDataURL());
        }, 50);
    });
}


// CALL FUNCTION
generateQRCode();