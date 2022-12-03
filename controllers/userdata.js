import userData from '../models/userdata.js';

//count how many data in the database
export const ProfilesCount = async(req, res)=>{
    try {
        const counts = await userData.find({}).estimatedDocumentCount();
        res.json(counts);
    } catch (error) {
        console.log(error);
    }
}
//data loading based on pagination
export const Profiles = async(req, res)=>{
    try {
        const perPage = 15;
      const page = req.params.page// req.params.page:1; //means by default 1
       const profiles = await userData.find({}).
       select("-id")//when i had inserted dummy data on databse unfortunately dummy data had own id , so here i have deselect that id
       .skip((page-1) * perPage)
       .limit(perPage)
       .sort({firstName:1})
       if(profiles){
          res.json(profiles)
       }else{
       return res.json({error:"sorry unaible to get data"})
       }
    } catch (error) {
        console.log(error)
    }
   
};

//Searching profiles by keyword
export const searchProfiles = async(req, res)=>{
    try {
        const {keyword} = req.params;
       // const perPage = 15;
        const searchResult = await userData.find({
            $or: [
                { firstName: { $regex: keyword, $options: "i" } },
                { lastName: { $regex: keyword, $options: "i" } },
                { country: { $regex: keyword, $options: "i" } },
              ],
        })
        .select("-id")
       .sort({firstName:1})
        if(searchResult){
            res.json(searchResult)
        }else{
            res.json({error:"Data Not Found"})
        }
    } catch (error) {
        console.log(error)
    }
}


