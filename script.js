const repositories = [

    { owner: 'firstcontributions', repo: 'first-contributions' },
    { owner: 'octocat', repo: 'Hello-World' },
    { owner: 'octocat', repo: 'Hello-World' },
    { owner: 'octocat', repo: 'Hello-World' },
    { owner: 'octocat', repo: 'Hello-World' },
    { owner: 'octocat', repo: 'Hello-World' },
    { owner: 'octocat', repo: 'Hello-World' },
    // Add more repositories here
];
async function fetchOpenIssues(owner, repo) {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues?state=open`);
        const issues = await response.json();
        return issues;
    } catch (error) {
        console.error(`Error fetching issues for ${owner}/${repo}:`, error);
        return [];
    }
}
function displayIssues(issues, owner, repo) {
    const container = document.getElementById('issuesContainer'); // Ensure this ID matches your HTML
    const repoHeader = document.createElement('h2');
    repoHeader.textContent = `${owner}/${repo}`;
    container.appendChild(repoHeader);

    issues.forEach(issue => {
        const issueElement = document.createElement('div');
        issueElement.className = 'issue-box';
        issueElement.innerHTML = `<h3>${issue.title}</h3><p>${issue.body}</p>`;
        container.appendChild(issueElement);
    });
}
async function loadAllOpenIssues() {
    for (const repo of repositories) {
        const issues = await fetchOpenIssues(repo.owner, repo.repo);
        displayIssues(issues, repo.owner, repo.repo);
    }
}

// Call the main function when the DOM is ready
document.addEventListener('DOMContentLoaded', loadAllOpenIssues);
