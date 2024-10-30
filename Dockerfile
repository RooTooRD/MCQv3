# Set the python version as a build-time argument
# with Python 3.12 as the default
ARG PYTHON_VERSION=3.12-slim-bullseye

# Use the ARG in the FROM statement
FROM python:${PYTHON_VERSION} AS django

# Create a virtual environment
RUN python -m venv /opt/venv

# Set the virtual environment as the current location
ENV PATH=/opt/venv/bin:$PATH

# Upgrade pip
RUN pip install --upgrade pip

# Set Python-related environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install os dependencies for our mini vm
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libjpeg-dev \
    libcairo2 \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Create the mini vm's code directory
RUN mkdir -p /code

# Set the working directory to that same code directory
WORKDIR /code

# Copy the requirements file into the container
COPY backend/requirements.txt /tmp/requirements.txt

# Copy the project code into the container's working directory
COPY backend/ ./code/

# Install the Python project requirements
RUN pip install -r /tmp/requirements.txt

# Database settings (these should be provided by environment variables in Railway)
ARG DJANGO_SECRET_KEY
ENV DJANGO_SECRET_KEY=${DJANGO_SECRET_KEY}

ARG DJANGO_DEBUG=0
ENV DJANGO_DEBUG=${DJANGO_DEBUG}

ARG ALLOWED_HOSTS
ENV ALLOWED_HOSTS=${ALLOWED_HOSTS}

# Run any other commands that do not need the database
RUN python manage.py collectstatic --noinput

# Set the Django default project name
ARG PROJ_NAME="main"

# Create a bash script to run the Django project
RUN printf "#!/bin/bash\n" > ./paracord_runner.sh && \
    printf "RUN_PORT=\"\${PORT:-8000}\"\n\n" >> ./paracord_runner.sh && \
    printf "python manage.py migrate --no-input\n" >> ./paracord_runner.sh && \
    printf "gunicorn ${PROJ_NAME}.wsgi:application --bind \"0.0.0.0:\$RUN_PORT\"\n" >> ./paracord_runner.sh

# Make the bash script executable
RUN chmod +x paracord_runner.sh

# Clean up apt cache to reduce image size
RUN apt-get remove --purge -y \
    && apt-get autoremove -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Run the Django project via the runtime script when the container starts
CMD ["./paracord_runner.sh"]

# Stage 1: Build the React app
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY frontend/package*.json ./

# Install all dependencies (including devDependencies like Vite)
RUN npm install

# Copy the rest of the project files
COPY frontend/ ./

# Debugging step to check file structure
RUN ls -R /app/src/assets && ls -R /app/src/components

# Build the React app
RUN npm run build

# Stage 2: Serve the React app with NGINX
FROM nginx:stable-alpine

# Copy the build output from the first stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
