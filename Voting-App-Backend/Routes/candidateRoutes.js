const express = require("express");
const Candidate = require("../Models/candidate");
const User = require("../Models/user");
const { jwtAuthMiddleware } = require("../jwt");

const router = express();

const checkAdminRole = async (userID) => {
  try {
    const user = await User.findById(userID);
    return user.role === "admin";
  } catch (error) {
    return false;
  }
};

//LIST CANDIDATES
router.get("/", async (req, res) => {
  try {
    const candidate = await Candidate.find();

    const candidateList = candidate.map((data) => {
      return {
        id: data.id,
        name: data.name,
        party: data.party,
        age: data.age,
        voteCount: data.voteCount,
        partyLogo: data.partyLogo
      };
    });
    res.status(200).json({response:candidateList, message:"Candidates Fetched Successfully"});
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    if (!(await checkAdminRole(userId))) {
      return res.status(403).json({ message: "Unauthorized Access" });
    }
    const data = req.body;
    const newCandidate = new Candidate(data);
    const candidate = await newCandidate.save();
    const candidateData = {
      id:candidate.id,
      name:candidate.name,
      age: candidate.age,
      party:candidate.party
    }
    res.status(200).json({response:candidateData,message:"Candidate Added Successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:candidateId", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    if (!(await checkAdminRole(userId))) {
      return res.status(403).json({ message: "Unauthorized Access" });
    }
    const candidateId = req.params.candidateId;
    const candidateData = req.body;
    const candidate = await Candidate.findByIdAndUpdate(
      candidateId,
      candidateData,
      { new: true, runValidators: true }
    );
    if (!candidate) {
      return res.status(404).json({ message: "Candidate Not Found" });
    }

    const updatedCandidateData = {
      id:candidate.id,
      name:candidate.name,
      age: candidate.age,
      party:candidate.party
    }
    res.status(200).json({ response: updatedCandidateData, message: "Candidate updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:candidateId", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    if (!(await checkAdminRole(userId))) {
      return res.status(403).json({ message: "Unauthorized Access" });
    }
    const candidateId = req.params.candidateId;
    const response = await Candidate.findByIdAndDelete(candidateId);
    if (!response) {
      return res.status(404).json({ message: "Candidate Not Found" });
    }
    res.status(200).json({ message: "Candidate Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//VOTING

router.post("/vote/:candidateId", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const candidateId = req.params.candidateId;

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate Not Found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    if (user.role === "admin") {
      return res.status(403).json({ message: "Admin Cannot Vote" });
    }
    if (user.isVoted) {
      return res.status(400).json({ message: "User Already Voted" });
    }

    candidate.votes.push({ user: userId });
    candidate.voteCount++;
    await candidate.save();

    user.isVoted = true;
    await user.save();
    res.status(200).json({ message: "Vote Recorded Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/vote/count", async (req, res) => {
  try {
    const candidate = await Candidate.find().sort({ voteCount: "desc" });
    const voteRecord = candidate.map((data) => {
      return {
        id: data.id,
        party: data.party,
        count: data.voteCount,
        partyLogo: data.partyLogo
      };
    });
    return res.status(200).json({response:voteRecord, message: "Vote counts fetched successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
