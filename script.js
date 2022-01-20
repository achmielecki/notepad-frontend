let noteArea = null;
let stompClient = null;
let code = null;
const uid = fourDigitNumber();

window.onload = async function () {
    noteArea = document.getElementsByTagName("textarea")[0];
    init();
    connectToSocket();
    noteArea.oninput = function () {
        sendMessage();
    }
};

async function init() {
    if (retrieveCode() == null) {
        await initNote();
    }
    code = retrieveCode();
    document.getElementById("noteCode").value = code;
    await getFromBackend();
}

function retrieveCode() {
    const url = new URL(window.location.href);
    let code = url.searchParams.get("code");
    if (code == null || code === "") {
        code = localStorage.getItem('code');
    }
    return code;
}

async function getFromBackend() {
    let response = await fetch(getBackendUrl() + "/" + code, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    });
    const note = response.json()
    if (note.content !== undefined) {
        noteArea.value = note.content;
    }
}

async function initNote() {
    let response = await fetch(getBackendUrl(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    });
    const note = await response.json()
    localStorage.setItem('code', note.code)
}

function connectToSocket() {
    const socket = new SockJS(getSocketBackendUrl() + '/note/websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function () {
        stompClient.subscribe('/notes', function (messageOutput) {
            receiveMessage(JSON.parse(messageOutput.body));
        });
    });
}

function sendMessage() {
    stompClient.send("/app/note", {},
        JSON.stringify({'uid': uid, 'code': code, 'content': noteArea.value}));
}

function receiveMessage(messageOutput) {
    if (messageOutput.uid !== uid) {
        noteArea.value = messageOutput.content
    }
}

function fourDigitNumber() {
    return Math.floor(Math.random() * 10000).toString();
}
