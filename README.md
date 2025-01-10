# Cryptocurrency Stats API

This API fetches real-time cryptocurrency data (Bitcoin, Matic, Ethereum) including price, market cap, and 24-hour change. It stores the data in MongoDB and provides endpoints to access it.

## Features

- Background job fetches cryptocurrency data every 2 hours.
- Provides real-time cryptocurrency data via API.
- Calculates the standard deviation of the price for the last 100 records.

## Test APIs

To test the API, use the following deployed link and `curl` commands.

#### Test Latest Data

To fetch the latest stats for Bitcoin:

```bash
curl "http://13.127.104.30/stats?coin=bitcoin"
```

#### Test Standard Deviation
To fetch the price deviation for the last 100 records for Bitcoin:

```bash
curl "http://13.127.104.30/stats/deviation?coin=bitcoin"
```
Example output:

```json
{
    "deviation": 4082.48
}
```

## API Endpoints

### 1. **GET /api/v1/stats**

Fetch the latest data for a selected cryptocurrency.

#### Query Parameters

- `coin` (required): The cryptocurrency name (e.g., `bitcoin`, `matic-network`, `ethereum`).

#### Example Request

```http
GET /api/v1/stats?coin=bitcoin
```

#### Reponse
```
{
    "price": 40000,
    "marketCap": 800000000,
    "24hChange": 3.4
}
```

### 2. GET /api/v1/deviation
Fetch the standard deviation of the price for the selected cryptocurrency for the last 100 records.

#### Query Parameters
- `coin` (required): The cryptocurrency name (e.g., `bitcoin`, `matic-network`, `ethereum`).

#### Example Request
```http
GET /api/v1/deviation?coin=bitcoin
```
#### Example Response
```
{
    "deviation": 4082.48
}
```



