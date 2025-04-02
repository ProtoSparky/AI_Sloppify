console.info("Sloppify_enabled");
// Get all divs
let divs = document.querySelectorAll("div");
var divNotFound = true;
for (let div of divs) {
    if (div.textContent.trim() === "People also ask" && divNotFound) {
        divNotFound = false;
        /*
        console.log("Found div:", div);
        // Navigate up the tree
        let parent = div.parentElement; // Direct parent
        console.log("Parent:", parent);
        console.log(parent.children);*/

        //selected element
        const childrenElements = parent.children[1].children;
        for(let childrenPointer = 0; childrenPointer < childrenElements.length -2; childrenPointer ++){
            const selectElement = childrenElements[childrenPointer]; 
            function handler(){
                const searchForChild = selectElement.children[0].children[0].children[0].children;
                const searchForChildHeader = searchForChild[1].children[0].children[0].children[0].children[0].innerHTML;
                const searchForChildContent = searchForChild[2].children[0].children[0].children[0].children[0].children[0].children[0];
                
                CallAI(searchForChildHeader,"element"+childrenPointer);
                const str_element = document.createElement("span");
                str_element.style.backgroundColor = "#34457f";
                str_element.style.color = "white";
                str_element.id = "element"+childrenPointer;
                str_element.style.fontWeight = "500";
                str_element.innerHTML = "AI Generating Response...";
                searchForChildContent.appendChild(str_element);
                console.log(searchForChildContent);
                selectElement.removeEventListener("click",handler);
            }
            selectElement.addEventListener("click",handler);
        }
    }
}

function initialPopulate(selectElement){
    const searchForChild = selectElement.children[0].children[0].children[0].children;
    const searchForChildHeader = searchForChild[1].children[0].children[0].children[0].children[0].innerHTML;
    const searchForChildContent = searchForChild[2].children[0].children[0].children[0].children[0].children[0].children[0];
    //Close your eyes and ignore the abomination above.
    
    CallAI(searchForChildHeader,"element"+childrenPointer);
    const str_element = document.createElement("span");
    str_element.style.backgroundColor = "#34457f";
    str_element.style.color = "white";
    str_element.id = "element"+childrenPointer;
    str_element.style.fontWeight = "500";
    str_element.innerHTML = "AI Generating Response";
    searchForChildContent.appendChild(str_element);
    console.log(searchForChildContent);
}


function CallAI(prompt, elementid){
    console.info("Calling ai with prompt '" + prompt + " '");
    const promptReq = {
        "model": "llama3:8b",
        "messages": [
            {
                "role": "system",
                "content": 'You are an unhelpful AI summarization assistant. The user will ask you a query, and you will pretend like you found some helpful information from an online user. This info, related to the user\'s query will HAVE be rude and weird. Your answer HAS to be rude and slightly sexual. Your formatting will follow this rule: It has to start with "One reddit user says: ", followed by your answer. Your answer cannot mention the user\'s query. Keep the under 15 words'
            },            
            {
                "role": "user",
                "content": prompt
            }
        ],
        "stream": false
    };

    fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(promptReq)
      })
      .then(response => response.json())
      .then(data => PopulateQuery(data,elementid))
      .catch(error => console.error("Error:", error));
}
function PopulateQuery(data,elementid){
    console.log(data);
    document.getElementById(elementid).innerHTML = data.message.content + " ";
}
