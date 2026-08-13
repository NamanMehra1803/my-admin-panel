# Reorganized React Project

This project is the original source reorganized into a cleaner structure without redesigning the UI.

## Structure
- `src/pages/admin` - admin pages grouped by feature
- `src/pages/frontend` - frontend pages grouped by feature
- `src/components/admin` - admin shared Header/Footer/Sidebar
- `src/components/frontend` - frontend shared Header/Footer
- `src/components/common` - reusable components such as Table
- `src/layouts` - layout components
- `src/config` - Axios/API configuration
- `src/routes` - route and private-route logic
- `src/assets` - images and static assets
- `src/styles` - global styles (add your future global styles here)

## Run
```bash
npm i
npm start
```

The original package.json and package-lock.json are preserved.

## Note
The route paths are preserved. Existing UI/code was not intentionally redesigned; this ZIP is for structure cleanup so you can continue the changes yourself.
