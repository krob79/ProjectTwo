/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

const maxStudentsPerPage = 10;
const allStudents = [];
const students_liElements = document.getElementsByClassName('student-item cf');
const studentNames = document.getElementsByTagName('h3');//studentNames[0].textContent
const studentAvatars = document.getElementsByClassName('avatar'); //studentAvatars[0].src
const studentEmails = document.getElementsByClassName('email');//studentEmails[0].textContent
const studentJoinDates = document.getElementsByClassName('date');//studentJoinDates[0].textContent
let pageIndexes = [];
let pagesNeeded = 0;

const header = document.getElementsByClassName('page-header cf')[0];
const searchBar = document.createElement('input');
searchBar.addEventListener("onkeydown", filterList);
searchBar.className = "student-search";
const searchButton = document.createElement('button');
searchButton.textContent = "Search";
searchButton.className = "student-search";
searchButton.addEventListener("click", filterList);

header.appendChild(searchButton);
header.appendChild(searchBar);


//store all student data into an array of student objects
for(let i = 0; i < students_liElements.length; i++){
    let student = {
        name: studentNames[i].textContent,
        avatar: studentAvatars[i].src,
        email: studentEmails[i].textContent,
        joinDate: studentJoinDates[i].textContent,
        listItem: students_liElements[i],
        hide: () => {students_liElements[i].style.display = 'none';},
        show: () => {students_liElements[i].style.display = 'block';}
    }
    allStudents.push(student);
}

//console.log("---students: " + allStudents[0].name);
//console.log("---students: " + allStudents[0].avatar);
//console.log("---students: " + allStudents[0].email);
//console.log("---students: " + allStudents[0].joinDate);

function organizePages(studentList, maxPerPage){
    let length = studentList.length;
    pagesNeeded = Math.ceil(length / maxPerPage);
    appendPageLinks(maxPerPage);
}
organizePages(allStudents, maxStudentsPerPage);

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/
function showPage(students, page){
    //show only students from the array passed in
    for(let i = 0; i < students.length; i++){
        if(students.indexOf(students[i]) >= pageIndexes[page] && students.indexOf(students[i]) < (pageIndexes[page]+maxStudentsPerPage)){
            students[i].show();
        }else{
            students[i].hide();
        }
    }
    //highlight the button that corresponds with the page you're on
    let linkList = document.querySelector('.pagination');
    let links = linkList.querySelectorAll('li > a');
    for(let i = 0; i < links.length; i++){
        if(i == page){
            links[i].style.border = "1px solid firebrick";
        }else{
            links[i].style.border = "1px solid #eaeaea";
        }
    }
    console.log("---LINKS: " + links.length);
}

function filterList(){
    console.log("FILTERING for " + searchBar.value + " length: " + searchBar.value.length);
    let students = allStudents;
    let query = searchBar.value;
    for(let i = 0; i < students.length; i++){
        if(students[i].name.startsWith(searchBar.value)){
            students[i].show();
        }else{
            students[i].hide();
        }
    }
}

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
function appendPageLinks(maxPerPage){
    //add page links after the page div's <ul> element
    //create the unordered list for the links
    let pageLinks = document.createElement('ul');
    pageLinks.className = 'pagination';
    let pageIndex = 0;
    for(let i=0; i < pagesNeeded; i++){
        //add current index to the pageIndexes array, then increment by max 
        pageIndexes.push(pageIndex);
        pageIndex += maxPerPage;
        let pageLink = document.createElement('li');
        pageLink.innerHTML = `<a>Page ${i+1}</a>`;
        pageLink.addEventListener("click", (e) =>{console.log("click " + i); showPage(allStudents, i);});
        pageLinks.appendChild(pageLink);
    }
    document.getElementsByClassName('student-list')[0].appendChild(pageLinks);
}

showPage(allStudents, 0)