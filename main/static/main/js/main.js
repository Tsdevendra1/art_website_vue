function homePage() {
    let homeVideo = document.getElementById('home-video');
    homeVideo.play();
}

function navBar() {
}

function workPage() {
    Vue.component('animation-project', {
        props: ['project_title', 'image_path', 'description', 'video_path'],
        data: function () {
            return {
                count: 0
            }
        },
        methods: {
            showVideo: function (event) {

                // Show all the elements when button is clicked
                let videoElements = document.getElementsByClassName('video-player-package');
                let video = document.getElementsByClassName('animation-video')[0];
                for (let element of videoElements) {
                    element.style.display = 'inline';
                }


                video.src = this.video_path;
                video.volume = 0.1;
                video.play();
            }
        },
        // language=HTML
        template: `

            <div class="card project-card" style="width: 23rem;">
                <div class="card-body project-title">
                    <i class="far fa-folder-open"></i>&nbsp <a href="#" class="card-link">Film Stills</a>, <a
                        style="margin-left:0px;" href="#"
                        class="card-link">Behind The Scenes
                </a>
                </div>
                <div @click="showVideo" class="cursor-class project-image">
                    <img style="-webkit-border-radius: 0;-moz-border-radius: 0;border-radius: 0;"
                         class="card-img-top card-image" :src="image_path" alt="Card image cap">
                </div>
                <div @click="showVideo" class="cursor-class card-body">
                    <h5 class="card-title"><b>{{ project_title }}</b></h5>
                    <p class="card-text">{{ description }}</p>
                </div>
            </div>
        `
    });
    new Vue({
        el: '#app',
        created: function () {
        },
        data: function () {
            return {}
        },
        methods: {
            closeButton: function () {
                let button = document.getElementsByClassName('close-button')[0];
                let videoPlayer = document.getElementsByClassName('video-player')[0];
                let video = document.getElementsByClassName('animation-video')[0];
                video.currentTime = 0;
                video.pause();
                button.style.display = 'none';
                videoPlayer.style.display = 'none';
            }
        }
    })
}


function addProjectPage() {
    Vue.component('picture-form', {
        props: ['picture_num'],
        data: function () {
            return {
                nameText: `form-${this.picture_num}-picture`,
                idText: `id_form-${this.picture_num}-picture`,
            }
        },
        // language=HTML
        template: `
            <div class="form-group"><label :for="this.idText">Picture:</label> <input type="file"
                                                                                      :name="this.nameText"
                                                                                      :id="this.idText"
                                                                                      class="form-control">
                <small class="form-text text-muted">This will be displayed on the product page</small>
            </div>
        `
    });

    new Vue({
        el: '#app',
        data: function () {
            return {
                pictureNum: 0,
            }
        },
        methods: {
            addPicture: function () {
                this.pictureNum += 1;
                let totalNumForms = document.getElementById('id_form-TOTAL_FORMS');
                let currentNumber = parseInt(totalNumForms.value);
                totalNumForms.value = (currentNumber + 1)
            },
            removePicture: function () {
                this.pictureNum -= 1;
                let totalNumForms = document.getElementById('id_form-TOTAL_FORMS');
                let currentNumber = parseInt(totalNumForms.value);
                totalNumForms.value = (currentNumber - 1)
            }
        }
    })
}