
function getLoginFields() {

    var inputs = document.getElementsByTagName('input');
    len = inputs.length;
    var keyPresses = 0;
    var keepGoing = true;

    console.log(len);

    window.addEventListener('keydown', function (event) {

        console.log(event)
        keyPresses++;

        if(len > 0 && keyPresses > 5 && keepGoing) {
            chrome.runtime.sendMessage(
                "sending message",
                function (response) {
                }
            );

            keepGoing = false;
        }

    });

    

}

getLoginFields();


