import '@k2oss/k2-broker-core';

metadata = {
    systemName: "SnatchBot_ChatBot",
    displayName: "SnatchBot ChatBot",
    description: "SnatchBot ChatBot",
    configuration: {}
};

ondescribe = async function ({ }): Promise<void> {
    postSchema({
        objects: {
            "message": {
                displayName: "Message",
                description: "Represent a text reply",
                properties: {
                    "botURL": {
                        displayName: "Bot URL",
                        type: "string"
                    },
                    "inputText": {
                        displayName: "Input Text",
                        type: "string"
                    },
                    "outputText": {
                        displayName: "Output Text",
                        type: "string"
                    },
                    "userID": {
                        displayName: "User ID",
                        type: "string"
                    }
                },
                methods: {
                    "postText": {
                        displayName: "Post Text",
                        type: "execute",
                        inputs: ["botURL", "inputText", "userID"],
                        outputs: ["outputText"]
                    },
                    "startChat": {
                        displayName: "Start Chat",
                        type: "execute",
                        inputs: ["botURL"],
                        outputs: ["userID", "outputText"]
                    },
                    "restartChat": {
                        displayName: "Restart Chat",
                        type: "execute",
                        inputs: ["botURL"],
                        outputs: ["userID", "outputText"]
                    }
                }
            }
        }
    });
}

onexecute = async function ({ objectName, methodName, parameters, properties, configuration }): Promise<void> {
    switch (objectName) {
        case "message": await onexecuteMessage(methodName, properties, configuration); break;
        default: throw new Error("The object " + objectName + " is not supported.");
    }
}

async function onexecuteMessage(methodName: string, properties: SingleRecord, configuration: SingleRecord): Promise<void> {
    switch (methodName) {
        case "postText": await onexecutePostText(properties, configuration); break;
        case "startChat":
        case "restartChat":
            await onexecuteStartChat(properties, configuration); break;
        default: throw new Error("The method " + methodName + " is not supported.");
    }
}

function onexecutePostText(properties: SingleRecord, configuration: SingleRecord): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        var body = {
            'message': properties["inputText"].toString()
        };

        var postURL = `${properties["botURL"]}?user_id=${properties["userID"]}`;

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            try {
                if (xhr.readyState !== 4) return;
                if (xhr.status !== 200) throw new Error("Failed with status " + xhr.status);

                var obj = JSON.parse(xhr.responseText);
                postResult({
                    "outputText": obj.messages[0].message,
                });
                resolve();
            } catch (e) {
                reject()
            }
        };

        xhr.open("POST", postURL);

        xhr.send(JSON.stringify(body));
    });

}

function onexecuteStartChat(properties: SingleRecord, configuration: SingleRecord): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        var body = {
            'message': ''
        };

        var userID = `guest_${Date.now()}`;

        var postURL = `${properties["botURL"]}?user_id=${userID}`;

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            try {
                if (xhr.readyState !== 4) return;
                if (xhr.status !== 200) throw new Error("Failed with status " + xhr.status);

                var obj = JSON.parse(xhr.responseText);
                postResult({
                    "outputText": obj.messages[0].message.toString(),
                    "userID": userID
                });
                resolve();
            } catch (e) {
                reject()
            }
        };

        xhr.open("POST", postURL);

        xhr.send(JSON.stringify(body));
    });
}