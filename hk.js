const loginLink = 'https://www.hackerrank.com/auth/login';
const puppeteer = require('puppeteer');

const codeFile = require('./code');

console.log('Before');

let email = 'lovivol493@spruzme.com';
let password = 'aniketak47';

let page;

let browserWillLaunchPromise = puppeteer.launch({
    headless:false,
    args:['--start-maximized'],
    defaultViewport:null
});

browserWillLaunchPromise.then(function(browserInstance){
    let newTabPromise = browserInstance.newPage();
    return newTabPromise;
}).then(function(newTab){
    page = newTab;
    let hackerrankPromise = newTab.goto(loginLink);
    return hackerrankPromise;
}).then(function(){
    let emailWillbeEnteredPromise = page.type("input[id='input-1']", email, {delay:150});
    return emailWillbeEnteredPromise;
}).then(function(){
    let passwordWillbeEnteredPromises = page.type("input[id='input-2']", password, {delay:150});
    return passwordWillbeEnteredPromises;
}).then(function(){
    let loginButtonClickPromise = page.click('button[data-analytics="LoginPassword"]', {delay:80});
    return loginButtonClickPromise;
}).then(function(){
    let algoSecClickedPromise = waitAndClick('a[data-attr1="algorithms"]', page);
    return algoSecClickedPromise;
}).then(function(){
    let warmUpSectionClickedPromise = waitAndClick('input[value="warmup"]' , page)
    return warmUpSectionClickedPromise; 
}).then(function(){
    let allQuestionsArrPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled');
    return allQuestionsArrPromise;
}).then(function(totalQuestions){
    console.log('Number of Questions -> '+totalQuestions.length);
    let questionWillBeSolved = questionSolver(page, totalQuestions[0], codeFile.answers[0]);
    return questionWillBeSolved;
});



function waitAndClick(selector , cPage){
    return new Promise(function(resolve, reject){
        let waitForModalPromise = cPage.waitForSelector(selector);
        waitForModalPromise.then(function(){
            let clickModal = cPage.click(selector, {delay : 100});
            return clickModal;
        }).then(function(){
            resolve();
        }).catch(function(){
            reject();
        });
    });
}


function questionSolver(page, question, answer){
    return new Promise(function(resolve, reject){
        let questionWillBeClickedPromise = question.click();
        questionWillBeClickedPromise.then(function(){
            let waitForEditor = waitAndClick('.monaco-editor.no-user-select.vs', page);
            return waitForEditor;
        }).then(function(){
            let customInputClicked = waitAndClick('.checkbox-input', page);
            return customInputClicked;
        }).then(function(){
            return waitAndClick('.input.text-area.custominput.auto-width', page)
        }).then(function(){
            return page.type('.input.text-area.custominput.auto-width', answer, {delay : 20});
        }).then(function(){
            let ctrlIsPressedPromise = page.keyboard.down("Control");
            return ctrlIsPressedPromise;
        }).then(function(){
            let AisPressedPromise = page.keyboard.press("A", {delay : 100});
            return AisPressedPromise;
        }).then(function(){
            let XisPressedPromise = page.keyboard.press("X", {delay : 100});
            return XisPressedPromise;
        }).then(function(){
            let ctrlIsReleasedPromise = page.keyboard.up("Control");
            return ctrlIsReleasedPromise;
        }).then(function(){
            let waitForCodeAreaPromise = waitAndClick('.monaco-editor.no-user-select.vs', page);
            return waitForCodeAreaPromise;
        }).then(function(){
            let ctrlIsPressedPromise = page.keyboard.down("Control");
            return ctrlIsPressedPromise;
        }).then(function(){
            let AisPressedPromise = page.keyboard.press("A", {delay : 100});
            return AisPressedPromise;
        }).then(function(){
            let VisPressedPromise = page.keyboard.press("V", {delay : 100});
            return VisPressedPromise;
        }).then(function(){
            let ctrlIsReleasedPromise = page.keyboard.up("Control");
            return ctrlIsReleasedPromise;
        }).then(function(){
            let runButtonClicked = page.click('.hr-monaco__run-code', {delay : 50});
            return runButtonClicked;
        }).then(function(){
            resolve();
        }).catch(function(err){
            console.log(err);
        })
    });
}


// for submit button --> .hr-monaco-submit
// .then(function(){
//     let runButtonClicked = page.click('.hr-monaco__run-code', {delay : 50});
//     return runButtonClicked;
// })


console.log('After');





