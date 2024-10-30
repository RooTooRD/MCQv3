# Stage 1: Build the React app
FROM node:18-alpine AS build

# Set the working directory for the React app
WORKDIR /app/frontend

# Copy package.json and package-lock.json to install dependencies
COPY frontend/package*.json ./

# Install all dependencies (including devDependencies like Vite)
RUN npm install

# Copy the rest of the React project files
COPY frontend/ ./

# Build the React app
RUN npm run build


# Stage 2: Set up the Python environment for Django
# Set the python version as a build-time argument with Python 3.12 as the default
ARG PYTHON_VERSION=3.12-slim-bullseye
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

# Install OS dependencies for our mini VM
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libjpeg-dev \
    libcairo2 \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Create the mini VM's code directory
RUN mkdir -p /code/backend

# Set the working directory to that same code directory
WORKDIR /code/backend

# Copy the requirements file into the container
COPY backend/requirements.txt /tmp/requirements.txt

# Copy the Django project code into the container's working directory
COPY backend/ ./

# Install the Python project requirements
RUN pip install -r /tmp/requirements.txt

ARG DJANGO_SECRET_KEY
ENV DJANGO_SECRET_KEY=${DJANGO_SECRET_KEY}

ARG DJANGO_DEBUG=0
ENV DJANGO_DEBUG=${DJANGO_DEBUG}

ARG ALLOWED_HOSTS
ENV ALLOWED_HOSTS=${ALLOWED_HOSTS}

# Database isn't available during build
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


# Stage 3: Serve the React app with NGINX and run the Django app
FROM nginx:stable-alpine

# Copy the build output from the first stage (React app)
COPY --from=build /app/frontend/dist /usr/share/nginx/html

# Copy the Django app from the Django stage
COPY --from=django /code/backend /code/backend

# Expose ports
EXPOSE 80 8000

# Start NGINX and Django app
CMD ["sh", "-c", "./code/backend/paracord_runner.sh & nginx -g 'daemon off;'"]
