import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import user from "../model/user.js";
import { response } from 'express';
import Token from '../model/token.js';

dotenv.config();

export const signupUser = async(request, response) => {
    try{
        const user =request.body;

       const newUser = new User(user);
       await newUser.save();

       return response.status(200).json({msg:'sign successful'})
    }catch(error){
        return response.status(500).json({msg: 'Error while signup the user'})
    }

}

export const  loginUser = async(request, response) => {
    let user = await User.findOne({username :request.body.username});
    if(!user){
        response.status(400).json({msg:'username doesn not exit'});
    }

    try{
      let match= await bcrypt.compare(request.body.password, user.password);
      if(match){
        const accessToken=jwt.sign(user.tojson(), process.env.ACCESS_SECRET_KEY,{expiresIn: '15m'});
        const refreshToken=jwt.sign(user.tojson(), process.env.REFRESH_SECRET_KEY);

        const newToken=new Token({token :refreshToken})
        await newToken.save();

        return response.status(200).json({accessToken: accessToken,refreshToken: refreshToken, name: user.name,username:user.username})
      } else {
        return response.status(400).json({msg:'password does not match'});
      }
    }catch(error){
      return response.status(500).json({msg:'Error while login in user'});
    }
}