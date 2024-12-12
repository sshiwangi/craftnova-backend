import express, { Request, Response, Router } from "express";
import { userService } from "../services/userService";

const router = express.Router();

interface UserRequestParams {
  id: string;
}

interface SyncUserBody {
  id: string;
  email: string;
  name?: string;
  imageUrl?: string;
}

interface PreferencesBody {
  [key: string]: any;
}

router.post("/sync", (req: Request<{}, {}, SyncUserBody>, res: Response) => {
  userService
    .createOrUpdateUser(req.body)
    .then((user) => res.json(user))
    .catch((error) => {
      console.error("Error syncing user:", error);
      res.status(500).json({ error: "Failed to sync user data" });
    });
});

router.get("/:id", (req: Request<UserRequestParams>, res: Response) => {
  userService
    .getUserById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    })
    .catch((error) => {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Failed to fetch user" });
    });
});

router.patch(
  "/:id/preferences",
  (req: Request<UserRequestParams, {}, PreferencesBody>, res: Response) => {
    userService
      .updateUserPreferences(req.params.id, req.body)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
      })
      .catch((error) => {
        console.error("Error updating preferences:", error);
        res.status(500).json({ error: "Failed to update preferences" });
      });
  }
);

export default router;
