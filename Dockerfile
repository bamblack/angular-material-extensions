# docker/Dockerfile
FROM node:20

# Set the WORKDIR to the project root
WORKDIR /workspace

# Install Angular CLI globally in the container (not in the docker/ subfolder)
RUN npm install -g @angular/cli@19

# Enable Yarn if you want it
RUN corepack enable && corepack prepare yarn@stable --activate

# Default command
CMD ["bash"]
