"use strict";

function homePage() {

    // Set video height on the fly so that it fits exactly the rest of the viewport
    // Element Height = Viewport height - element.offset.top - desired bottom margin
    let homeVideoContainer = document.getElementById('home-video-container');
    let miniNav = document.getElementsByClassName('mini-nav')[0];
    let mainNav = document.getElementById('main-nav');
    // Minus one because of 1px difference between chrome and firefox
    let combinedHeight = (miniNav.offsetHeight + mainNav.offsetHeight) - 1;
    homeVideoContainer.style.top = `${combinedHeight}px`;

    let homeVideo = document.getElementById('home-video');
    homeVideo.play();
    let viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    // Set the video height so that it fills the rest of the screen
    homeVideo.style.height = `${viewportHeight - combinedHeight}px`;
}

function navBar() {
    new Vue({
        el: '#nav-app',
        data: function () {
            return {}
        },
        methods: {
            showMobileMenu: function () {
                let menuElement = document.getElementsByClassName('mobile-nav')[0];
                if (menuElement.style.height !== '100%') {
                    menuElement.style.height = '100%';
                } else {
                    menuElement.style.height = '0';
                }

            }
        }
    });
    let prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
        let currentScrollPos = window.pageYOffset;
        let mobileMenuElement = document.getElementsByClassName('mobile-nav')[0];
        let mainNav = document.getElementById('main-nav');
        if (prevScrollpos > currentScrollPos) {
            mainNav.style.transition = '0.1s';
            mainNav.style.top = "3.1rem";
        } else {
            // Menu shouldn't dissapear if the mobilemenu is open
            if (mobileMenuElement.style.height !== '100%') {
                mainNav.style.transition = '0.7s';
                mainNav.style.top = "-6.1rem";
            }
        }
        prevScrollpos = currentScrollPos;
    }
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
                <div @click="showVideo" class="cursor-class project-image">
                    <div class="container-for-image">
                        <img
                                style="-webkit-border-radius: 0;-moz-border-radius: 0;border-radius: 0;"
                                class="card-img-top card-image" :src="image_path" alt="Card image cap">
                        <div class="striped-background" @mouseover="scalePicture" @mouseleave="originalPicture"></div>
                        <div @mouseover="scalePicture" @mouseleave="originalPicture" class="center-image-text-small">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                </div>
                <div class="card-body project-title">
                    <h5 class=""><b class="project-title-font">{{ project_title }}</b></h5>
                </div>
                <div class="card-body body-text-class">
                    <i class="far fa-folder-open"></i>&nbsp
                    <a v-if="images_page_url" :href="images_page_url"
                       class="card-link">Animation
                        Stills</a>,
                    <a
                            style="margin-left:0px;" href="#"
                            class="card-link">Behind The Scenes
                    </a>
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

function genericCardPage() {
    Vue.component('card-post', {
        props: ['month', 'year', 'exhibition_title', 'thumbnail_image_path', 'individual_post_url'],
        data: function () {
            return {
                // Shortened version of which month it is. (i.e. January => Jan)
                monthShort: this.month.slice(0, 3)
            }
        },
        mounted: function () {
        },
        methods: {},
        // language=HTML
        template: `
            <a :href="individual_post_url">
                <div class="card exhibition-card">
                    <img
                            style="-webkit-border-radius: 0;-moz-border-radius: 0;border-radius: 0;"
                            class="card-img-top" :src="thumbnail_image_path" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="exhibition-title"><b>{{ exhibition_title }}</b></h5>
                    </div>
                    <div v-if="this.monthShort" class="exhibition-footer">
                        By <span class="color-orange">Tom Margett</span> <b>&middot;</b> <span
                            style="color: lightgrey">{{ this.monthShort }} {{ year }}</span>
                    </div>
                </div>
            </a>
        `
    });
    new Vue({
        el: '#app',
        data: function () {
            return {}
        },
        methods: {},
    })
}


