## Steps to run

### 1. Start the Electric + Postgres Docker:
```
cd electric
npm i

npm run dev
```

### 2. Migrate schema, then seed data
```
# Schema + Electrify
npm run migrate

# Data, lots of it from ./electric/migrations/data/makkuro_production.sql
npm run seed
```

### 3. Run the frontend app
It's build with SolidJS, runs on Vite.
```
cd ../frontend-app
npm i

npm run client:generate

npm run dev
```