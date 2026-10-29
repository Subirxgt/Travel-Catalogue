# Cost Estimation — Travel Catalogue

## 1. Architecture

The Travel Catalogue application uses:
- **Render** for application hosting.
- **MongoDB Atlas** for persistent database storage.
- **Cloudinary** for image storage, transformation, and delivery.

## 2. Monthly Usage Assumptions

The following are planning assumptions, not measured production usage.

| Parameter | Assumption |
|---|---:|
| Monthly active users | 500 |
| Requests per user per day | 20 |
| Estimated requests per day | 10,000 |
| Estimated requests per 30-day month | 300,000 |
| Database storage | 100 MB |
| Image storage | 500 MB |
| Application instances | 1 web service |
| Image uploads per month | 20 |
| Average image size | 1 MB |

## 3. Cost Estimation Evidence

The pricing calculator screenshot is attached as evidence.

**Calculator used:** Cloudinary Pricing Calculator  
**Estimated monthly cost:** US$0/month (estimated free-tier cost)
The calculator estimate should be interpreted according to the services and usage categories it covers. The total application cost may also include applicable charges from Render and MongoDB Atlas.

## 4. Conclusion

These assumptions provide a baseline for estimating the monthly resources required by the application. Actual costs depend on provider plans, storage consumption, traffic, image transformations, and applicable usage limits.
