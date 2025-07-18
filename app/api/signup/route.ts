import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(request:Request) {

    const {userName , password} = await request.json()

    const existingUser = await prisma.user.findUnique({where : {userName}})

    if(existingUser)
    {
        return NextResponse.json({success : false} ,
{            status : 401
}         )
    }
    
    const hashPassword = await bcrypt.hash(password , 10)

    await prisma.user.create({
        data : {
            userName , 
            password : hashPassword
        }
    })
    return NextResponse.json({success : true})
}