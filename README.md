# BFHL API

A REST API for the BFHL challenge built with Express.js.
Link-- https://bajaj-finser-sigma.vercel.app/
## Features

- POST `/bfhl`: Process an array of mixed data and return categorized results.
- GET `/bfhl`: Health check endpoint.
- GET `/health`: API status and timestamp.

## Getting Started

### Prerequisites

- Node.js >= 14

### Installation

```sh
npm install
```

### Running the Server

```sh
npm start
```

test
```

## API Endpoints

### POST `/bfhl`

**Request Body:**
```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

**Response:**
```json
{
  "is_success": true,
  "user_id": "kartikesh_singh_13092004",
  "email": "kartikeshsingh2022@vitbhopal.ac.in",
  "roll_number": "22BSA10321",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "R1A"
}
```

### GET `/bfhl`

Returns operation code.

### GET `/health`

Returns API status and
