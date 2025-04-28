# Beyoncé Discography Project
## Table of Contents

    Introduction

    Architecture Overview

    Frontend (Vite/React)

    Backend (FastAPI)

    Infrastructure as Code (Terraform)

    Containerization (Docker)

    CI/CD Pipeline (GitHub Actions)

    Kubernetes Deployment (EKS)

    Monitoring (Prometheus & Grafana)

    TLS and Certificate Management

    Authentication and IAM Roles

    Future Improvements

    Project Structure

    Usage

    License

    Closing Notes

## Introduction

This project is a serverless API for Beyoncé’s discography, where the goal was to create a fast, scalable application with a modern frontend and backend. The architecture integrates multiple AWS services like EKS (Elastic Kubernetes Service), DynamoDB, S3, and API Gateway, alongside a CI/CD pipeline powered by GitHub Actions and containerized using Docker. Metrics are captured and displayed in Grafana, with Prometheus scraping metrics from the backend.
Architecture Overview

The architecture includes the following components:

    Frontend (Vite/React): A responsive UI displaying Beyoncé’s discography.

    Backend (FastAPI): A RESTful API serving the album data and providing the application’s business logic.

    Infrastructure as Code (Terraform): Automates the provisioning of AWS resources like EKS, DynamoDB, S3, etc.

    Containerization (Docker): Both frontend and backend are containerized for easy deployment.

    CI/CD Pipeline (GitHub Actions): Automates the build, test, and deploy process, handling separate workflows for the frontend and backend.

    Kubernetes Deployment (EKS): Managed via Terraform and deploys the application using Kubernetes.

    Monitoring (Prometheus & Grafana): Collects and visualizes metrics from the backend API.

    TLS and Certificate Management: Handles secure communication using a custom SSL certificate.

## Frontend (Vite/React)
The frontend of the application is built using Vite and React. The goal was to build a sleek and responsive interface similar to Apple Music's album grid layout, where users can view and interact with Beyoncé’s discography. The frontend fetches data from the FastAPI backend to display album details, including album covers and tracklists.

## Backend (FastAPI)
The backend is built using FastAPI, providing a RESTful API that serves album data. FastAPI was chosen for its speed and ease of use. The API is containerized using Docker and deployed on EKS. The backend connects to DynamoDB for storing discography data and S3 for storing album cover images.

## Infrastructure as Code (Terraform)
All AWS resources for the project, including EKS, DynamoDB, and S3, were provisioned using Terraform. This approach ensures that the entire infrastructure is reproducible and maintainable, providing a consistent environment across deployments.

The backend is deployed with the necessary IAM roles and service accounts managed using EKS Pod Identity. Terraform is used to automate the provisioning of resources, and the state file is stored in S3 for safe management.
Containerization (Docker)

Both the frontend and backend of the project are containerized using Docker. The Dockerfiles for both services ensure that the applications can be easily built and deployed across different environments. The frontend is served using Vite and the backend is powered by FastAPI, with Docker ensuring portability and consistency across different stages of development and deployment.

## CI/CD Pipeline (GitHub Actions)
The CI/CD pipeline is powered by GitHub Actions. Separate workflows are set up for the frontend and backend:

    Frontend Workflow: Builds and pushes the Docker image to AWS ECR, handling changes only to the frontend.

    Backend Workflow: Contains multiple jobs: checking for changes in the backend, building and pushing the Docker image, and running Terraform for infrastructure updates. The pipeline does not automatically deploy to EKS, but it ensures that Docker images and infrastructure changes are handled efficiently.

## Kubernetes Deployment (EKS)
The application is deployed on Amazon EKS, which provides a managed Kubernetes environment for the containers. EKS is configured to handle multiple pods, ensuring the scalability of the application. The node groups are configured with t3.medium instance types, with a minimum of 2 nodes, a desired count of 2, and a maximum of 3 nodes, using spot instances to optimize costs.

## Monitoring (Prometheus & Grafana)
Prometheus is set up to scrape metrics from the backend service, which is exposed through the /metrics endpoint in FastAPI. Grafana is used to visualize the data and create a dashboard that helps track the performance of the backend API. This setup provides observability into key metrics such as response times, request counts, and resource utilization.

## TLS and Certificate Management
TLS encryption is handled for secure communication. Initially, Cert Manager with Let’s Encrypt was set up, but due to limitations in free production certificates, a purchased SSL certificate was used for the domain discography.cameronnwilson.com.

## Authentication and IAM Roles
IAM roles and policies were created to provide the necessary permissions for the various AWS services. Instead of using IRSA, EKS Pod Identity was configured to allow the backend pods to assume specific IAM roles, granting the necessary permissions for accessing AWS resources like DynamoDB and S3.

## Future Improvements
While the project is functional, there are a few areas for improvement:

  - Testing: Implementing unit and integration tests for both the frontend and backend.

  - Scaling: Fine-tuning the Kubernetes setup to handle higher traffic more efficiently.

  - API Rate Limiting: Implementing rate limiting to preveent the abuse of the API.
  - 
## Project Structure
```
├── .github
    └── workflows       # Frontend and backend CI/CD pipeline
├── backend
|   ├── infra           # Terraform configuration files
|   ├── app             # FastAPI backend files
|   ├── dockerfile      # Backend dockerfile
|   ├── .dockerignore   # dockerignore file          
├── frontend            
|   ├── public          # Static files
|   ├── src             # React components, stylesheets, main react app
|   ├── dockerfile      # Frontend dockerfile
|   ├── .dockerignore   # dockerignore file 
|   ├── .env            # Environmental variable file (backend url) 
├── k8s                 # Kubernetes manifests and values files to pass during prometheus and 
├──.gitignore           # gitignore file
└── README.md           # Project documentation              
```
