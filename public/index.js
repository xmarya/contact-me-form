import $ks45x$splittype from "split-type";
import {animate as $ks45x$animate, stagger as $ks45x$stagger, timeline as $ks45x$timeline, inView as $ks45x$inView} from "motion";

const $0c4c9bfce840fccf$export$d852f5f778460fa4 = async (url, emailData)=>{
    try {
        const request = fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(emailData)
        });
        const response = await request;
        // Check if the response is not OK (status code outside the range 200-299)
        if (!response.ok) {
            const errorData = await response.json(); // Assuming the error response is in JSON format
            throw Error(errorData.message || "Something went wrong");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        if (error.message === "Failed to fetch") error.message = `Unable to reach the server. Please check your internet connection...`;
        throw error;
    }
};


const $e8f4d263c124460a$var$formBtn = document.querySelector(".form-btn");
let $e8f4d263c124460a$var$refresh;
const $e8f4d263c124460a$var$hideAlert = ()=>{
    const element = document.querySelector(".alert");
    if (element) element.parentElement.removeChild(element);
    $e8f4d263c124460a$var$formBtn.classList.remove("form-btn--rounded"); // remove it at the same time of hiding the alert
    if ($e8f4d263c124460a$var$refresh) setTimeout(()=>location.assign("/"), 500);
};
const $e8f4d263c124460a$export$5ea928c9faf85bd3 = (type, msg)=>{
    const htmlCode = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", htmlCode);
    type === "success" ? $e8f4d263c124460a$var$refresh = true : $e8f4d263c124460a$var$refresh = false;
    window.setTimeout($e8f4d263c124460a$var$hideAlert, 4000);
};


const $d4358a6e869fb575$var$formBtn = document.querySelector(".form-btn");
const $d4358a6e869fb575$export$1cea2e25b75a88f2 = async (data)=>{
    try {
        const result = await (0, $0c4c9bfce840fccf$export$d852f5f778460fa4)("/sendEmail", data);
        if (result.status === "success") {
            $d4358a6e869fb575$var$formBtn.classList.add("form-btn--rounded");
            $d4358a6e869fb575$var$formBtn.textContent = "\u2714";
            (0, $e8f4d263c124460a$export$5ea928c9faf85bd3)("success", "Your email has been sent successfully! \uD83D\uDC4D");
        }
        if (result.status !== "success") return;
    } catch (error) {
        (0, $e8f4d263c124460a$export$5ea928c9faf85bd3)("error", error.message);
    }
};



const $9c4ba7b33b93e42f$var$emailRegex = new RegExp(/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/);
const $9c4ba7b33b93e42f$var$formInputs = [
    document.querySelector(".email-form input"),
    document.querySelector(".email-form textarea")
];
let $9c4ba7b33b93e42f$var$formStatus = {
    formComplete: {
        status: false,
        message: "Please Fill out all the Fields before Submitting"
    },
    emailFormatIsCorrect: {
        status: false,
        message: "Please Insert a valid Email address!"
    }
};
const $9c4ba7b33b93e42f$var$shakingField = function(field) {
    field.classList.add("shaking");
    setTimeout(()=>{
        field.classList.remove("shaking");
    }, 400);
};
const $9c4ba7b33b93e42f$export$18148d12c805c5b0 = function(event) {
    $9c4ba7b33b93e42f$var$formStatus.emailFormatIsCorrect.status = true;
    const userInput = event.target.value;
    if (userInput !== "" && !$9c4ba7b33b93e42f$var$emailRegex.test(userInput) || !$9c4ba7b33b93e42f$var$emailRegex.test(userInput)) {
        $9c4ba7b33b93e42f$var$shakingField(event.target);
        (0, $e8f4d263c124460a$export$5ea928c9faf85bd3)("error", $9c4ba7b33b93e42f$var$formStatus.emailFormatIsCorrect.message);
        $9c4ba7b33b93e42f$var$formStatus.emailFormatIsCorrect.status = false;
    }
};
const $9c4ba7b33b93e42f$export$ed692cabb252e59b = ()=>{
    $9c4ba7b33b93e42f$var$formStatus.formComplete.status = true;
    $9c4ba7b33b93e42f$var$formInputs.forEach((input)=>{
        if (input.value.trim() === "") $9c4ba7b33b93e42f$var$formStatus.formComplete.status = false;
    });
    return $9c4ba7b33b93e42f$var$formStatus;
};





