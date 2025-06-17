# Gear - React Native Application

## Git Workflow

### Branching Strategy
We follow a simplified Git Flow approach:

- `main` - Production branch
- `develop` - Development branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches
- `release/*` - Release preparation branches
- `hotfix/*` - Hot fix branches

### Branch Naming Conventions
- Feature branches: `feature/feature-name`
- Bug fix branches: `bugfix/bug-description`
- Release branches: `release/v1.x.x`
- Hot fix branches: `hotfix/issue-description`

### Commit Message Convention
We follow the Conventional Commits specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks

Example:
```
feat(auth): add login functionality
fix(api): resolve user data fetching issue
docs(readme): update installation instructions
```

## Project Structure
```
src/
├── features/           # Feature-based modules
├── shared/            # Shared components and utilities
├── core/              # Core business logic
├── infrastructure/    # External services integration
└── config/           # Configuration files
```

## Development Workflow

1. Create a new branch from `develop`
2. Make your changes
3. Write meaningful commit messages
4. Push your branch
5. Create a Pull Request
6. Code review
7. Merge to `develop`
8. After testing, merge to `main` for release

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Available Scripts

- `npm start` - Start the development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web
- `npm run lint` - Run ESLint
- `npm run reset-project` - Reset project configuration

## Dependencies

See `package.json` for a complete list of dependencies.

## Contributing

1. Follow the Git workflow
2. Write meaningful commit messages
3. Create descriptive Pull Requests
4. Ensure all tests pass
5. Update documentation as needed

## License

[Your License Here]
