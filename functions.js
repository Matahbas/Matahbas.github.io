document.getElementById('themeButton').addEventListener('click', ()=> {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const themeButton = document.getElementById('themeButton');
    if(body.classList.contains('dark-mode')){
        themeButton.textContent = 'Light Mode';
    } else {
        themeButton.textContent = 'Dark Mode';
    }
});
