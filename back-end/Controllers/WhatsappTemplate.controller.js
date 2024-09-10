import https from 'https';
import dotenv from 'dotenv';
dotenv.config();

const baseUrl = process.env.BASE_URL;
const authorization = process.env.AUTHORIZATION;

export const getTemplates = (req, res) => {
    console.log("Fetching templates from InfoBip")
    const { senderNumber } = req.query;

    const options = {
        method: 'GET',
        hostname: baseUrl,
        path: `/whatsapp/2/senders/${senderNumber}/templates`,
        headers: {
            'Authorization': `App ${authorization}`,
            'Accept': 'application/json'
        },
        maxRedirects: 20
    };

    // Debugging: Log the request options to verify correctness
    console.log('Request Options:', options);

    const reqGet = https.request(options, function (resGet) {
        let chunks = [];

        resGet.on("data", function (chunk) {
            chunks.push(chunk);
        });

        resGet.on("end", function () {
            const body = Buffer.concat(chunks);
            // Debugging: Log the response status and body
            console.log('Response Status:', resGet.statusCode);
            console.log("Templates Fetched Successfully")
            res.status(resGet.statusCode).json(JSON.parse(body.toString()));
        });

        resGet.on("error", function (error) {
            console.error('Request Error:', error);
            res.status(500).json({ error: error.message });
        });
    });
    reqGet.end();
};

export const getSingleTemplate = (req, res) => {
    console.log("Running the getSingleTemplate function to fetch template")
    const senderNumber = req.query.senderNumber; // Extract senderNumber from query string
  const templateId = req.query.templateId;
    const options = {
      method: 'GET',
      hostname: baseUrl,
      path: `/whatsapp/2/senders/${senderNumber}/templates/${templateId}`,
      headers: {
        'Authorization': `App ${authorization}`,
        'Accept': 'application/json'
      },
      maxRedirects: 20
    };
  
    const reqGet = https.request(options, function (resGet) {
      let chunks = [];
  
      resGet.on("data", function (chunk) {
        chunks.push(chunk);
      });
  
      resGet.on("end", function () {
        const body = Buffer.concat(chunks);
        res.status(resGet.statusCode).json(JSON.parse(body.toString()));
      });
  
      resGet.on("error", function (error) {
        console.error('Request Error:', error);
        res.status(500).json({ error: error.message });
      });
    });
  
    reqGet.end();
  };
  


// Template creating logic function

