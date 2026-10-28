
from locust import HttpUser, task, between


class TravelCatalogueUser(HttpUser):
    # Wait between 1 and 3 seconds between tasks
    wait_time = between(1, 3)

    @task(3)
    def visit_homepage(self):
        self.client.get("/", name="Homepage")

    @task(1)
    def check_health(self):
        self.client.get("/health", name="Health check")