const $424df678b0b26b08$var$ctaArrow = document.querySelector(".cta-arrow");
const $424df678b0b26b08$var$ctaBtn = document.querySelector(".cta-btn");
const $424df678b0b26b08$var$headingsub = new (0, $ks45x$splittype)("#sub-heading", {
    types: "lines"
});
const $424df678b0b26b08$var$headingMain = new (0, $ks45x$splittype)("#main-heading", {
    types: "words"
});
// const mq = window.matchMedia("(max-height: 58.25em)");
const $424df678b0b26b08$var$headingAnimation = [
    ...$424df678b0b26b08$var$headingsub.lines,
    ...$424df678b0b26b08$var$headingMain.words
];
const $424df678b0b26b08$var$ctaAnimation = [
    [
        $424df678b0b26b08$var$ctaArrow,
        {
            x: [
                24,
                0
            ],
            transform: [
                "rotate(54deg)",
                "rotate(-9deg)"
            ],
            opacity: [
                0,
                1
            ]
        }
    ],
    [
        $424df678b0b26b08$var$ctaBtn,
        {
            y: [
                24,
                0
            ],
            opacity: [
                0,
                1
            ]
        }
    ]
];
const $424df678b0b26b08$export$592dbd515a49cf1b = ()=>{
    (0, $ks45x$animate)($424df678b0b26b08$var$headingAnimation, {
        y: [
            24,
            0
        ],
        opacity: [
            0,
            1
        ]
    }, {
        duration: [
            1
        ],
        delay: (0, $ks45x$stagger)(0.08)
    });
    (0, $ks45x$timeline)($424df678b0b26b08$var$ctaAnimation, {
        duration: [
            0.8
        ],
        delay: [
            1.7
        ]
    });
    (0, $ks45x$inView)(".section", (sections)=>{
        (0, $ks45x$animate)(sections.target, {
            y: [
                60,
                0
            ],
            opacity: [
                0,
                1
            ]
        }, {
            duration: 1,
            delay: 1
        });
    });
};


const $0f63c4d2a286444e$var$offsetCalculation = ()=>{
    const heading = document.querySelector(".main-heading");
    const ctaContainer = document.querySelector(".header--cta-container");
    const headingHeight = heading.offsetHeight;
    const headingWidth = heading.offsetWidth;
    console.log(headingWidth);
    ctaContainer.style.top = `${headingHeight * 0.95}px`;
// ctaContainer.style.right = `${-(headingWidth * 0.25)}px`;
};
[
    "DOMContentLoaded",
    "resize",
    "load"
].forEach((event)=>{
    window.addEventListener(event, ()=>{
        $0f63c4d2a286444e$var$offsetCalculation();
    });
});
window.addEventListener("DOMContentLoaded", (event)=>{
    event.preventDefault();
    (0, $424df678b0b26b08$export$592dbd515a49cf1b)();
});
const $0f63c4d2a286444e$var$formBtn = document.querySelector(".form-btn");
const $0f63c4d2a286444e$var$form = document.querySelector(".email-form");
const $0f63c4d2a286444e$var$formInput = document.querySelector(".email-form input");
const $0f63c4d2a286444e$var$formTextarea = document.querySelector(".email-form textarea");
$0f63c4d2a286444e$var$formInput.addEventListener("blur", (0, $9c4ba7b33b93e42f$export$18148d12c805c5b0));
$0f63c4d2a286444e$var$form.addEventListener("submit", (event)=>{
    event.preventDefault();
    const clientEmail = $0f63c4d2a286444e$var$formInput.value;
    const projectDetail = $0f63c4d2a286444e$var$formTextarea.value;
    const formStatus = (0, $9c4ba7b33b93e42f$export$ed692cabb252e59b)(); //returns an object
    if (!formStatus.formComplete.status) (0, $e8f4d263c124460a$export$5ea928c9faf85bd3)("error", formStatus.formComplete.message);
    else {
        $0f63c4d2a286444e$var$formBtn.textContent = "sending...";
        (0, $d4358a6e869fb575$export$1cea2e25b75a88f2)({
            clientEmail: clientEmail,
            projectDetail: projectDetail
        });
        $0f63c4d2a286444e$var$form.reset();
    }
});


//# sourceMappingURL=index.js.map
