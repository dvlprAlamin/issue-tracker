document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
  issueCounter();
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id === id + '');
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
  issueCounter();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.id !== id + '')
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  const issueList = document.getElementById('issuesList');
  issueList.addEventListener('click', event => event.target.parentElement.style.display = 'none');
  issueCounter();
  console.log(issueList);
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];
    if(status === 'Closed'){
      issuesList.innerHTML +=   `<div class="well">
      <h6>Issue ID: <span issue-id="${id}">${id}</span> </h6>
      <p><span class="label label-info"> ${status} </span></p>
      <h3><del> ${description}</del> </h3>
      <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
      <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
      <button onclick="deleteIssue(${id})" class="btn btn-danger">Delete</button>
      </div>`;
    }
    else{
      issuesList.innerHTML +=   `<div class="well">
      <h6>Issue ID:  <span issue-id="${id}">${id}</span> </h6>
      <p><span class="label label-info"> ${status} </span></p>
      <h3> ${description} </h3>
      <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
      <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
      <button onclick="closeIssue(${id})" class="btn btn-warning">Close</button>
      <button onclick="deleteIssue(${id})" class="btn btn-danger">Delete</button>
      </div>`;
    }
    
  }
}


const issueCounter = () =>{
  const issues = JSON.parse(localStorage.getItem('issues'));
  const activeIssue = issues.filter(issue => issue.status === 'Open');
  document.getElementById('active-issue').innerText = activeIssue.length;
  document.getElementById('total-issue').innerText = issues.length;
}
issueCounter();