// ==UserScript==
// @name         Text to QR Code
// @namespace    https://github.com/mingchau/MyUserScripts
// @version      0.1
// @description  Display a QR code of the selected text when pressing Ctrl+Shift+Q
// @author       mingchau
// @match        *://*/*
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @require      https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js
// @require      https://cdn.jsdelivr.net/gh/KeeeX/qrcodejs@master/qrcode.min.js
// @downloadURL  https://raw.githubusercontent.com/mingchau/MyUserScripts/main/TextToQrCode.user.js
// @updateURL    https://raw.githubusercontent.com/mingchau/MyUserScripts/main/TextToQrCode.user.js
// ==/UserScript==

(function() {
    'use strict';

    const MAX_LENGTH = 200;  // 最大文本长度

    // Add styles for the QR code container
    GM_addStyle(`
        #qr-code-container {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 9999;
            background: white;
            padding: 10px;
            border: 1px solid #ccc;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        #qr-code-container button {
            display: block;
            margin: 10px auto 0;
        }
    `);

    // Function to create and show the QR code
    function showQRCode(text) {
        const container = $('<div id="qr-code-container"></div>');
        const qrCode = $('<div id="qr-code"></div>');
        const closeButton = $('<button>Close</button>');

        closeButton.on('click', () => container.remove());

        container.append(qrCode).append(closeButton);
        $('body').append(container);

        new QRCode(document.getElementById("qr-code"), {
            text: text,
            width: 250,
            height: 250,
            correctLevel: QRCode.CorrectLevel.L
        });
    }

    // Listen for the keydown event to detect Ctrl+Shift+Q
    $(document).on('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'Q') {
            const selectedText = window.getSelection().toString();
            if (selectedText) {
                if (selectedText.length > MAX_LENGTH) {
                    alert(`Selected text is too long (${selectedText.length} characters). Maximum allowed is ${MAX_LENGTH} characters.`);
                } else {
                    showQRCode(selectedText);
                }
            } else {
                alert('Please select some text first.');
            }
        }
    });
})();
