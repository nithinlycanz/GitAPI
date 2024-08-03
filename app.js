document.addEventListener('DOMContentLoaded', function() {
    const repoOwner = 'octocat'; // Replace with the repository owner's username
    const repoName = 'Hello-World'; // Replace with the repository name
    const issuesContainer = document.getElementById('issues');

    fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/issues`)
        .then(response => response.json())
        .then(data => {
            data.forEach(issue => {
                const issueElement = document.createElement('div');
                issueElement.innerHTML = `<h2>${issue.title}</h2><p>${issue.body}</p>`;
                issuesContainer.appendChild(issueElement);
            });
        })
        .catch(error => console.error('Error fetching issues:', error));
});
// Inside the forEach loop where issues are processed
const issueElement = document.createElement('div');
issueElement.className = 'issue-box'; // Add class name here
issueElement.innerHTML = `<h2>${issue.title}</h2><p>${issue.body}</p>`;
issuesContainer.appendChild(issueElement);

async function fetchIssueDetails(issue) {
    // Fetch milestone details if a milestone is associated with the issue
    if (issue.milestone) {
        const milestoneResponse = await fetch(issue.milestone.url);
        const milestoneData = await milestoneResponse.json();
        issue.milestoneDetails = milestoneData;
    }
}

async function fetch_issues_with_filters(repo, labels=null, assignee=null) {
    params = { state: "open" };
    if (labels) params.labels = ",".join(labels);
    if (assignee) params.assignee = assignee;
    
    const response = await fetch(`https://api.github.com/repos/${repo}/issues`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer YOUR_GITHUB_TOKEN', // Replace with your GitHub token
            'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify(params)
    });
    const issues = await response.json();
    
    // Fetch additional details for each issue
    for (let issue of issues) {
        await fetchIssueDetails(issue);
    }
    
    return issues;

}







