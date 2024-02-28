// import { Configuration, OpenAIApi } from "openai";
// const configuration = new Configuration({
//     organization: "org-1B9RT5L1LA2d6j44MFt5hiL3",
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

import { NextResponse } from "next/server"
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPEN_AI });

export async function POST(request: Request) {

    const data = await request.json();

    if (data?.image) {
        console.log(data)
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4-vision-preview",
                messages: [
                    {
                        role: "user",
                        content: [
                        { type: "text", text: data?.prompt || "What’s in this image?" },
                        {
                            type: "image_url",
                            image_url: {
                            "url": data.image,
                            },
                        },
                        ],
                    },
                ],
                max_tokens: 300
            });
    
            // console.log(response.choices[0]);
            return NextResponse.json({ response: response.choices[0]}, { status: 200 })
        } catch (error) {
            return NextResponse.json({ error }, { status: 400 })
        }
        
    }
    
    return NextResponse.json({ message: 'Received' }, { status: 400 })
}