resource "render_web_service" "travel_catalogue" {
  name              = "Travel-Catalogue"
  plan              = "free"
  region            = "virginia"
  environment_id    = "evm-dahibj2fngtc739rifcg"
  health_check_path = "/health"
  start_command     = "node app.js"

  runtime_source = {
    native_runtime = {
      repo_url      = "https://github.com/Subirxgt/Travel-Catalogue"
      branch        = "main"
      build_command = "npm install"
      runtime       = "node"
    }
  }

  lifecycle {
    ignore_changes = [
      env_vars
    ]
  }
}