import express from "express";
import cors from "cors";

import router from "./routes";

import connectDB from "./utils/db";

const app = express();

// Use cors
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// This allows us to access the body of POST/PUT
// requests in our route handlers (as req.body)
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api", router);

async function start() {
  try {
    // Connect to the database
    await connectDB();

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });

    // Add all the routes to our Express server
    // routes(app);
  } catch (err: unknown) {
    let errorMessage = "Something went wrong.";

    if (err instanceof Error) {
      errorMessage += " Error: " + err.message;
    } else {
      errorMessage += " Error: " + err;
    }

    console.log(errorMessage);
  }
}

void start();
