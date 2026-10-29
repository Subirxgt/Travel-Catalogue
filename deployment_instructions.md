# Travel Catalogue — Terraform Deployment Instructions

## 1. Project Overview

Travel Catalogue is a cloud-hosted web application developed using Node.js, Express.js, and EJS. The application uses MongoDB Atlas for persistent database storage and Cloudinary for image storage, transformation, and delivery.

The application is hosted on Render. Terraform is used to define and manage the existing Render web service configuration.

## 2. Prerequisites

The following tools and resources are required:

- Terraform version 1.5.0 or later
- Git
- PowerShell on Windows
- A Render account and Render API credentials
- Access to the Travel Catalogue GitHub repository
- An existing Render web service

## 3. Terraform Configuration Files

The Terraform configuration contains the following files:

- `versions.tf` — specifies the required Terraform version and Render provider.
- `providers.tf` — configures the Render provider.
- `main.tf` — defines the Render web service.
- `variables.tf` — declares configurable input variables, if used.
- `outputs.tf` — defines output values, if configured.
- `.terraform.lock.hcl` — records the selected provider dependency versions.

## 4. Configure Credentials

Open PowerShell and navigate to the Terraform directory:

```powershell
cd C:\Users\ASUS\Desktop\Travel-Catalog\terraform
```

Set the Render API key for the current PowerShell session:

```powershell
$env:RENDER_API_KEY = Read-Host "Enter your Render API key"
```

Set the Render owner ID using the value associated with your account:

```powershell
$env:RENDER_OWNER_ID = "YOUR_RENDER_OWNER_ID"
```

Do not store API keys, database credentials, or other secrets in Terraform files or commit them to GitHub.

## 5. Initialize Terraform

Run:

```powershell
terraform init
```

This initializes the Terraform working directory and downloads the required provider.

## 6. Format and Validate

Format the Terraform configuration:

```powershell
terraform fmt
```

Validate the configuration:

```powershell
terraform validate
```

A successful validation confirms that the Terraform configuration is syntactically valid and structurally consistent.

## 7. Review the Execution Plan

Run:

```powershell
terraform plan
```

Review the proposed changes before applying them. Unexpected resource deletion, replacement, or changes to service configuration must be investigated before proceeding.

## 8. Apply the Configuration

Run:

```powershell
terraform apply
```

Review the proposed actions and enter `yes` only when the changes are understood and expected.

For this deployment, Terraform reported:

```text
Apply complete! Resources: 0 added, 0 changed, 0 destroyed.
```

This indicates that no infrastructure changes were necessary because the existing service matched the Terraform configuration.

## 9. Inspect the Infrastructure State

Run:

```powershell
terraform show
```

To inspect the specific Render service, run:

```powershell
terraform state show render_web_service.travel_catalogue
```

These commands display the infrastructure information recorded in Terraform state. Treat their output as potentially sensitive and redact sensitive information before sharing screenshots.

## 10. Application Verification

The deployed application can be accessed at:

https://travel-catalogue.onrender.com/

The health endpoint is:

https://travel-catalogue.onrender.com/health

Open these URLs in a browser to verify that the application is accessible and the health endpoint responds as expected.

## 11. Evidence for Submission

The following screenshots are included as Terraform deployment evidence:

1. `terraform validate` showing successful validation.
2. `terraform apply` showing the final result.
3. `terraform show` displaying the managed Render web service.

Additional evidence for the assignment is organized into the cost-estimation and monitoring screenshot folders.

## 12. Security and State Management

- Do not commit `.env` files, API credentials, database connection strings, or other secrets.
- Exclude Terraform state files and backup state files from version control.
- Exclude the `.terraform/` working directory from version control.
- Keep Terraform state in a secure location because it may contain sensitive infrastructure information.
- Review the execution plan before applying changes.

## 13. Conclusion

Terraform validation and application completed successfully. The existing Render web service matched the declared configuration, so no resources were added, modified, or destroyed. The deployed application remains available through its public URL and health endpoint.
