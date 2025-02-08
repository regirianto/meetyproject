import express from "express";
import db from "../config/db.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Save base-profile input
router.post("/base-profile", (req, res) => {
  console.log("Received Data: ", req.body);

  const { userId, firstName, birthDate, gender } = req.body;

  if (!userId || !firstName || !gender || !birthDate) {
    console.log("❌ Missing required fields");
    return res.status(400).json({ error: "All fields are required!" });
  }

  const query =
    "INSERT INTO profiles (user_id, name, gender, birth_date) VALUES (?, ?, ?, ?)";

  console.log("🛠 Executing Query:", query, [
    userId,
    firstName,
    gender,
    birthDate,
  ]); // ✅ Log query data

  db.query(query, [userId, firstName, gender, birthDate], (err, result) => {
    if (err) {
      console.error("❌ Database Error:", err.message);
      res.status(500).json({ error: err.message });
    }
    console.log("✅ Profile Saved:", result);
    res
      .status(201)
      .json({ message: "Profile Saved", profileId: result.insertId });
  });
});

// Get all interests
router.get("/interests", (req, res) => {
  const query = "SELECT * FROM interests";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Save User Interests
router.post("/activity", (req, res) => {
  console.log("Recieved Data: ", req.body);

  const { profileId, interestId } = req.body;

  if (!profileId || !interestId || !interestId.length) {
    console.log("❌ Missing data: ", req.body);
    return res
      .status(400)
      .json({ error: "Please select at least one interest" });
  }

  const values = interestId.map((interestId) => [profileId, interestId]);

  const query = "INSERT INTO user_interests (profile_id, interest_id) VALUES ?";
  db.query(query, [values], (err, result) => {
    if (err) {
      console.error("❌ Database Error:", err.message);
      return res.status(500).json({ error: err.message });
    }
    console.log("✅ Interests Saved:", result);
    res.status(201).json({ message: "Interests saved!" });
  });
});

// Get Photo Profile

// Multer Config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Save Photo
router.post("/set-photo", upload.array("photos", 6), (req, res) => {
  const { profileId } = req.body;

  // Check if profileId is provided and if files are uploaded
  if (!profileId || !req.files || req.files.length === 0) {
    return res.status(400).json({ error: "Please select a photo" });
  }

  // Extract file paths from uploaded files
  const photoPaths = req.files.map((file) => file.filename);

  // Prepare values for bulk insert into the gallery table
  const values = photoPaths.map((photoPath) => [profileId, photoPath]);
  const query = "INSERT INTO gallery (profile_id, image) VALUES ?";

  // Insert the photos into the gallery
  db.query(query, [values], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    // Respond with success message and uploaded file paths
    res.status(201).json({
      message: "Photos Uploaded!",
      uploadedFiles: photoPaths.map(
        (filename) => `http://localhost:5000/uploads/${filename}`
      ), // Return full URLs
    });
  });
});

// Profile Page
router.get("/user-profile/:userId", (req, res) => {
  const { userId } = req.params;

  // fetch profile details
  const profileQuery = `
    SELECT p.id AS profile_id, 
    p.name, 
    DATE_FORMAT(p.birth_date, '%Y-%m-%d') AS birth_date, 
    p.gender,
    COALESCE(p.bio, 'Add bio') AS bio, 
    COALESCE(p.about, 'Add your profile') AS about, 
    u.phone, 
    u.email, 
    p.last_active_at,
    COALESCE((SELECT COUNT(*) FROM user_likes WHERE liked_id = p.user_id), 0) AS liked_you_count,
    COALESCE((SELECT COUNT(*) FROM user_likes WHERE liker_id = p.user_id), 0) AS you_liked_count 
    FROM profiles p 
    JOIN users u 
    ON p.user_id = u.id 
    WHERE p.user_id = ?
  `;

  db.query(profileQuery, [userId], (err, profileResults) => {
    if (err) {
      console.error("❌ Database Error (Profile):", err.message);
      return res.status(500).json({ error: err.message });
    }
    if (profileResults.length === 0) {
      return res.status(404).json({ error: "Profile not found" });
    }

    let profile = profileResults[0];

    // Log the profile object
    console.log("Profile Data:", profile);

    // Convert birth_date to age
    const birthDate = new Date(profile.birth_date);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    profile.age = age;
    delete profile.birth_date;

    // fetch first profile photo
    const photoQuery = `
      SELECT image FROM gallery WHERE profile_id = ? ORDER BY id ASC LIMIT 1
    `;

    db.query(photoQuery, [profile.profile_id], (err, photoResults) => {
      if (err) {
        console.error("❌ Database Error (Photo):", err.message);
        return res.status(500).json({ error: err.message });
      }

      profile.photo_profile =
        photoResults.length > 0
          ? `http://localhost:5000/uploads/${photoResults[0].image}`
          : null;

      // Fetch user interest
      const interestsQuery = `
        SELECT i.id, i.interest_name FROM user_interests ui JOIN interests i ON ui.interest_id = i.id WHERE ui.profile_id = ?
      `;

      db.query(
        interestsQuery,
        [profile.profile_id],
        (err, interestsResults) => {
          if (err) {
            console.error("❌ Database Error (Interests):", err.message);
            return res.status(500).json({ error: err.message });
          }

          profile.interests = interestsResults;

          // all gallery
          const galleryQuery = `
            SELECT image FROM gallery WHERE profile_id = ? ORDER BY id DESC
          `;

          db.query(
            galleryQuery,
            [profile.profile_id],
            (err, galleryResults) => {
              if (err) {
                console.error("❌ Database Error (Gallery):", err.message);
                return res.status(500).json({ error: err.message });
              }

              profile.gallery = galleryResults.map(
                (img) => `http://localhost:5000/uploads/${img.image}`
              );

              // Return profile
              res.json(profile);
            }
          );
        }
      );
    });
  });
});

// Edit Profile
router.put("/edit-profile/:userId", upload.single("photo"), (req, res) => {
  const { userId } = req.params;
  const { name, bio, about, gender, birth_date, phone, email, interests } =
    req.body;
  const newPhoto = req.file ? req.file.filename : null;

  // Debugging
  console.log("Received Data: ", req.body);
  console.log("🛠 Updating Profile for user:", userId, "New Photo:", newPhoto);
  console.log("📋 Form Data:", req.body);

  // Update profile info
  const updateQuery = `
    UPDATE profiles SET name = ?, bio = ?, about = ?, gender = ?, birth_date = ? WHERE user_id = ?
  `;

  db.query(
    updateQuery,
    [name, bio, about, gender, birth_date, userId],
    (err, result) => {
      if (err) {
        console.error("❌ Database Error (Profile Update):", err.message);
        return res.status(500).json({ error: err.message });
      }

      // Update user phone & email from users table
      const updateUserQuery = `
      UPDATE users SET phone = ?, email = ? WHERE id = ?
    `;

      db.query(updateUserQuery, [phone, email, userId], (err) => {
        if (err) {
          console.error("❌ Database Error (User Update):", err.message);
          return res.status(500).json({ error: err.message });
        }

        // Update profile picture if provided
        if (newPhoto) {
          console.log("📸 New photo uploaded:", newPhoto);

          const updatePhotoQuery = `
          INSERT INTO gallery (profile_id, image) VALUES ((SELECT id FROM profiles WHERE user_id = ? ), ?)
        `;

          db.query(updatePhotoQuery, [userId, newPhoto], (err) => {
            if (err) {
              console.error("❌ Database Error (Photo Upload):", err.message);
              return res.status(500).json({ error: err.message });
            }

            console.log("✅ Profile photo updated:", newPhoto);
          });
        }

        // Update interest
        if (interests) {
          const profileQuery = `SELECT id FROM profiles WHERE user_id = ?`;
          db.query(profileQuery, [userId], (err, profileResults) => {
            if (err) return res.status(500).json({ error: err.message });

            const profileId = profileResults[0].id;
            // fetch current interests
            const getExistingInterestQuery = `SELECT interest_id FROM user_interests WHERE profile_id = ?`;
            db.query(
              getExistingInterestQuery,
              [profileId],
              (err, existingInterestsResults) => {
                if (err) return res.status(500).json({ error: err.message });

                const existingInterests = existingInterestsResults.map(
                  (row) => row.interest_id
                );
                const newInterests = JSON.parse(interests).map(Number);

                // Find interests to add and remove
                const interestsToAdd = newInterests.filter(
                  (id) => !existingInterests.includes(id)
                );
                const interestsToRemove = existingInterests.filter(
                  (id) => !newInterests.includes(id)
                );

                // Add new Interests
                if (interestsToAdd.length > 0) {
                  const insertQuery = `INSERT INTO user_interests (profile_id, interest_id) VALUES ?`;
                  const values = interestsToAdd.map((id) => [profileId, id]);
                  db.query(insertQuery, [values], (err) => {
                    if (err)
                      return res.status(500).json({ error: err.message });
                  });
                }

                // Remove unselected interests
                if (interestsToRemove.length > 0) {
                  const deleteQuery = `DELETE FROM user_interests WHERE profile_id = ? AND interest_id IN (?)`;
                  db.query(
                    deleteQuery,
                    [profileId, interestsToRemove],
                    (err) => {
                      if (err)
                        return res.status(500).json({ error: err.message });
                    }
                  );
                }

                // ✅ Send success response **only once**
                console.log("✅ Profile updated successfully!");
                return res.status(200).json({
                  message: "Profile updated successfully!",
                  newProfilePhoto: newPhoto
                    ? `http://localhost:5000/uploads/${newPhoto}`
                    : null,
                });
              }
            );
          });
        } else {
          res.status(200).json({ message: "Profile updated successfully!" });
        }
      });
    }
  );
});

// Get List of Opposite Gender Profiles
router.get("/home/:userId", (req, res) => {
  const { userId } = req.params;

  // get user right now
  const getUserGenderQuery = `SELECT gender FROM profiles WHERE user_id = ?`;

  db.query(getUserGenderQuery, [userId], (err, userResult) => {
    if (err) {
      console.error("❌ Database Error (Get User Gender):", err.message);
      return res.status(500).json({ error: err.message });
    }

    if (userResult.length === 0) {
      return res.status(404).json({ error: "User profile not found" });
    }

    const userGender = userResult[0].gender;
    const targetGender = userGender === "male" ? "female" : "male"; // Lawan jenis

    // ✅ Ambil daftar user lawan jenis
    const getProfilesQuery = `
      SELECT 
        p.id AS profile_id, 
        p.user_id,
        p.name, 
        p.gender, 
        p.birth_date, 
        p.bio, 
        p.about, 
        (SELECT image FROM gallery WHERE profile_id = p.id ORDER BY id ASC LIMIT 1) AS photo_profile,
        CASE
          WHEN EXISTS (SELECT 1 FROM user_likes WHERE liked_id = p.user_id AND liked_id = ?)
          THEN 1 ELSE 0
        END AS liked_you
      FROM profiles p 
      WHERE p.gender = ? 
        AND p.user_id != ? 
        AND p.user_id NOT IN (SELECT liked_id FROM user_likes WHERE liker_id = ?)
      ORDER BY liked_you DESC, p.id ASC
      LIMIT 10
    `;

    db.query(
      getProfilesQuery,
      [userId, targetGender, userId, userId],
      (err, profiles) => {
        if (err) {
          console.error("❌ Database Error (Fetching Profiles):", err.message);
          return res.status(500).json({ error: err.message });
        }

        // ✅ Konversi birth_date ke usia
        const profilesWithAge = profiles.map((profile) => {
          const birthDate = new Date(profile.birth_date);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          if (
            today.getMonth() < birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() &&
              today.getDate() < birthDate.getDate())
          ) {
            age--;
          }

          return {
            ...profile,
            age,
            photo_profile: profile.photo_profile
              ? `http://localhost:5000/uploads/${profile.photo_profile}`
              : null,
            gallery: [],
            interests: [],
          };
        });

        // Fetch gallery and interests
        const profileIds = profilesWithAge.map((p) => p.profile_id);
        if (profileIds.length === 0) return res.json(profilesWithAge);

        // fetch gallery images
        const getGalleryQuery = `
        SELECT profile_id, image FROM gallery 
        WHERE profile_id IN (?) 
        ORDER BY id ASC
      `;

        db.query(getGalleryQuery, [profileIds], (err, galleryResults) => {
          if (err) {
            console.error("❌ Database Error (Fetching Gallery):", err.message);
            return res.status(500).json({ error: err.message });
          }

          // Group gallery images by profile_id
          const galleryMap = {};
          galleryResults.forEach(({ profile_id, image }) => {
            if (!galleryMap[profile_id]) galleryMap[profile_id] = [];
            galleryMap[profile_id].push(
              `http://localhost:5000/uploads/${image}`
            );
          });

          // ✅ Fetch interests
          const getInterestsQuery = `
          SELECT ui.profile_id, i.interest_name
          FROM user_interests ui
          JOIN interests i ON ui.interest_id = i.id
          WHERE ui.profile_id IN (?)
        `;

          db.query(getInterestsQuery, [profileIds], (err, interestResults) => {
            if (err) {
              console.error(
                "❌ Database Error (Fetching Interests):",
                err.message
              );
              return res.status(500).json({ error: err.message });
            }

            // Group interests by profile_id
            const interestMap = {};
            interestResults.forEach(({ profile_id, interest_name }) => {
              if (!interestMap[profile_id]) interestMap[profile_id] = [];
              interestMap[profile_id].push(interest_name);
            });

            // ✅ Merge gallery and interests into profiles
            const finalProfiles = profilesWithAge.map((profile) => ({
              ...profile,
              gallery: galleryMap[profile.profile_id] || [],
              interests: interestMap[profile.profile_id] || [],
            }));

            res.json(finalProfiles);
          });
        });
      }
    );
  });
});

// Delete account
router.delete("/delete-account/:userId", (req, res) => {
  const { userId } = req.params;

  // SQL query to delete the user from the profiles and users table
  const deleteUserQuery = `
    DELETE FROM profiles WHERE user_id = ?;
    DELETE FROM users WHERE id = ?;
  `;

  db.query(deleteUserQuery, [userId, userId], (err, result) => {
    if (err) {
      console.error("❌ Database Error (Delete Account):", err.message);
      return res.status(500).json({ error: err.message });
    }

    res.status(200).json({ message: "Account deleted successfully." });
  });
});

export default router;