export const createTemplate = (req, res) => {
    const { senderNumber, name, language, category, allowCategoryChange, structure } = req.body;

    const postData = JSON.stringify({
        name,
        language,
        category,
        allowCategoryChange,
        structure
    });

    const options = {
        method: 'POST',
        hostname: baseUrl,
        path: `/whatsapp/2/senders/${senderNumber}/templates`,
        headers: {
            'Authorization': `App ${authorization}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        maxRedirects: 20
    };

    // Debugging: Log the request options and data to verify correctness
    console.log('Request Options:', options);
    console.log('Post Data:', postData);

    const reqPost = https.request(options, function (resPost) {
        let chunks = [];

        resPost.on("data", function (chunk) {
            chunks.push(chunk);
        });

        resPost.on("end", function () {
            const body = Buffer.concat(chunks);
            // Debugging: Log the response status and body
            console.log('Response Status:', resPost.statusCode);
            console.log('Response Body:', body.toString());
            res.status(resPost.statusCode).json(JSON.parse(body.toString()));
        });

        resPost.on("error", function (error) {
            console.error('Request Error:', error);
            res.status(500).json({ error: error.message });
        });
    });

    reqPost.write(postData);
    reqPost.end();
};


//Modify template

export const modifyTemplate = (req, res) => {
    const { senderNumber, templateId, name, language, category, allowCategoryChange, structure } = req.body;

    const patchData = JSON.stringify({
        name,
        language,
        category,
        allowCategoryChange,
        structure
    });

    const options = {
        method: 'PATCH',
        hostname: baseUrl,
        path: `/whatsapp/2/senders/${senderNumber}/templates/${templateId}`,
        headers: {
            'Authorization': `App ${authorization}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        maxRedirects: 20
    };

    // Debugging: Log the request options and data to verify correctness
    console.log('Request Options:', options);
    console.log('Patch Data:', patchData);

    const reqPatch = https.request(options, function (resPatch) {
        let chunks = [];

        resPatch.on("data", function (chunk) {
            chunks.push(chunk);
        });

        resPatch.on("end", function () {
            const body = Buffer.concat(chunks);
            // Debugging: Log the response status and body
            console.log('Response Status:', resPatch.statusCode);
            console.log('Response Body:', body.toString());
            res.status(resPatch.statusCode).json(JSON.parse(body.toString()));
        });

        resPatch.on("error", function (error) {
            console.error('Request Error:', error);
            res.status(500).json({ error: error.message });
        });
    });

    reqPatch.write(patchData);
    reqPatch.end();
};









//Template delete function
export const deleteTemplate = (req, res) => {
    const { senderNumber } = req.body;
    const { id } = req.params;

    const options = {
        method: 'DELETE',
        hostname: baseUrl,
        path: `/whatsapp/2/senders/${senderNumber}/templates/${id}`,
        headers: {
            'Authorization': `App ${authorization}`,
            'Accept': 'application/json'
        },
        maxRedirects: 20
    };

    // Debugging: Log the request options to verify correctness
    console.log('Request Options:', options);

    const reqDelete = https.request(options, function (resDelete) {
        let chunks = [];

        resDelete.on("data", function (chunk) {
            chunks.push(chunk);
        });

        resDelete.on("end", function () {
            const body = Buffer.concat(chunks);
            // Debugging: Log the response status and body
            console.log('Response Status:', resDelete.statusCode);
            console.log('Response Body:', body.toString());
            res.status(resDelete.statusCode).json(JSON.parse(body.toString()));
        });

        resDelete.on("error", function (error) {
            console.error('Request Error:', error);
            res.status(500).json({ error: error.message });
        });
    });

    reqDelete.end();
};


// Logic to retrive WhatsApp users

// Import the User model from the correct path
import WhatsAppUser from '../Models/Whatsapp.model.js'; // Adjust the path if necessary


// Controller to fetch all users
export const getUsers = async (req, res) => {
  try {
    const users = await WhatsAppUser.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// Controller to upload user data
export const uploadUserData = async (req, res) => {
  try {
    const users = req.body;  // Assuming req.body is an array of users

    // Log the incoming data for debugging
    console.log('Incoming user data:', users);

    // Validate the incoming user data
    users.forEach(user => {
      if (!user.name || user.whatsappNumber === undefined) {
        throw new Error('Validation failed: Name and whatsappNumber are required');
      }
    });

    // Insert users into the database
    const savedUsers = await WhatsAppUser.insertMany(users);
    res.status(201).json(savedUsers);
  } catch (error) {
    console.error('Error uploading users:', error);
    res.status(500).json({ message: 'Failed to upload users', error: error.message });
  }
};
// Logic function to send message
export const sendMessage = (req, res) => {
    console.log("This is the data recieved at be: ",req.body)
    try {
        const {
            from,
            to,
            messageId,
            templateName,
            placeholders,
            language,
            callbackData,
            notifyUrl,
            urlOptions
        } = req.body;

        if (!from || !to || !messageId || !templateName || !language) {
            console.log(from,to,messageId,templateName,language)
            throw new Error('Missing required fields');
        }

        const postData = JSON.stringify({
            messages: [
                {
                    from,
                    to,
                    messageId,
                    content: {
                        templateName,
                        templateData: {
                            body: { placeholders }
                        },
                        language
                    },
                    callbackData,
                    notifyUrl,
                    urlOptions
                }
            ]
        });

        const options = {
            method: 'POST',
            hostname: baseUrl,
            path: '/whatsapp/1/message/template',
            headers: {
                'Authorization': `App ${authorization}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            maxRedirects: 20
        };

        const reqPost = https.request(options, function (resPost) {
            let chunks = [];

            resPost.on("data", function (chunk) {
                chunks.push(chunk);
            });

            resPost.on("end", function () {
                const body = Buffer.concat(chunks);
                console.log('Response Status:', resPost.statusCode);
                console.log('Response Body:', body.toString());
                res.status(resPost.statusCode).json(JSON.parse(body.toString()));
            });

            resPost.on("error", function (error) {
                console.error('Request Error:', error);
                res.status(500).json({ error: error.message });
            });
        });

        reqPost.on('error', (error) => {
            console.error('Request Error:', error);
            res.status(500).json({ error: error.message });
        });

        reqPost.write(postData);
        reqPost.end();
    } catch (error) {
        console.error('Error in sendMessage:', error);
        res.status(400).json({ error: error.message });
    }
};
