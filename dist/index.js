metadata={systemName:"SnatchBot_ChatBot",displayName:"SnatchBot ChatBot",description:"SnatchBot ChatBot",configuration:{BotURL:{displayName:"Bot URL",type:"string",value:"https://account.snatchbot.me/channels/api/api/id138553/app1/aps9725afca-a9f2-439c-80be-80f6b22cb4d2"}}},ondescribe=async function({}){postSchema({objects:{message:{displayName:"Message",description:"Represent a text reply",properties:{inputText:{displayName:"Input Text",type:"string"},outputText:{displayName:"Output Text",type:"string"},userID:{displayName:"User ID",type:"string"}},methods:{postText:{displayName:"Post Text",type:"execute",inputs:["inputText","userID"],outputs:["outputText"]},startChat:{displayName:"Start Chat",type:"execute",inputs:[],outputs:["userID","outputText"]},restartChat:{displayName:"Restart Chat",type:"execute",inputs:[],outputs:["userID","outputText"]}}}}})},onexecute=async function({objectName:t,methodName:e,parameters:s,properties:a,configuration:r}){switch(t){case"message":await async function(t,e,s){switch(t){case"postText":await function(t,e){return new Promise((s,a)=>{var r={message:t.inputText.toString()},n=`${e.BotURL}?user_id=${t.userID}`,o=new XMLHttpRequest;o.onreadystatechange=function(){try{if(4!==o.readyState)return;if(200!==o.status)throw new Error("Failed with status "+o.status);var t=JSON.parse(o.responseText);postResult({outputText:t.message}),s()}catch(t){a()}},o.open("POST",n),o.send(JSON.stringify(r))})}(e,s);break;case"startChat":case"restartChat":await function(t,e){return new Promise((t,s)=>{var a={message:""},r="guest_"+Date.now(),n=`${e.BotURL}?user_id=${r}`,o=new XMLHttpRequest;o.onreadystatechange=function(){try{if(4!==o.readyState)return;if(200!==o.status)throw new Error("Failed with status "+o.status);var e=JSON.parse(o.responseText);postResult({outputText:e.message,userID:r}),t()}catch(t){s()}},o.open("POST",n),o.send(JSON.stringify(a))})}(0,s);break;default:throw new Error("The method "+t+" is not supported.")}}(e,a,r);break;default:throw new Error("The object "+t+" is not supported.")}};
//# sourceMappingURL=index.js.map