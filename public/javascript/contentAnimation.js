import SplitType from "split-type";
import { animate, stagger, timeline, inView} from "motion";

const ctaArrow = document.querySelector(".cta-arrow");
const ctaBtn = document.querySelector(".cta-btn");

const headingsub = new SplitType("#sub-heading", {types: "lines"});
const headingMain = new SplitType("#main-heading", {types: "words"});

const headingAnimation = [...headingsub.lines, ...headingMain.words];
const ctaAnimation = [
    [ctaArrow,{ x: [24, 0], transform: ["rotate(54deg)", "rotate(-9deg)"] ,opacity: [0, 1]}, ],
    [ctaBtn, {y: [24, 0], opacity: [0, 1]}]
];
export const startAnimation = () => {
    animate(headingAnimation, {y: [24, 0], opacity: [0, 1]}, {duration:[1], delay: stagger(0.08)});
    timeline(ctaAnimation, {duration:[0.8], delay: [1.7]});

    inView(".section", (sections)=> {
        animate(sections.target, {y: [60, 0], opacity: [0, 1]}, {duration:1, delay: 1});
    });
}