# Beyoncé Discography Project
## Table of Contents
- Introduction
- Architecture Overview
- Frontend (Vite/React)
- Backend (FastAPI)
- Infrastructure as Code (Terraform)
- Containerization (Docker)
- CI/CD Pipeline (GitHub Actions)
- Kubernetes Deployment (EKS)
- Monitoring (Prometheus & Grafana)
- TLS and Certificate Management
- Authentication and IAM Roles
- Future Improvements
- Project Structure
- Usage
- License
- Closing Notes

## Introduction

This project is a serverless application for Beyoncé’s discography, where the goal was to create a fast, scalable application with a modern frontend and backend. The architecture integrates multiple AWS services like EKS (Elastic Kubernetes Service), DynamoDB, S3, and ECR (Elastic Container Registry), alongside a CI/CD pipeline powered by GitHub Actions and containerized using Docker. Metrics are captured and displayed in Grafana, with Prometheus scraping metrics from the backend.

## Architecture Overview
The architecture includes the following components:

- **Frontend (Vite/React):** A responsive UI displaying Beyoncé’s discography.
- **Backend (FastAPI):** A RESTful API serving the album data and providing the application’s business logic.
- **Infrastructure as Code (Terraform):** Automates the provisioning of AWS resources like EKS, DynamoDB, S3, etc.
- **Containerization (Docker):** Both frontend and backend are containerized for easy deployment.
- **CI/CD Pipeline (GitHub Actions):** Automates the build, test, and deploy process, handling separate workflows for the frontend and backend.
- **Kubernetes Deployment (EKS):** Managed via Terraform and deploys the application using Kubernetes.
- **Monitoring (Prometheus & Grafana):** Collects and visualizes metrics from the backend API.
- **TLS and Certificate Management:** Handles secure communication using a custom SSL certificate.

## Frontend (Vite/React)
The frontend of the application is built using **Vite** and **React**. The goal was to build a sleek and responsive interface similar to Apple Music's album grid layout, where users can view and interact with Beyoncé’s discography. The frontend fetches data from the FastAPI backend to display album details, including album covers and tracklists.

## Backend (FastAPI)
The backend is built using **FastAPI**, providing a RESTful API that serves album data. FastAPI was chosen for its speed and ease of use. The API is containerized using Docker and deployed on **EKS**. The backend connects to **DynamoDB** for storing discography data and **S3** for storing album cover images.

## Infrastructure as Code (Terraform)
All AWS resources for the project, including EKS, DynamoDB, and S3, were provisioned using **Terraform**. This approach ensures that the entire infrastructure is reproducible and maintainable, providing a consistent environment across deployments. <br>
The backend is deployed with the necessary IAM roles and service accounts managed using **EKS Pod Identity**. Terraform is used to automate the provisioning of resources, and the state file is stored in **S3** for safe management.

## Containerization (Docker)
Both the frontend and backend of the project are containerized using **Docker**. The Dockerfiles for both services ensure that the applications can be easily built and deployed across different environments. The frontend is served using **Vite** and the backend is powered by **FastAPI**, with Docker ensuring portability and consistency across different stages of development and deployment.

## CI/CD Pipeline (GitHub Actions)
The **CI/CD pipeline** is powered by **GitHub Actions**. Separate workflows are set up for the frontend and backend:
- **Frontend Workflow:** Builds and pushes the Docker image to AWS ECR, handling changes only to the frontend.
- **Backend Workflow:** Contains multiple jobs: checking for changes in the backend, building and pushing the Docker image, and running Terraform for infrastructure updates. The pipeline does not automatically deploy to EKS, but it ensures that Docker images and infrastructure changes are handled efficiently.

## Kubernetes Deployment (EKS)
The application is deployed on **Amazon EKS**, which provides a managed Kubernetes environment for the containers. EKS is configured to handle multiple pods, ensuring the scalability of the application. The node groups are configured with **t3.medium** instance types, with a minimum of 2 nodes, a desired count of 2, and a maximum of 3 nodes, using **spot instances** to optimize costs.

## Monitoring (Prometheus & Grafana)
**Prometheus** is set up to scrape metrics from the backend service, which is exposed through the ```/metrics``` endpoint in FastAPI. **Grafana** is used to visualize the data and create a dashboard that helps track the performance of the backend API. This setup provides observability into key metrics such as response times, request counts, and resource utilization.

## TLS and Certificate Management
TLS encryption is handled for secure communication. Initially, **Cert Manager** with **Let’s Encryp**t was set up, but due to limitations in free production certificates, a **purchased SSL certificate** was used for the domain **discography.cameronnwilson.com**.

## Authentication and IAM Roles
**IAM roles and policies** were created to provide the necessary permissions for the various AWS services. Instead of using **IRSA, EKS Pod Identity** was configured to allow the backend pods to assume specific IAM roles, granting the necessary permissions for accessing AWS resources like DynamoDB and S3.

