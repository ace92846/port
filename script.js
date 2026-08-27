"use strict";


/* =========================================
   ELEMENTS
========================================= */

const cursor =
    document.querySelector(".cursor-dot");

const moreButton =
    document.querySelector(".more-button");

const scrollButton =
    document.querySelector(".scroll");

const targetSection =
    document.querySelector("#more");

const background =
    document.querySelector(".background-effects");


/* =========================================
   DEVICE CHECK
========================================= */

const isTouchDevice =
    window.matchMedia(
        "(hover: none), (pointer: coarse)"
    ).matches;


/* =========================================
   CUSTOM CURSOR
========================================= */

if (cursor && !isTouchDevice) {

    let mouseX =
        window.innerWidth / 2;

    let mouseY =
        window.innerHeight / 2;

    let currentX =
        mouseX;

    let currentY =
        mouseY;

    let cursorFrame = null;


    document.addEventListener(
        "mousemove",
        (event) => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;

            if (!cursorFrame) {

                cursorFrame =
                    requestAnimationFrame(
                        updateCursor
                    );

            }

        },
        {
            passive: true
        }
    );


    function updateCursor() {

        currentX +=
            (mouseX - currentX) *
            0.3;

        currentY +=
            (mouseY - currentY) *
            0.3;

        cursor.style.transform =
            `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;


        const distance =
            Math.abs(mouseX - currentX) +
            Math.abs(mouseY - currentY);


        if (distance > 0.1) {

            cursorFrame =
                requestAnimationFrame(
                    updateCursor
                );

        } else {

            cursorFrame = null;

        }

    }

}


/* =========================================
   MORE BUTTON LIGHT
========================================= */

if (moreButton && !isTouchDevice) {

    let buttonFrame = null;

    let buttonX = 50;
    let buttonY = 50;


    moreButton.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                moreButton.getBoundingClientRect();

            buttonX =
                event.clientX -
                rect.left;

            buttonY =
                event.clientY -
                rect.top;


            if (!buttonFrame) {

                buttonFrame =
                    requestAnimationFrame(
                        updateButtonLight
                    );

            }

        },
        {
            passive: true
        }
    );


    function updateButtonLight() {

        moreButton.style.setProperty(
            "--mouse-x",
            `${buttonX}px`
        );

        moreButton.style.setProperty(
            "--mouse-y",
            `${buttonY}px`
        );

        buttonFrame = null;

    }


    moreButton.addEventListener(
        "mouseleave",
        () => {

            moreButton.style.setProperty(
                "--mouse-x",
                "50%"
            );

            moreButton.style.setProperty(
                "--mouse-y",
                "50%"
            );

        }
    );

}


/* =========================================
   SMOOTH SECTION SCROLL
========================================= */

function scrollToMore(event) {

    if (!targetSection) {
        return;
    }

    event.preventDefault();

    targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


if (moreButton) {

    moreButton.addEventListener(
        "click",
        scrollToMore
    );

}


if (scrollButton) {

    scrollButton.addEventListener(
        "click",
        scrollToMore
    );

}


/* =========================================
   BACKGROUND FADE
========================================= */

if (background) {

    let scrollFrame = null;


    function updateBackground() {

        const scrollAmount =
            window.scrollY;

        const viewportHeight =
            window.innerHeight || 1;

        const fade =
            Math.max(
                0.15,
                1 -
                scrollAmount /
                viewportHeight
            );

        background.style.opacity =
            fade;

        scrollFrame = null;

    }


    window.addEventListener(
        "scroll",
        () => {

            if (!scrollFrame) {

                scrollFrame =
                    requestAnimationFrame(
                        updateBackground
                    );

            }

        },
        {
            passive: true
        }
    );

}