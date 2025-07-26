
# Team Collaboration Guide (Git Workflow)

## 📄 `COLLABORATION.md`

This document describes how we collaborate as a team using Git and GitHub.

---

### Table of Contents
- [Branching Strategy](#branching-strategy)
- [Commit Message Conventions](#commit-message-conventions)
- [Collaboration Workflow](#collaboration-workflow)
- [Avoid Guidelines](#avoid)
- [Project Issues/Feature Tracking Management (Kanban Board)](#project-issues-or-feature-tracking-management)



### Branching Strategy

- **`main`** → Stable production branch
- **`dev`** → Integration branch (merged from all feature branches)
- **`feature/feature-name`** → One feature per branch (e.g., `feature/checklist-ui`)
  
---

### Commit Message Conventions

Use clear prefixes:

- `feat:`     -> New feature
- `fix:`      -> Bug fix
- `style:`    -> UI/CSS only
- `docs:`     -> Update o README or other docs
- `refactor:` -> Code cleanup

---

### Collaboration Workflow

1. **Create a new branch** for your assigned feature:
   ```bash
   git checkout -b feature/your-feature-name

2. **Make your changes**, regularly with clear messages:
   ```bash
   git commit -m "feat: add checklist toggle"
   ```
   [see commit message conventions](#commit-message-conventions)


3. **Push your branch** to Github:
   ```bash
   git push origin feature/checklist-toggle
   ```
   [see branching strategy](#branching-strategy)

4. **Create a Pull Request (PR)** from your feature branch sa github 
5. **Request a review** from another member or leader

---

### Avoid

- Committing directly to main / dev
- Leaving commented-out code or unused files
- Merging your own PR without review from a member or leader

---

### Project Issues or Feature Tracking Management
We use the GitHub Projects Kanban Board to manage tasks:

[Open this project link if you are a repository collaborator](https://github.com/users/99lash/projects/9/)


| Status         | Description              
| ---------------|------------------------ 
|  Backlog     | Tasks hasn't been started        
|  Ready       | Tasks ready to be picked up         
|  In Progress | Actively being developed 
|  For Review  | Ready for code review    
|  Done        | Completed features       

---