## Future Improvements
While the project is functional, there are a few areas for improvement:
  - Testing: Implementing unit and integration tests for both the frontend and backend.
  - Scaling: Fine-tuning the Kubernetes setup to handle higher traffic more efficiently.
  - API Rate Limiting: Implementing rate limiting to prevent the abuse of the API.
  - Modularization: Currently, the Terraform configuration is organized into a single large file. A future improvement would be to break out the resources into reusable modules (e.g., eks-cluster, node-groups, iam-roles, ecr, s3, etc.). This would make the codebase more scalable, easier to maintain, and aligned with Terraform best practices.
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
## Usage

### Prerequisites
Before getting started, make sure the following requirements are met:
- A registered domain name (used to route external traffic to the application via AWS Elastic Load Balancer and Ingress Controller)
- Ability to create or update DNS records (you'll need to point your domain to the ELB created by the Ingress NGINX Controller)
- AWS CLI installed and configured with appropriate credentials
- Terraform installed locally
- Kubectl and Helm installed locally
- Docker installed locally
- AWS ECR repositories for the frontend and backend images

Note:
This project assumes an ingress-based setup for routing and TLS termination.
If a domain is not available, significant changes would be needed — including switching Kubernetes services to NodePort, updating frontend/backend URLs, adjusting CORS settings on the backend, and removing ingress rules — which are outside the intended scope of this project.

To use this project locally:

### 1. Clone the repository:
```
git clone https://github.com/camnowil96/Discography.git
```
### 2. Setup Github Actions IAM Role
   Before deploying infrastructure, you need to manually configure an IAM role that GitHub Actions can assume using OIDC.
   Rather than duplicating the entire setup process here, you can follow this guide for a detailed walkthrough: <br>
   ➡️ Official AWS Blog: Configure OIDC and IAM Roles for GitHub Actions <br>
   Important:
   - Make sure to restrict the trust relationship to your specific GitHub repository.
   - Ensure the role has the necessary permissions for Terraform deployments (EKS, S3, IAM, ECR, etc.).
   - Add the required secrets (AWS_ROLE_TO_ASSUME, AWS_REGION, AWS_ACCOUNT_ID) to your GitHub repo settings. (I hardcoded mine but don't do that!) 
### 3. Update files
Update main.tf file to create unique names for s3 bucket, dynamodb table, etc., update region, AZs in subnets, etc. <br>
Frontend - Update .env file with correct vite backend url (do the same in Dockerfile). <br>
In backend/app update CORS allow_origins with your domain URL and update the DynamoDB table and S3 bucket names. <br>
Go through k8s manifests and update where needed. 

### 4. Commit changes and push to master branch.
This will trigger both workflows - provisioning your infrastructure and building/pushing your docker images to ECR.

## Post-Provisioning Instructions:
After the EKS cluster and supporting infrastructure have been provisioned via Terraform, a few manual steps are needed to finalize the deployment. Navigate to your k8s folder:

### 1. Update your kubeconfig
Make sure your local kubeconfig is updated to connect to the new EKS cluster:
```
aws eks update-kubeconfig --region <your-region> --name <your-cluster-name>
```
(Note: this is also handled by the Terraform local-exec provisioner, but you may want to run it manually if needed.)
### 2. Install Prometheus for Monitoring
Add the Prometheus community Helm repo and install the kube-prometheus-stack chart, passing in your custom values:
```
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install prometheus prometheus-community/kube-prometheus-stack -f prom-values.yaml
```
### 3. Install Ingress NGINX Controller
Install the Ingress NGINX Controller via Helm, passing in your customized values:
```
helm install ingress-nginx oci://ghcr.io/nginx/charts/nginx-ingress --version 2.1.0 -f values.yaml
```
### 4. Create DNS Record in Route53
Once the Ingress Controller finishes deploying and the ELB is available:
- Navigate to your Route53 hosted zone.
- Create a new A Record:
  - Record type: A - IPv4 address'
  - Alias: Yes
  - Alias Target: Select the newly created ELB from the dropdown.
- Save the record.
This will associate your domain with the ELB, allowing external traffic to properly route to your Kubernetes cluster.

### 5. Install the remainder of your manifests 
```
kubectl apply -f
```
### 6. Verify Deployments:
Ensure all pods are running:
```
kubectl get pods -A
```
### 7. Access Grafana
- Find the Grafana admin password:
```
kubectl get secret prometheus-grafana -n default -o jsonpath="{.data.admin-password}" | base64 --decode ; echo
```
- Port-forward Grafana to your local machine:
```
kubectl port-forward svc/prometheus-grafana 3000:80
```
- Visit http://localhost:3000 and log in with admin and the password retrieved above.
### 8. Visit your domain name to see working project

## License
This project is licensed under the MIT License.

## Closing Notes
This project was a huge learning experience and a lot of fun to build. It combined my love for tech with a little creativity, and helped me strengthen my skills across multiple areas like cloud infrastructure, CI/CD pipelines, and Kubernetes operations. Thanks for taking the time to check it out!
