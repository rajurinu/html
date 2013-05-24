/* creates button, sets cookie, for calling authors-only stylesheet. 
WARNING: Not Crockford-friendly. */

var Authors = {
    span: null,
    link: document.getElementById('authors'), 

    //onload
    init: function() {
        //don't bother if there's no author stylesheet
        if(Authors.link===null){return;}

        var button=document.createElement('BUTTON');
        button.id='authorButton';

        Authors.span=button.appendChild(document.createElement('SPAN'));
        button.appendChild(document.createTextNode('author-only styles')); 
        document.body.appendChild(button);

        var cookie=Authors.getCookie('authorstyle'),
            value = cookie ? cookie : 'no';
        Authors.span.appendChild(document.createTextNode((value==='no') ? 'Add ' : 'Remove '));
        Authors.link.disabled=true;
        Authors.link.disabled = (value==='no') ? true : false; 
         
        if(document.addEventListener) {
            button.addEventListener('click', Authors.toggle, false);
        }
        else {
            button.attachEvent('onclick', Authors.toggle);
        }
    },

    setCookie: function(name, value, expDays) {
        var expDate=new Date();
        expDate.setTime(expDate.getTime()+(expDays*24*60*60*1000));
        document.cookie=name + '=' + escape(value) + ((expDays==null) ? '' : ';expires=' + expDate.toGMTString()) + '; path=/';
    },

    getCookie: function(name) {
        var cookiename=name + '=',
            cookieArray=document.cookie.split(';');
        for(var i=0;i<cookieArray.length;i++) {
            var c=cookieArray[i];
            while(c.charAt(0)===' ') { 
                c=c.substring(1,c.length);
            }
            if(c.indexOf(cookiename)===0) {
                return unescape(c.substring(cookiename.length,c.length));
            }
        }
        return null;
    },

    //in case someone wants
    deleteCookie: function(name) {
        Authors.setCookie(name, '', -1);
    },

    toggle: function(event) {
        var link=Authors.link,
            span=Authors.span;

        if(span.firstChild.nodeValue==='Add ') {
            if(link.disabled) {Authors.link.disabled=false;}
            span.firstChild.nodeValue='Remove ';
            Authors.setCookie('authorstyle', 'yes', 7);
        }
        else if(span.firstChild.nodeValue==='Remove ' ||
                span.firstChild.nodeValue=='undefined') { 
            if(!link.disabled) {Authors.link.disabled=true;}
            span.firstChild.nodeValue='Add ';
            Authors.setCookie('authorstyle', 'no', 7);
        }
    }
};

if(document.addEventListener) {
    window.addEventListener('load', Authors.init, false);
}
else if(window.attachEvent) {
    window.attachEvent('onload', Authors.init);
}
