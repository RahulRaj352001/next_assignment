# Trip Planner API (Fastify + TypeScript + MongoDB)

## Quick Start

```bash
cp .env.example .env
# set MONGODB_URI in .env if needed
npm install
npm run dev
# Server -> http://localhost:5000
```

## API Examples

### Health

```bash
curl http://localhost:5000/api/health
```

### Create Trip

```bash
curl -X POST http://localhost:5000/api/trips \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Goa Getaway",
    "destination": "Goa",
    "days": 4,
    "budget": 25000
  }'
```

### List Trips (with pagination/filter)

```bash
# page=1, limit=10
curl "http://localhost:5000/api/trips?page=1&limit=10"

# filter by destination containing 'goa' (case-insensitive)
curl "http://localhost:5000/api/trips?destination=goa"

# filter by budget range
curl "http://localhost:5000/api/trips?minBudget=10000&maxBudget=30000"
```

### Update Trip

```bash
# Replace <id> with the _id from a created trip
curl -X PUT http://localhost:5000/api/trips/<id> \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Goa Trip",
    "destination": "Goa",
    "days": 5,
    "budget": 28000
  }'
```

## Development

```bash
npm run dev    # Start development server
npm run build  # Build TypeScript
npm start      # Start production server
npm test       # Run tests
```
