@echo off

rem Start the frontend application
start cmd /k "cd app && npm start"

rem Start the backend application
start cmd /k "call .venv\Scripts\activate.bat && cd backend && python manage.py runserver"