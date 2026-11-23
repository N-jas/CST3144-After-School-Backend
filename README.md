## Database setup

- Database: After-school
- Collections: Lessons and Orders
- Lessons contains 10 initial lesson documents, each with 5 spaces.
- Lesson fields: id, topic, location, price, space and icon.
- GET /lessons retrieves Atlas documents and maps topic to subject
  and space to spaces for the frontend.
- Local API: http://localhost:3001
- Connection settings are stored in config.env, which is excluded from Git.