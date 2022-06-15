# NodeJS - Mongo - Express

How to use
- Copy `.env.example` to `.env`
- Run `npm run seed` to seed some dummy record
- Run `npm run dev` for development in watch mode
- Run `npm start` for production
- Run `npm run format` for formatting code


## APIs
- GET `/` - Returns health status.
- GET `/event` - Returns all events, `keyword` query param can be used for filtering.
- POST `/event` - Creates an event.