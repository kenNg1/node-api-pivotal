FROM node:8-alpine
# Working directory for application
WORKDIR /usr/src/app
# Binds to port 7777
EXPOSE 7777
# Creates a mount point
VOLUME [ "/usr/src/app" ]