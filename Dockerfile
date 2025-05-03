# docker/Dockerfile
FROM node:20

# Set the WORKDIR to the project root
WORKDIR /workspace

# Copy package files early to leverage Docker layer caching
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm install

# Install Angular CLI globally
RUN npm install -g @angular/cli@19 jest@29 typescript
RUN ng config -g cli.completion.prompted true

# Copy the rest of the project files
COPY . .

# Expose Storybook's default port
EXPOSE 6006

# Default command
CMD ["bash"]
