const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case 'GET': {
      return getPosts(req, res);
    }

    case 'POST': {
      // console.log(req.method);
      return addEntry(req, res);
    }

    case 'PUT': {
      return updateEntry(req, res);
    }

    case 'DELETE': {
      return deleteEntry(req, res);
    }

    case 'TRACK': {
      return trackEntry(req, res);
    }
  }
}

async function addEntry(req, res) {
  const data = JSON.parse(req.body);
  try {
    let { db } = await connectToDatabase();
    //  console.log(req.body);
    //  console.log(JSON.parse(req.body));

    // data.map((curElem) => {
    console.log(data);
    db.collection('exam_interface').insertOne(data);
    // });

    //  db.collection('exam_interface').insertOne(JSON.parse(req.body));

    return res.json({
      message: 'Entry added successfully',
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function trackEntry(req, res) {
  //const data = JSON.parse(req.body);
  // console.log(data);
  try {
    let { db } = await connectToDatabase();
    const data = await db.collection('tracking_db').updateOne({
      $inc: {
        // answer: (parseFloat(answer.toFixed(3)) + 0.001).toString(),
        participant_id: 1,
      },
      $mod: {
        design_number: [$design_number, 4],
      },
    });
    // console.log(answer);
    // data.answer = parseFloat(answer.answer);
    // console.log(data);
    //db.collection('honeypot_website').insertOne(data);

    //  db.collection('exam_interface').insertOne(JSON.parse(req.body));
    // await db.collection('tracking_db').updateOne({
    //   $inc: {
    //     // answer: (parseFloat(answer.toFixed(3)) + 0.001).toString(),
    //     participant_id: 1,
    //     design_number: 1,
    //   },
    // });
    return res.json({
      message: data,
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
