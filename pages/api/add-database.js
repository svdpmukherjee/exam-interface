const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case 'GET': {
      console.log(req.method);
      return getDesign(req, res);
    }

    case 'POST': {
      console.log(req.method);
      return addEntry(req, res);
    }

    case 'PUT': {
      console.log(req.method);
      return updateDesign(req, res);
    }

    case 'OPTIONS': {
      console.log(req.method);
      return addBonus(req, res);
    }

    // case 'UPDATE_DESIGN': {
    //   console.log(req.method);
    //   return updateDesign(req, res);
    // }

    // case 'GET_DESIGN': {
    //   console.log(req.method);
    //   return getDesign(req, res);
    // }
  }
}

async function addEntry(req, res) {
  const data = JSON.parse(req.body);
  try {
    let { db } = await connectToDatabase();
    console.log(data);
    db.collection('demo_exam_interface').insertOne(data);

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

async function getDesign(req, res) {
  try {
    let { db } = await connectToDatabase();
    const data = await db.collection('tracking_db').findOne();
    console.log('design number:', data.design_number);

    return res.json({
      message: data.design_number,
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function updateDesign(req, res) {
  const data = JSON.parse(req.body);
  // const data = req.body;
  // console.log(typeof data);

  try {
    let { db } = await connectToDatabase();
    await db.collection('tracking_db').updateOne(
      { design_number: { $lt: 4 } },
      {
        $set: {
          design_number: data,
        },
      }
    );

    return res.json({
      message: 'updated successfully',
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

// async function trackConditions(req, res) {
//   const data = JSON.parse(req.body);
//   // const data = req.body;
//   // console.log(typeof data);

//   try {
//     let { db } = await connectToDatabase();
//     await db.collection('tracking_db').updateOne(
//       { design_number: { $lt: 4 } },
//       {
//         $set: {
//           design_number: data,
//         },
//         $inc: {
//           // answer: (parseFloat(answer.toFixed(3)) + 0.001).toString(),
//           control: 1,
//           honor: 1,
//           warning: 1,
//           monitoring: 1,
//           total: 1,
//         },
//       }
//     );

//     return res.json({
//       message: 'updated successfully',
//       success: true,
//     });
//   } catch (error) {
//     return res.json({
//       message: new Error(error).message,
//       success: false,
//     });
//   }
// }

async function addBonus(req, res) {
  const data = JSON.parse(req.body);
  try {
    let { db } = await connectToDatabase();
    console.log(data);
    db.collection('bonus_db').insertOne(data);

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
