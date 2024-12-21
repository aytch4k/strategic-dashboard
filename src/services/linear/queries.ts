// Query to fetch issues with their states, priorities, and estimates
export const ISSUES_QUERY = `
  query Issues {
    issues(
      first: 100
      filter: {
        state: { type: { in: ["started", "unstarted", "backlog", "completed", "canceled"] } }
      }
    ) {
      nodes {
        id
        title
        state {
          id
          name
          type
        }
        priority
        estimate
        completedAt
      }
    }
  }
`;

// Query to fetch active cycle information
export const CYCLES_QUERY = `
  query ActiveCycle {
    teams(first: 1) {
      nodes {
        id
        activeCycle {
          id
          number
          startsAt
          endsAt
          progress
          scopeTarget
          completedIssueCount
          completedScopeTarget
          issues {
            nodes {
              id
              estimate
            }
          }
        }
      }
    }
  }
`;

// Query to fetch projects with their states
export const PROJECTS_QUERY = `
  query Projects {
    projects(first: 100) {
      nodes {
        id
        name
        state
        progress
        startDate
        targetDate
        issues {
          nodes {
            id
            state {
              type
            }
          }
        }
      }
    }
  }
`;