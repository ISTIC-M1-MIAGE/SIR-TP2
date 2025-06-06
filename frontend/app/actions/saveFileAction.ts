'use server'

import path from "path";
import { writeFile } from "fs/promises";

export async function saveFileAction(file: any): Promise<string> {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + file.name.replaceAll(" ", "_");
    console.log(filename);
    try {
        await writeFile(
            path.join(process.cwd(), "public/uploads/" + filename),
            buffer
        );
        //return NextResponse.json({ Message: "Success", status: 201 });
    } catch (error) {
        console.log("Error occured ", error);
        //return NextResponse.json({ Message: "Failed", status: 500 });
    }
    return filename.toString();
}

