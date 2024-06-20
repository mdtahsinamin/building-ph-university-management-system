import app from './app';
import config from './app/config';
import mongoose from 'mongoose';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

// unhandledRejection using event (async code)
process.on('unhandledRejection', () => {
  console.log('😒 unhandledRejection is deleted, shutting down ...');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// sync code

process.on('uncaughtException', () => {
  console.log('😬 uncaughtException is deleted, shutting down ...');
  process.exit(1);
});
