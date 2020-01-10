let pageLoaded = false;
window.onload = function(){
    pageLoaded = true
}

const setPreloaderTimeout = ()=> {
    setTimeout(()=>{
        if(pageLoaded)
            document.getElementById('preloader').style.display = 'none';
        else 
            setPreloaderTimeout()
    }, 300)
}

setPreloaderTimeout()