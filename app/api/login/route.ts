import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';


const prisma = new PrismaClient();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET!;
const accessTokenExpiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN!;
const refreshTokenExpiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN!;

export async function POST(request : Request) {

    const {userName , password} = await request.json();

    const user = await prisma.user.findUnique({where : {userName}})

    if (!user)
    {
        return NextResponse.json({success : false , error :"Invalid USerName"},
            {status : 401}
        )
    }

    const pass = await bcrypt.compare(password , user.password)

    if(!pass)
    {
        return NextResponse.json({success : false , error : "invalid Password" },
            {
                status : 401
            }
        )
    }

    const accessToken = jwt.sign({userName}, accessTokenSecret , {expiresIn : accessTokenExpiresIn} )

    const refreshToken = jwt.sign({userName}, refreshTokenSecret , {expiresIn : refreshTokenExpiresIn})

const cookieStore = await cookies();
cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 // 1 hour
});
cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 // 7 days
});



    return NextResponse.json({success : true })
}
    
