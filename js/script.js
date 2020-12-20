/* 
   This function takes two parameters, the first being the data 
   and the second being the page number. The function loops through the data, depending on the page number it grabs
   certain people and creates user cards for them within the HTML 
*/

function showPage(list, page) {
   startIndex = (page * 9) - 9;
   endIndex = page * 9;

   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';

   for(let i = startIndex; i < endIndex; i++) {
      if (i >= startIndex && i <= endIndex) {
         try {
            let listItem = document.createElement("LI");
            listItem.className = "student-item cf";
            listItem.innerHTML = `<div class="student-details">
                                    <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
                                    <h3>${list[i].name.first} ${list[i].name.last}</h3>
                                    <span class="email">${list[i].email}</span>
                                 </div>
                                 <div class="joined-details">
                                    <span class="date">Joined ${list[i].registered.date}</span>
                                 </div>`;
            studentList.appendChild(listItem);
         }
         catch {
            /* 
               This try-catch block is for the last page, since the if statement has the loop run 9 times,
               this catches the errors if the loop does not run 9 times 
            */
         }
      }
   }
}

/* 
    This function takes one parameter which is the data, with only being 9 
    people per page, it creates the appropriate number of buttons. This function also uses
    an event listener to set the selected button to active, show the appropriate data
    and the other buttons to a rest state
*/

function addPagination(list) {
   let pages = list.length / 9;
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';

   for (let i = 0; i < pages; i++) {
      let li = document.createElement("LI");
      li.innerHTML = `<button type="button">${i + 1}</button>`
      linkList.appendChild(li);
   }
   
   linkList.firstElementChild.firstElementChild.className = 'active'; // Sets the first page button to active by default
   const listItems = document.querySelectorAll('.link-list li');

   linkList.addEventListener('click', function(event) {
      
      if (event.target.tagName == "UL" || event.target.tagName == "LI") {
         // This fixes the bug that changes the page if the user clicks in between the buttons
      } else if (event.target.tagName == "BUTTON") {
         for (let i = 0; i < listItems.length; i++) {
            listItems[i].firstElementChild.className = '';
         }
         event.target.className = 'active';
         showPage(list, event.target.textContent);
      }
   });
}

/* 
    This function creates the search bar using JavaScript and then takes the input in the search bar 
    and filters through the data to create new data for showPage and addPagination functions above.
    this data dynamically changes the content and page buttons in real time
*/

function searchBar() {
   // Create search bar using JS
   const header = document.querySelector('.header');
   const label = document.createElement("LABEL");
   header.appendChild(label);
   label.className = 'student-search';
   label.setAttribute("for", "search");
   label.innerHTML = `<input id="search" placeholder="Search by name...">
   <button type="button" id="searchButton"><img src="img/icn-search.svg" alt="Search icon"></button>`;
   
   const searchBar = document.querySelector('#search');
   const searchButton = document.querySelector('#searchButton')
   
   // Search bar functionality for keyup
   searchBar.addEventListener('keyup', function() {
      let newData = [];
      for (let i = 0; i < data.length; i++) {
         if (data[i].name.first.toLowerCase().includes(searchBar.value.toLowerCase()) || data[i].name.last.toLowerCase().includes(searchBar.value.toLowerCase())) {
            newData.push(data[i]);
         }
      }
      if (newData.length == 0) {
         document.querySelector('.student-list').innerHTML = '<h1 style="font-weight: bold;">No Matches Found</h1>';
         document.querySelector('.link-list').innerHTML = '';
      } else {
         addPagination(newData);
         showPage(newData, 1);
      }
   });
}


// Call functions
showPage(data, 1);
addPagination(data);
searchBar();
