let $imageContainer = $('.image-container');
let infiniteLoading = false;

var script = document.createElement('script');
script.src = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json';
document.querySelector('head').appendChild(script);

window.jsonFlickrFeed = function(data){
    data.items.map(function(item, index){
        $imageContainer.append(`
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="image-item" style="background-image: url('${item.media.m}')"></div>
            <a href="${item.link}">${item.title.length ? item.title != ' ' ? item.title : '[No Image Title]' : '[No Image Title]' } </a> by <a href="https://www.flickr.com/photos/${item.author_id}/">${item.author.length ? item.author.replace('nobody@flickr.com','').replace('(\"','').replace('\")','') : '[No Author Name]'}</a> <br/>
            
            Tags: ${item.tags.length ? item.tags.split(' ').join(', ') : 'No tags.'}
        </div>`);
    })
    // Description: ${item.description} <br/>
    infiniteLoading = false;
    checkScrolledToBottom();
}

let checkScrolledToBottom = function(){
    if($(window).scrollTop() + $( window ).height() > $imageContainer.offset().top + $imageContainer.outerHeight() - 300) {
        infiniteLoading = true;
        var script = document.createElement('script');
        script.src = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json';

        document.querySelector('head').appendChild(script);
    }
}

$( window ).scroll(function() {
    if(!infiniteLoading){
        checkScrolledToBottom();
    }
});