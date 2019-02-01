function homePage() {
    let homeVideo = document.getElementById('home-video');
    homeVideo.play();
}

function navBar() {
}

function workPage() {
    new Vue({
        el: '#app',
        created: function () {
            alert('hi');
        },
        data: function () {
            return {}
        }
    })
}