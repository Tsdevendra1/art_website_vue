function homePage() {
    let homeVideo = document.getElementById('home-video');
    homeVideo.play();
}

function navBar() {
}

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

function workPage() {
    Vue.component('animation-project', {
        props: ['project_title', 'image_path', 'description', 'video_path', 'images_page_url'],
        data: function () {
            return {
                originalMainHeight: null,
                originalWrapperHeight: null,
                originalTextHeight: null,
                readMore: null,
            }
        },
        mounted: function () {
            // let growDiv = this.$el;
            // let wrapper = this.$el.querySelector('.measuring-wrapper');
            //
            // // Save the original heights
            // this.originalMainHeight = growDiv.offsetHeight;
            // this.originalWrapperHeight = wrapper.clientHeight;
            // this.originalTextHeight = this.$el.querySelector('.card-text').clientHeight;
            //
            // // This sets whether the read more button is shown
            // let text = this.$el.querySelector('.description-text');
            // this.readMore = text.clientHeight > (wrapper.clientHeight + 5);
            //
            //
            // // You have to set the height the first time for some reason in javascript
            // let growHeightString = this.originalMainHeight + "px";
            // let wrapperHeightString = this.originalWrapperHeight + "px";
            // growDiv.style.height = growHeightString;
            // wrapper.style.height = wrapperHeightString;

        },
        methods: {
            showMore: function (event) {
                let growDiv = this.$el;
                let wrapper = this.$el.querySelector('.measuring-wrapper');
                let text = this.$el.querySelector('.description-text');
                let cardText = this.$el.querySelector('.card-text');
                let cardBody = this.$el.querySelector('.body-text-class');

                let growHeightString = this.originalMainHeight + "px";
                let wrapperHeightString = this.originalWrapperHeight + "px";


                // If the div is expanded, close it
                if (growDiv.style.height !== growHeightString) {
                    growDiv.style.height = growHeightString;
                    wrapper.style.height = wrapperHeightString;
                    // Else open the div
                } else {
                    let cardTextPositions = cardText.getBoundingClientRect();
                    let growDivPositions = growDiv.getBoundingClientRect();
                    let difference = growDivPositions.bottom - cardTextPositions.top;
                    let randomFactor = 88;
                    growDiv.style.height = (this.originalMainHeight + difference + randomFactor) + "px";
                    wrapper.style.height = (this.originalWrapperHeight + difference + randomFactor) + "px";
                }
                // Change read more or less depending on previous value
                this.$el.querySelector('.more-button').value = this.$el.querySelector('.more-button').value == 'Read more' ? 'Read less' : 'Read more';
            },
            showVideo: function (event) {

                // Show all the elements when button is clicked
                let videoElements = document.getElementsByClassName('video-player-package');
                for (let element of videoElements) {
                    element.style.display = 'inline';
                }


                // Play video
                let video = document.getElementsByClassName('video-player')[0];
                video.src = this.video_path;
                video.volume = 0.1;
                video.play();
            },
            scalePicture: function () {
                let siblingImageElement = this.$el.querySelector('img');
                siblingImageElement.style.transform = "scale(1.1)";
            },
            originalPicture: function () {
                let siblingImageElement = this.$el.querySelector('img');
                siblingImageElement.style.transform = "scale(1)";
            },
        },
        // language=HTML
        template: `

            <div class="card project-card">
                <div class="card-body project-title">
                    <h5 class=""><b>{{ project_title }}</b></h5>
                    <!--<i class="far fa-folder-open"></i>&nbsp <a v-if="images_page_url" :href="images_page_url" class="card-link">Animation-->
                    <!--Stills</a>,-->
                    <!--<a-->
                            <!--style="margin-left:0px;" href="#"-->
                            <!--class="card-link">Behind The Scenes-->
                    <!--</a>-->
                </div>
                <div @click="showVideo" class="cursor-class project-image">
                    <div class="container-for-image">
                        <img width="484" height="270" style="-webkit-border-radius: 0;-moz-border-radius: 0;border-radius: 0;"
                             class="card-img-top card-image" :src="image_path" alt="Card image cap">
                        <div @mouseover="scalePicture" @mouseleave="originalPicture" class="center-image-text-small">
                            <!--<b class="uppercase">{{ project_title }}</b>-->
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                </div>
                <div class="card-body body-text-class">
                    <i class="far fa-folder-open"></i>&nbsp <a v-if="images_page_url" :href="images_page_url" class="card-link">Animation
                    Stills</a>,
                    <a
                            style="margin-left:0px;" href="#"
                            class="card-link">Behind The Scenes
                    </a>
                    <!--<h5 class="card-title"><b>{{ project_title }}</b></h5>-->
                    <!--<div class="measuring-wrapper">-->
                        <!--<div class="text description-text">-->
                            <!--<p class="card-text">{{ description }}</p>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<input v-if="this.readMore" type="button" @click="showMore" value="Read more" class="more-button">-->
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
                let closeButton = document.getElementsByClassName('close-button')[0];
                let videoPlayerBackground = document.getElementsByClassName('video-player-background')[0];
                let videoPlayer = document.getElementsByClassName('video-player')[0];
                videoPlayer.currentTime = 0;
                videoPlayer.pause();
                videoPlayer.style.display = 'none';
                closeButton.style.display = 'none';
                videoPlayerBackground.style.display = 'none';
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

function individualProjectPage() {
}

function exhibitionPage() {
    new Vue({
        el: '#app',
        data: function () {
            return {}
        },
        methods: {},
    })
}
