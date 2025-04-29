# docker/Dockerfile
FROM node:20

# Set the WORKDIR to the project root
WORKDIR /workspace

# Install Angular CLI globally
RUN npm install -g @angular/cli@19
RUN ng config -g cli.completion.prompted true

# Install Storybook CLI globally
RUN npm install -g storybook@8

# Expose Storybook's default port
EXPOSE 6006

# Default command
CMD ["bash"]
