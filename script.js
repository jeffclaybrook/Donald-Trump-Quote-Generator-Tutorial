const audio = new Audio();

const showToast = () => {
    const toast = document.getElementById('toast');
    toast.classList.add('active');
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

const copyQuote = () => {
    const h1 = document.getElementById('quote');
    const clipboard = navigator.clipboard;
    clipboard.writeText(h1.innerText)
    .then(() => showToast());
}

const playQuote = () => {
    audio.play();
}

const loadQuote = async () => {
    const h1 = document.getElementById('quote');
    const h5 = document.getElementById('source');
    const button = document.querySelector('.load-btn');
    const buttons = document.querySelectorAll('.icon-btn');
    try {
        const res = await fetch('data.json');
        const data = await res.json();
        const quote = data[Math.floor(Math.random() * data.length)];
        const { clip, text, source } = quote;
        audio.src = clip;
        h1.innerText = text;
        h5.innerText = source;
    } catch {
        h1.innerText = 'Ooops! Trouble loading content';
        h5.style.display = 'none';
        button.innerText = 'Refresh';
        buttons.style.display = 'none';
    }
}

window.addEventListener('load', () => loadQuote());