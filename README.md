# Endpoints

### Login
- POST  api/admin/login?key= (administrator access key required)
- POST  api/reviewer/login
- POST  api/student/login

### Admin
- POST  api/admin
- GET   api/admins
- GET   api/admin/:id
- PATCH api/admin/:id
- DEL   api/admin:id

### Reviewer
- POST  api/reviewer
- GET   api/reviewers
- GET   api/reviewer/:id
- PATCH api/reviewer/:id
- DEL   api/reviewer:id

### Student
- POST  api/student
- GET   api/students
- GET   api/student/:id
- PATCH api/student/:id
- DEL   api/student:id

### Solicitation
- POST  api/solicitation
- GET   api/solicitations
- GET   api/student/:studentId/solicitation
- PATCH api/student/:studentId/solicitation
- PATCH api/student/:studentId/solicitation/status
- PUT   api/solicitations/status
- DEL   api/solicitation/:id

### Google Sheets
- PUT   api/send-data/googlesheets


