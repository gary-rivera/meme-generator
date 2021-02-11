let memeWindow = document.querySelector('#memeWindow'); // location meme goes to

// forms behavior before and after interacting
let preFillForm=['URL', 'Top Text (optional)', 'Bottom Text (optional)']
let forms = document.querySelectorAll('.form')

for (let i = 0; i < forms.length; i++) {
    forms[i].addEventListener('focus', function clearForm(e) {
        forms[i].value='';
    })
    forms[i].addEventListener('blur', function preFill() {
        if (forms[i].value  === '') {
            forms[i].value = preFillForm[i];
        }
    })
}

//define URL from form 1
let url = document.querySelector('#url')
url.addEventListener('change', function defineURL(e) {
    url = new Image();
    url.src = e.target.value;
})

//define topText from form 2
let topText = document.querySelector('#topText')
topText.addEventListener('change', e => topText = e.target.value);

//define bottomText from form 3
let bottomText = document.querySelector('#bottomText')
bottomText.addEventListener('change', e => bottomText = e.target.value);


//function to generate meme from the above variables
function generateMeme(urlImg, tText, bText) {

    if (url === undefined) alert('Please enter a valid URL')

    // if input text invalid convert to empty string
    if (typeof tText === 'object') {tText = ''}
    if (typeof bText === 'object') {bText = ''}

    // create canvas for everything to attach to
    let meme = document.createElement('canvas')
    let ctx = meme.getContext('2d');
    
    //meme size = dynamic
    meme.width = urlImg.width;
    meme.height = urlImg.height;
    ctx.clearRect(0, 0, meme.width, meme.height);

    //draw img to background as bottom layer
    ctx.drawImage(urlImg, 0,0);

    //font formatting
    let fontSize = meme.width / 10; 
    ctx.font = fontSize + 'px Impact';
    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 2;
    ctx.textAlign = 'center';

    //top text 
    ctx.textBaseline = 'top';
    ctx.fillText(tText, meme.width/2, 5, meme.width)
    ctx.strokeText(tText, meme.width/2, 5, meme.width)

    //bottom text
    ctx.textBaseline = 'bottom';
    ctx.fillText(bText, meme.width/2, meme.height - 5, meme.width)
    ctx.strokeText(bText, meme.width/2, meme.height - 5, meme.width)

    return meme;
}

// once 'generatebtn' is clicked
let generateBtn = document.querySelector('#generateBtn'); 
generateBtn.addEventListener('click', function appendToMemeWindow(e) {
    // prevent reload
    e.preventDefault()

    //generate meme with a class of 'meme' for styling
    let meme = generateMeme(url, topText, bottomText);
    meme.setAttribute('class', 'meme')

    //addEvent if clicked remove element. 
    meme.addEventListener('click', function(e) {
        e.target.setAttribute('class', 'disappear')

        setTimeout(function() {
            memeWindow.removeChild(meme)}, 380);
    })

    //append container/meme+overlay to doc.body.memeWindow
    memeWindow.appendChild(meme);
    
    // reset forms
    document.querySelector('form').reset();
    url = '';
    topText = '';
    bottomText = '';

});



//background follow cursor while on screen 
let wrapper = document.querySelector('.wrapper');//select window wrapper

//add event to this variable. event should track mouse movement and adjust background gradient based on cursor location
wrapper.addEventListener('mousemove', function(e) {
    //define window parameters
    windowW = window.innerWidth;
    windowH = window.innerHeight;

    //define a variable to adjust css gradient values based off cursor location on wrapper element
    mouseX = Math.round(e.pageX / windowW * 90);
    mouseY = Math.round(e.pageY / windowH * 90);

    wrapper.style = `background:radial-gradient(at ${mouseX}% ${mouseY}%, #d6a2e8, #82589f)`
});
