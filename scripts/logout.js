function get_cookie(name){
    return document.cookie.split(';').some(c => {
        return c.trim().startsWith(name + '=');
    });
}

function delete_cookie( name, path ) {
    if( get_cookie( name ) ) {
      document.cookie = name + "=" +
        ((path) ? ";path="+path:"")+
        ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
        
        window.alert('You have been logged out!')
    }
    else {
        window.alert('You are not logged in!')
    }
    
}