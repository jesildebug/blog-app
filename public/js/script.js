document.addEventListener('DOMContentLoaded', function() {


    const allButtons = document.querySelectorAll('.searchBtn');
    const searchBar = document.querySelector('.searchBar');
    const searcInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');

    for(var i=0;i <allButtons.length; i++){
        allButtons[i].addEventListener('click' , function(){
            searchBar.style.visibility = 'visible' ;
            searchBar.classList.add('open');
            this.setAttribute('aria-expanded','true');
            searcInput.focus()
        })
    }

        searchClose.addEventListener('click', function() {
            searchBar.style.visibility = 'hidden';
            searchBar.classList.remove('open');
            this.setAttribute('aria-expanded', 'false');
          });
    
})