// "mongodb+srv://rutuja:rutuja3562@cluster0.orwkt.mongodb.net/p?retryWrites=true&w=majority"
// const { create } = require("domain");
const express = require("express");
const mongoose = require("mongoose");


const app = express();
app.use(express.json())
const connect = () => {
  return mongoose.connect(
    "mongodb+srv://rutuja:rutuja3562@cluster0.orwkt.mongodb.net/practice1?retryWrites=true&w=majority"
  );
};

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, required: true, default: "female" },
    type: { type: String, default: "customer" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

const branchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bankadress: { type: String, required: true },
    IFSC: { type: Number, required: true },
    MIRC: { type: Number, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Branch = mongoose.model("branch", branchSchema);

const masterSchema = new mongoose.Schema(
  {
    balance: { type: Number, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

const Master = mongoose.model("master", masterSchema);
// account_number ( required and should be unique)
// balance ( required )
// interestRate ( required )
// createdAt (required)
// updatedAt (required)
const savingSchema = new mongoose.Schema(
  {
    account_number: { type: Number, required: true, unique: true },
    savingbalance: { type: Number, required: true },
    interestrate: { type: Number, required: true },
    balance: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Saving = mongoose.model("saving", savingSchema);

const fixedSchema = new mongoose.Schema({
  startDate: { type: String, required: true },
  maturityDate: { type: String, required: true },
  savingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "saving",
    required: true,
  },
},
{
    versionKey:false,
    timestamps:true,
});

const Fixed = mongoose.model("fix", fixedSchema);

app.get("/users", async (req, res) => {
  try {
    const users = await User.find().lean().exec();
    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send({ massege: err.massege });
  }
});


app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).send(user);
  } catch (err) {
    return res.status(500).send({ massege: err.massege });
  }
});

app.get("/masters",async(req,res)=>{
try{
    const masters = await Master.find().populate("userId").lean().exec();
    return res.status(200).send(masters)
}
catch(err){
    return res.status(500).send({massege:err.massege});
}
})

app.post("/masters", async (req, res) => {
  try {
    const masters = await Master.create(req.body);
    return res.status(201).send(masters);
  } catch (err) {
    return res.status(500).send({ massege: err.massege });
  }
});

app.get("/saving", async (req, res) => {
  try {
    const savings = await Saving.find().lean().exec();
    return res.status(200).send(savings);
  } catch (err) {
    return res.status(500).send({ massege: err.massege });
  }
});

app.post("/saving", async (req, res) => {
  try {
    const saving = await Saving.create(req.body);
    return res.status(201).send(saving);
  } catch (err) {
    return res.status(500).send({ massege: err.massege });
  }
});



app.listen(5000, async (req, res) => {
  try {
    await connect();
  } catch (err) {
    console.log("err");
  }
  console.log("Listening on port 5000");
});
