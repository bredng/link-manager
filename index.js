// Create an empty array to hold all saved links
let myLeads = []

// Retrieve elements
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const delBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

// Retrieve links that have already been saved in array form (parse converts string -> array)
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

// If there are links already saved, render them to the user
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderLeads(myLeads)
}

// Obtain URL of current tab and add to saved links upon tab button click
tabBtn.addEventListener("click", function() {
    // Obtain browser tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url) // Obtain the URL of the current tab
        localStorage.setItem("myLeads", JSON.stringify(myLeads)) // Store the updated list of links in localStorage as a string so that it can be retrieved across sessions
        renderLeads(myLeads) // Render updated list of saved links to user
    })
})

// Delete all currently saved links upon delete button double click
delBtn.addEventListener("dblclick", function() {
    localStorage.clear() // Clear localStorage of saved links
    myLeads = [] // Clear saved links
    renderLeads(myLeads) // Render the empty list of links to user
})

// Add entered link into the array and render to the user upon input button click
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value) // Append the link to the array of links
    inputEl.value = "" // Clear the input bar
    localStorage.setItem("myLeads", JSON.stringify(myLeads)) // Store the updated list of links in localStorage as a string
    renderLeads(myLeads) // Render saved links to user
})

// Updates the list of saved links
function renderLeads(leads) {
    let listItems = ""
    for (let i=0; i < leads.length; i++) {
        // Template string allows use of HTML to show links saved to the user
        listItems += `
            <li>
                <a target="_blank" href="${leads[i]}">
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}