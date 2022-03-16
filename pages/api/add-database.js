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
      return addPost(req, res);
    }

    case 'PUT': {
      return updatePost(req, res);
    }

    case 'DELETE': {
      return deletePost(req, res);
    }
  }
}

async function addPost(req, res) {
  try {
    let { db } = await connectToDatabase();
    //  console.log(req.body);
    //  console.log(JSON.parse(req.body));
    let data = JSON.parse(req.body);
    data.map((curElem) => {
      // console.log(curElem);
      db.collection('exam_interface').insertOne(curElem);
    });

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
