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

console.log("---students: " + allStudents[0].name);
console.log("---students: " + allStudents[0].avatar);
console.log("---students: " + allStudents[0].email);
console.log("---students: " + allStudents[0].joinDate);

let specialStudents = [allStudents[0], allStudents[1], allStudents[3]];

function organizeByPage(studentList){
    let length = studentList.length;
    let pagesNeeded = Math.ceil(length / maxStudentsPerPage);
    let pageIndex = 0;
    for(let i=0; i < pagesNeeded; i++){
        pageIndexes.push(pageIndex);
        console.log(`Creating index for page ${i}: ${pageIndex}`);
        pageIndex += maxStudentsPerPage;
    }
}
organizeByPage(allStudents);

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
            console.log(students[i].name);
        }else{
            students[i].hide();
        }
        
    }
}
//showPage(allStudents, 0);



/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
function appendPageLinks(){
//add buttons after the page div's <ul> element


}

// Remember to delete the comments that came with this file, and replace them with your own code comments.