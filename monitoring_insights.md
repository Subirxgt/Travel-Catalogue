# Monitoring Insights — Travel Catalogue

## 1. Testing Methodology

Locust was used to simulate HTTP traffic against the deployed Travel Catalogue application. The test targeted the homepage (`/`) and health endpoint (`/health`).

The test used five simulated users with a spawn rate of one user per second.

## 2. Observed Results

| Metric | Observed result |
|---|---:|
| Total requests | 189 |
| Failed requests | 0 |
| Homepage requests | 148 |
| Health-check requests | 41 |
| Overall median response time | 520 ms |
| Overall 95th-percentile response time | 1,100 ms |
| Approximate throughput | 2.5 requests/second |
| Homepage 99th-percentile response time | 22,000 ms |
| Health-check 99th-percentile response time | 21,000 ms |

## 3. Insights

1. **Request success:** No failed requests were recorded during the test.
2. **Typical response time:** The overall median response time was approximately 520 ms, while the 95th-percentile response time was approximately 1,100 ms.
3. **High tail latency:** The 99th-percentile response times were significantly higher than typical response times and warrant further investigation.
4. **Test limitations:** Only five simulated users were used. This test does not establish maximum capacity or performance under production-scale traffic.
5. **Recommended follow-up:** Repeat the test and compare slow requests with application logs and available hosting metrics to investigate possible causes.

## 4. Conclusion

The application handled the tested workload without recorded request failures. However, the high 99th-percentile response times indicate that additional performance investigation would be beneficial before drawing conclusions about performance under heavier workloads.

## 5. Supporting Evidence

The submission includes Locust statistics, charts, execution logs, and relevant hosting logs.
