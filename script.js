const dark = document.querySelector(".dark"); 
const light = document.querySelector(".light");
const download = document.getElementById("download-btn");
const share = document.getElementById("share-btn");
const qrContainer = document.querySelector("#qr-code");
const URLInput = document.getElementById("url-input");



// EVENT LISTENERS
dark.addEventListener('input', handleColor1);
light.addEventListener('input', handleColor2);
URLInput.addEventListener('input', handleURLInput);
share.addEventListener('click', handleShare);




let [size, text, colorDark, colorLight] = [300, '', '#000', '#fff']; //Let for colors not working in initialization


// HANDLE COLOR 1
function handleColor1(e) {
    colorDark = e.target.value; //needs to be called colorDark to work

    generateQRCode();
}
// HANDLE COLOR 2
function handleColor2(e) {
    colorLight = e.target.value; //needs to be called colorLigth to work

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
        height: size,
        width: size,
        colorDark : colorDark,
        colorLight: colorLight,
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