import User from "../Models/user.model.js";


const AddUsers = async (req, res) => {
    try {
        const  data  = req.body;
        
        for(let i = 0; i < data.length; i++) {
            const {name,phoneNumber} = data[i];
            const newUser = await User.findOne({phoneNumber})
            if(newUser) {
                continue;
            }
            const user = new User({
                name,
                phoneNumber

            });
            await user.save();
        }

        res.status(201).json({ 
            success: true,
            message: "Users added successfully" 
        });
    } catch (error) {
        
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }   
}   


const GetUsers = async (req, res) => {

    try {
        const users = await User.find();

      
        res.status(200).json({ 
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}


export { AddUsers, GetUsers };