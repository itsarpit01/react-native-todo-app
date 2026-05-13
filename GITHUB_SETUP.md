# GitHub Repository Setup Guide

## Quick GitHub Setup

### Step 1: Initialize Git Repository

```bash
cd TodoApp

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: React Native Todo App with all features"
```

### Step 2: Create Repository on GitHub

1. Go to https://github.com/new
2. Enter repository name: `react-native-todo-app`
3. Add description: "A feature-rich To-Do app built with React Native and Expo"
4. Choose Public (for visibility) or Private
5. Skip "Add .gitignore" (already have one)
6. Skip "Add a license" (add later)
7. Click "Create repository"

### Step 3: Push to GitHub

```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/react-native-todo-app.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 4: Add License

```bash
# Create MIT License
cat > LICENSE << 'EOF'
MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOF

git add LICENSE
git commit -m "Add MIT License"
git push
```

### Step 5: Update README.md

```bash
cat > README.md << 'EOF'
# React Native To-Do App

A beautiful, feature-rich To-Do application built with React Native and Expo.

## Features

### Core
- ✅ Add Task
- ✅ Display Task List
- ✅ Mark Task as Completed
- ✅ Delete Task

### Bonus
- 🌙 Dark Mode
- ✏️ Edit Task
- 💾 AsyncStorage Persistence

## Quick Start

```bash
# Install dependencies
npm install

# Start development
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web
```

## Documentation

- [Setup Guide](SETUP_GUIDE.md) - Installation instructions
- [Features](FEATURES.md) - Detailed feature documentation
- [APK Build Guide](APK_BUILD_GUIDE.md) - Building APK
- [Code Architecture](CODE_ARCHITECTURE.md) - Code structure
- [Project Summary](PROJECT_SUMMARY.md) - Completion details

## Tech Stack

- React Native
- Expo
- TypeScript
- AsyncStorage
- React Hooks

## APK Download

[Build APK using EAS or local build - see APK_BUILD_GUIDE.md]

## License

MIT License - See LICENSE file

## Support

For questions or issues, please open an issue on GitHub.

---

Created with ❤️ using React Native and Expo
EOF

git add README.md
git commit -m "Update README with comprehensive information"
git push
```

---

## Sharing Your Code

### Via GitHub Link
Share: `https://github.com/YOUR_USERNAME/react-native-todo-app`

### Via ZIP File
```bash
# Create ZIP from current directory
cd ..
zip -r todo-app.zip TodoApp/

# Exclude node_modules for smaller size
zip -r todo-app.zip TodoApp/ -x "TodoApp/node_modules/*"
```

### Via GitHub Releases

1. Create a release on GitHub
2. Upload APK file
3. Add release notes
4. Click "Publish release"

---

## Collaboration

### Adding Collaborators

1. Go to Repository Settings
2. Click "Manage access"
3. Click "Invite teams or people"
4. Enter collaborator username
5. Choose role (Maintain, Triage, etc.)

### Creating Branches

```bash
# Create feature branch
git checkout -b feature/task-categories

# Make changes
git add .
git commit -m "Add task categories"
git push origin feature/task-categories

# Create Pull Request on GitHub
```

---

## Versioning

### Semantic Versioning

- **1.0.0** - Initial release
- **1.1.0** - New features (minor)
- **1.0.1** - Bug fixes (patch)

### Tag Release

```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

---

## CI/CD Setup (Optional)

### GitHub Actions Workflow

Create `.github/workflows/test.yml`:

```yaml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm run lint
      - run: npm test
```

---

## SEO & Discoverability

### GitHub Topics

Add to repository settings:
- `react-native`
- `expo`
- `todo-app`
- `mobile-app`
- `typescript`
- `asyncstorage`

### Keywords in README

Ensure README includes:
- React Native
- Expo
- To-Do App
- Mobile Development
- Task Manager
- Dark Mode
- Cross-platform

---

## Maintenance

### Update Dependencies

```bash
# Check for outdated packages
npm outdated

# Update all packages
npm update

# Update to latest (with breaking changes)
npm upgrade

# Commit changes
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

### Keep Documentation Fresh

- Update README as features change
- Keep version number current
- Update CHANGELOG
- Review and close old issues

---

## Advanced GitHub Features

### Issue Templates

Create `.github/ISSUE_TEMPLATE/bug_report.md`:

```markdown
## Bug Report

### Description
[Describe the bug]

### Steps to Reproduce
1. ...
2. ...
3. ...

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Environment
- Device: [Phone model]
- OS: [Android/iOS version]
- App Version: [1.0.0]
```

### Pull Request Template

Create `.github/pull_request_template.md`:

```markdown
## Description
[Describe your changes]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update

## Testing
[Describe how you tested]

## Checklist
- [ ] Code compiles
- [ ] No errors in console
- [ ] Tested on device
```

---

## Monitoring & Analytics

### GitHub Insights
- View traffic and clones
- See referrer sources
- Track community engagement

### Badge in README

```markdown
[![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/react-native-todo-app.svg)](https://github.com/YOUR_USERNAME/react-native-todo-app)
[![GitHub issues](https://img.shields.io/github/issues/YOUR_USERNAME/react-native-todo-app.svg)](https://github.com/YOUR_USERNAME/react-native-todo-app/issues)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
```

---

## Troubleshooting GitHub

### Undo Last Commit (Not Pushed)
```bash
git reset HEAD~1
```

### Undo Pushed Commit
```bash
git revert <commit-hash>
git push
```

### Force Push (Use Cautiously!)
```bash
git push --force-with-lease origin main
```

### Large File Issues
```bash
# Install Git LFS for large files
git lfs install
git lfs track "*.apk"
git add .gitattributes
git commit -m "Add Git LFS tracking"
```

---

## Resources

- GitHub Docs: https://docs.github.com
- Git Tutorial: https://git-scm.com/doc
- GitHub Flow: https://guides.github.com/introduction/flow/
- Markdown Guide: https://guides.github.com/features/mastering-markdown/

---

## Next Steps

1. ✅ Initialize Git repository
2. ✅ Create GitHub repository
3. ✅ Push code to GitHub
4. ✅ Add license
5. ✅ Update README
6. ✅ Share repository link
7. ✅ Add collaborators (if needed)
8. ✅ Setup CI/CD (optional)
9. ✅ Create releases (optional)
10. ✅ Monitor engagement

---

Repository URL: `https://github.com/YOUR_USERNAME/react-native-todo-app`

