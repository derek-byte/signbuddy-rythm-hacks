import startDb from "@/lib/db";
import UserModel from "@/models/userModel";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const body = await req.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!name || !/^\S+@\S+\.\S+$/.test(email) || password.length < 8) {
        return NextResponse.json(
            {error: "Enter a name, valid email, and password of at least 8 characters"},
            {status: 400}
        );
    }

    await startDb();

    const oldUser = await UserModel.findOne({email});

    if (oldUser) {
        return NextResponse.json(
            {error: "email already in use"},
            {status: 422}
        );
    }

    const user = await UserModel.create({name, email, password});

    return NextResponse.json({
        user: {
            id: user._id.toString(),
            email: user.email,
            name: user.name
        }
    })
};
