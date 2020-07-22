/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//limits results to display per page
let maxStudentsPerPage = 10;
//array that stores student objects
const allStudents = [];
//stores the indexes of the first element on each page - used to know when to stop displaying results
let pageIndexes = [];
let pagesNeeded = 0;
let currentPage = 0;

//grab the page element and its student-list child
const pageElement = document.getElementsByClassName('page')[0];
//establish global var for pageLinks
let pageLinksElement = '';

const studentListElement = document.getElementsByClassName('student-list')[0];
//create new resultsMsg DIV element and insert it before the student-list element
const resultsMsgElement = document.createElement("DIV");
resultsMsgElement.innerHTML = "<strong>NO RESULTS FOUND</strong>";
resultsMsgElement.style.color = 'red';
pageElement.insertBefore(resultsMsgElement, studentListElement);

const students_liElements = document.getElementsByClassName('student-item cf');
const studentNames = document.getElementsByTagName('h3');//studentNames[0].textContent
const studentAvatars = document.getElementsByClassName('avatar'); //studentAvatars[0].src
const studentEmails = document.getElementsByClassName('email');//studentEmails[0].textContent
const studentJoinDates = document.getElementsByClassName('date');//studentJoinDates[0].textContent

const header = document.getElementsByClassName('page-header cf')[0];
const searchBar = document.createElement('input');
searchBar.onkeyup = filterList;
searchBar.className = "student-search";
const searchButton = document.createElement('button');
searchButton.textContent = "Search";
searchButton.className = "student-search";
searchButton.addEventListener("click", filterList);
const formElement = document.createElement('form');
formElement.className = "student-search";
formElement.addEventListener('click', (e) => {
    console.log(e.target.id);
    if(e.target.id == 'max5' || e.target.id == 'max10' || e.target.id == 'max20'){
        let val = parseInt(e.target.value);
        switch(val){
            case 5:
                resultMax10.checked = false;
                resultMax20.checked = false;
                break;
            case 10:
                resultMax5.checked = false;
                resultMax20.checked = false;
                break;
            case 20:
                resultMax5.checked = false;
                resultMax10.checked = false;
                break;
        };
        maxStudentsPerPage = val;
        showPage(allStudents, 0);
    }
})
const formlabel = document.createElement('label');
formlabel.textContent = "Results Per Page:";
const resultMax5 = document.createElement('input');
const resultMax5_label = document.createElement('label');
resultMax5_label.textContent = "5";
resultMax5_label.for = "max5";
resultMax5.type = 'radio';
resultMax5.value = '5';
resultMax5.id = "max5";
const resultMax10 = document.createElement('input');
const resultMax10_label = document.createElement('label');
resultMax10_label.textContent = "10";
resultMax10_label.for = "max10";
resultMax10.type = 'radio';
resultMax10.value = '10';
resultMax10.id = "max10";
resultMax10.checked = true;
const resultMax20 = document.createElement('input');
const resultMax20_label = document.createElement('label');
resultMax20_label.textContent = "20";
resultMax20_label.for = "max20";
resultMax20.type = 'radio';
resultMax20.value = '20';
resultMax20.id = "max20";
formElement.appendChild(formlabel);
formElement.appendChild(resultMax5);
formElement.appendChild(resultMax5_label);
formElement.appendChild(resultMax10);
formElement.appendChild(resultMax10_label);
formElement.appendChild(resultMax20);
formElement.appendChild(resultMax20_label);

header.appendChild(searchButton);
header.appendChild(searchBar);
header.appendChild(formElement);



//store all student data into an array of student objects
for(let i = 0; i < students_liElements.length; i++){
    //ok, some of this isn't used - was thinking about adding more filtering options like email or join date
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

function showPage(students, page){
    //organize pages
    let length = students.length;
    pagesNeeded = Math.ceil(length / maxStudentsPerPage);
    appendPageLinks(students, maxStudentsPerPage);
    
    //the count for students visible should be set to 0 by default, but keep the 'none found' message hidden
    let studentsVisible = 0;
    resultsMsgElement.style.display = 'none';
    currentPage = page;
    //show only students from the array passed in
    for(let i = 0; i < students.length; i++){
        /*
        if the current student's index is greater than or equal to the index referenced in the pageIndexes array OR 
        the current student's index is less than the pageIndex + maxStudentsPerPage (which would be the first index of 
        the next page), show the student. Otherwise, hide the student.
        */
        if(students.indexOf(students[i]) >= pageIndexes[page] && students.indexOf(students[i]) < (pageIndexes[page]+maxStudentsPerPage)){
            students[i].show();
            //console.log(`${students[i].name} - ${i}`);
            //count how many students are visible
            studentsVisible++;
        }else{
            students[i].hide();
        }
    }
    if(studentsVisible > 0){
        //highlight the button that corresponds with the page you're on
        let linkList = document.querySelector('.pagination');
        let links = linkList.querySelectorAll('li > a');
        for(let i = 0; i < links.length; i++){
            if(i == page){
                links[i].style.border = "1px solid firebrick";
            }else{
                links[i].style.border = "";
            }
        }
    }else{
        resultsMsgElement.style.display = 'block';
    }
}

function filterList(){
    //get text from searchbar
    let query = searchBar.value;
    //start with clear array
    let filteredStudentList = [];
    if(query != ''){
        let students = allStudents;
        //compare searchbar text with each student's name
        for(let i = 0; i < students.length; i++){
            //if student's name starts with the same letters from the searchbar, show it, else hide it.
            if(students[i].name.startsWith(searchBar.value)){
                filteredStudentList.push(students[i]);
            }else{
                students[i].hide();
            }
        }
        //run showPage with the NEW array, not the default array
        showPage(filteredStudentList, 0);
    }else{
        //run showPage with default students list
        showPage(allStudents, currentPage);
    }
}

function appendPageLinks(studentList, maxPerPage){
    //checking if ul pagination links already exist, removing them if they do
    var linkCheck = document.getElementsByClassName('pagination');
    if(linkCheck.length > 0){
        pageElement.removeChild(pageLinksElement);
    }
    //create new ul pagination element
    pageLinksElement = document.createElement('ul');
    pageLinksElement.className = 'pagination';
    let pageIndex = 0;
    pageIndexes = [];
    for(let i=0; i < pagesNeeded; i++){
        //add current index to the pageIndexes array, then increment by max 
        pageIndexes.push(pageIndex);
        pageIndex += maxPerPage;
        let pageLink = document.createElement('li');
        pageLink.innerHTML = `<a>${i+1}</a>`;
        pageLink.addEventListener("click", (e) =>{showPage(studentList, i);});
        pageLinksElement.appendChild(pageLink);
    }
    pageElement.appendChild(pageLinksElement);
}

showPage(allStudents, 0)