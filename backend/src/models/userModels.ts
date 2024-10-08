import mongoose,{Schema,Document,Model} from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document{
    name:string;
    email:string;
    password:string;
    profileImage?:string;
    isAdmin?:boolean;
    matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema =new mongoose.Schema<IUser>({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
},{timestamps:true})

userSchema.pre<IUser>('save',async function (next){
    if(!this.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

userSchema.methods.matchPassword = async function (enteredPassword: string){
    return await bcrypt.compare(enteredPassword,this.password);
};

const User = mongoose.model<IUser>('User',userSchema)

export default User;