function genericContentPage() {
    new Vue({
        el: '#app',
        mounted: function () {
            let imagesOnPage = document.getElementsByClassName('image-class');
            for (let i = 0; i < imagesOnPage.length; i++) {
                imagesOnPage[i].id = `image-${i}`;
                if (i === 0) {
                    imagesOnPage[i].setAttribute('data-prev_image_id', `image-${imagesOnPage.length - 1}`);
                    imagesOnPage[i].setAttribute('data-next_image_id', `image-${i + 1}`);
                } else if (i === imagesOnPage.length - 1) {
                    imagesOnPage[i].setAttribute('data-prev_image_id', `image-${i - 1}`);
                    imagesOnPage[i].setAttribute('data-next_image_id', `image-${0}`);
                } else {
                    imagesOnPage[i].setAttribute('data-prev_image_id', `image-${i - 1}`);
                    imagesOnPage[i].setAttribute('data-next_image_id', `image-${i + 1}`);
                }
            }

            let totalImageAmount = document.getElementById('total-image-num');
            totalImageAmount.innerText = `${imagesOnPage.length}`;
        },
        data: function () {
            return {}
        },
        methods: {
            showImage: function (event) {
                let imageViewer = document.getElementsByClassName('image-viewer')[0];
                let imageViewerItems = document.getElementsByClassName('image-viewer-package');

                // First show items
                for (let item of imageViewerItems) {
                    item.style.display = 'inline';
                }

                // Set the src for the image
                imageViewer.src = event.target.src;
                imageViewer.setAttribute('data-current_image_id', event.target.id);

                // Set which image is being currently viewed
                let currentImageNum = parseInt(event.target.id.replace(/[^\d.]/g, '')) + 1;
                let currentImageNumMarker = document.getElementById('current-image-num');
                currentImageNumMarker.innerText = `${currentImageNum}`;


                // // Prevent scrolling
                // let body = document.getElementsByTagName('body')[0];
                // body.classList.add('no-scroll-body');
                // let html = document.getElementsByTagName('html')[0];
                // html.classList.add('no-scroll-html');


            },
            closeButton: function () {
                let imageViewerItems = document.getElementsByClassName('image-viewer-package');
                for (let item of imageViewerItems) {
                    item.style.display = 'none';
                }
                let imageViewer = document.getElementsByClassName('image-viewer')[0];
                imageViewer.src = "";

                // // Allow scrolling
                // let body = document.getElementsByTagName('body')[0];
                // body.classList.remove('no-scroll-body');
                // let html = document.getElementsByTagName('html')[0];
                // html.classList.remove('no-scroll-html');
            },
            leftArrow: function () {
                let imageViewer = document.getElementsByClassName('image-viewer')[0];
                // Need current image to access it's attributes
                let currentImage = document.getElementById(imageViewer.getAttribute('data-current_image_id'));

                // Get previous image from current image attribute
                let prevImage = document.getElementById(currentImage.getAttribute('data-prev_image_id'));

                // Set the source
                imageViewer.src = prevImage.src;
                imageViewer.setAttribute('data-current_image_id', prevImage.id);

                // Set which image is being currently viewed
                let currentImageNum = parseInt(prevImage.id.replace(/[^\d.]/g, '')) + 1;
                let currentImageNumMarker = document.getElementById('current-image-num');
                currentImageNumMarker.innerText = `${currentImageNum}`;
            },
            rightArrow: function () {
                let imageViewer = document.getElementsByClassName('image-viewer')[0];
                // Need current image to access it's attributes
                let currentImage = document.getElementById(imageViewer.getAttribute('data-current_image_id'));

                // Get previous image from current image attribute
                let nextImage = document.getElementById(currentImage.getAttribute('data-next_image_id'));

                // Set the source
                imageViewer.src = nextImage.src;
                imageViewer.setAttribute('data-current_image_id', nextImage.id);
                // Set which image is being currently viewed
                let currentImageNum = parseInt(nextImage.id.replace(/[^\d.]/g, '')) + 1;
                let currentImageNumMarker = document.getElementById('current-image-num');
                currentImageNumMarker.innerText = `${currentImageNum}`;
            },
        }
    });

    // Add smooth scrolling to all links
    $("a").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            let hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: "400px"
            }, 800, function () {
            });
        } // End if
    });
}

function sketchbookPage() {

}

function footerFunction() {
    new Vue({
        el: '#footer-app',
        data: function () {
            return {}
        },
        mounted: function () {
            this.keepFooterAtBottom();
        },
        methods: {
            keepFooterAtBottom: function () {
                // Method to push the footer all the way to the bottom of the page
                let footer = document.getElementsByClassName('footer')[0];
                let footerPosition = footer.getBoundingClientRect();
                let body = document.getElementsByTagName('body')[0];
                let bodyPosition = body.getBoundingClientRect();
                footer.style.bottom = `-${bodyPosition.bottom - footerPosition.bottom}px`
            }
        }
    })
}

function teachingPage() {
    new Vue({
        el: '#app',
        data: function () {
            return {}
        },
        methods: {},
    })
}

function contagePage(){
    new Vue({
        el: '#app',
        data: function () {
            return {}
        },
        methods: {},
    })
}
